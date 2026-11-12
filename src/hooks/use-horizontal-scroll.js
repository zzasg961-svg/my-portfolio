import { useCallback, useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 세로 스크롤을 가로 이동으로 바꿔 주는 훅 (스크롤 고정 + 가로 슬라이드)
 * - 섹션 높이를 "고정 영역 높이 + 가로로 움직일 거리"만큼 늘리고,
 *   고정(sticky)된 동안 스크롤한 만큼 트랙을 왼쪽으로 밀어냅니다.
 * - 리렌더링 없이 transform만 바꿔서 부드럽고, 현재 카드 번호가 바뀔 때만 다시 그립니다.
 * - 진행도(0~1)는 섹션의 CSS 변수 --progress로 넣어 진행 막대에 씁니다.
 * - 움직임 줄이기 설정 사용자에게는 고정 없이 일반 가로 스크롤(isPinned=false)로 둡니다.
 *
 * @param {number} itemCount - 슬라이드 수 (바뀌면 길이를 다시 잽니다)
 * @returns {{ sectionRef, stickyRef, trackRef, activeIndex: number, isPinned: boolean, revealItem: (element: HTMLElement) => void }}
 *
 * Example usage:
 * const { sectionRef, stickyRef, trackRef, activeIndex, isPinned, revealItem } = useHorizontalScroll(projects.length);
 * <section ref={sectionRef}><div ref={stickyRef}><div><div ref={trackRef}>...cards</div></div></div></section>
 */
export function useHorizontalScroll(itemCount) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const distanceRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPinned] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!isPinned || !section || !sticky || !track) return undefined;

    let frameId = 0;

    const update = () => {
      frameId = 0;
      const distance = distanceRef.current;
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const scrolled = stickyTop - section.getBoundingClientRect().top;
      const progress = distance > 0 ? Math.min(Math.max(scrolled / distance, 0), 1) : 0;
      const offset = progress * distance;

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      section.style.setProperty('--progress', progress.toFixed(4));

      // 화면 왼쪽에 가장 가까이 와 있는 카드를 '현재 카드'로 봅니다
      const slides = track.querySelectorAll('[data-slide-index]');
      let current = 0;
      slides.forEach((slide, index) => {
        if (slide.offsetLeft - offset <= slide.offsetWidth * 0.5) current = index;
      });
      setActiveIndex(current);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    // 카드 크기·화면 크기가 바뀌면 움직일 거리와 섹션 높이를 다시 잽니다
    const measure = () => {
      const viewport = track.parentElement;
      distanceRef.current = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = `${sticky.offsetHeight + distanceRef.current}px`;
      requestUpdate();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    resizeObserver.observe(sticky);
    measure();
    window.addEventListener('scroll', requestUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      section.style.height = '';
      track.style.transform = '';
    };
  }, [isPinned, itemCount]);

  /**
   * 키보드(Tab)로 화면 밖 카드에 이동했을 때, 그 카드가 보이는 위치까지 세로 스크롤을 옮깁니다
   */
  const revealItem = useCallback((element) => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!isPinned || !section || !sticky || !element) return;
    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetOffset = Math.min(Math.max(element.offsetLeft, 0), distanceRef.current);
    window.scrollTo({ top: sectionTop - stickyTop + targetOffset, behavior: 'instant' });
  }, [isPinned]);

  return { sectionRef, stickyRef, trackRef, activeIndex, isPinned, revealItem };
}
