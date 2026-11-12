import { useCallback, useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 스크롤을 단계(step)로 나눠 주는 훅 (화면 고정 + 단계별 전환)
 * - 섹션 높이를 "고정 영역 높이 + (단계 수 - 1) × 한 단계 스크롤 길이"로 늘립니다.
 * - 고정(sticky)된 동안 스크롤한 정도에 따라 현재 단계(activeIndex)가 바뀝니다. 단계가 바뀔 때만 다시 그립니다.
 * - 움직임 줄이기 설정 사용자에게는 고정 없이(isPinned=false) 클릭으로만 단계를 바꿉니다.
 *
 * @param {number} stepCount - 단계 수
 * @param {number} stepRatio - 한 단계를 넘기는 데 필요한 스크롤 길이 (화면 높이 대비 비율) [Optional, 기본값: 0.5]
 * @returns {{ sectionRef, stickyRef, activeIndex: number, isPinned: boolean, goTo: (index: number) => void }}
 *
 * Example usage:
 * const { sectionRef, stickyRef, activeIndex, goTo } = useScrollSteps(skills.length);
 * <div ref={sectionRef}><div ref={stickyRef} style={{ position: 'sticky' }}>...</div></div>
 */
export function useScrollSteps(stepCount, stepRatio = 0.5) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const stepLengthRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPinned] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!isPinned || !section || !sticky || stepCount < 1) return undefined;

    let frameId = 0;

    const update = () => {
      frameId = 0;
      const stepLength = stepLengthRef.current;
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const scrolled = stickyTop - section.getBoundingClientRect().top;
      const index = stepLength > 0 ? Math.round(scrolled / stepLength) : 0;
      setActiveIndex(Math.min(Math.max(index, 0), stepCount - 1));
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    const measure = () => {
      stepLengthRef.current = window.innerHeight * stepRatio;
      section.style.height = `${sticky.offsetHeight + stepLengthRef.current * (stepCount - 1)}px`;
      requestUpdate();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(sticky);
    measure();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', measure);
      section.style.height = '';
    };
  }, [isPinned, stepCount, stepRatio]);

  /** 특정 단계로 이동 (고정 모드: 해당 단계의 스크롤 위치로 이동 / 일반 모드: 바로 선택) */
  const goTo = useCallback((index) => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!isPinned || !section || !sticky) {
      setActiveIndex(index);
      return;
    }
    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: sectionTop - stickyTop + index * stepLengthRef.current + 1, behavior: 'smooth' });
  }, [isPinned]);

  return { sectionRef, stickyRef, activeIndex, isPinned, goTo };
}
