import { useEffect, useRef } from 'react';

/**
 * 스크롤 진행도(0~1)를 요소의 CSS 변수 --progress로 넣어 주는 훅
 * 리렌더링 없이 requestAnimationFrame으로 스타일만 바꿔서 스크롤이 부드럽습니다.
 *
 * @param {'page' | 'element' | 'enter' | 'pass'} mode
 *   - 'page': 페이지 전체 스크롤 진행도
 *   - 'element': 요소가 화면 위로 밀려 올라간 정도 (요소 높이 기준)
 *   - 'enter': 요소가 화면 아래에서 들어오는 정도 (윗변이 화면 바닥 → 화면 40% 지점이면 0 → 1)
 *   - 'pass': 요소가 화면을 천천히 지나가는 정도 (윗변이 화면 85% → 10% 지점이면 0 → 1)
 * @returns {object} ref - CSS 변수를 받을 요소에 연결
 *
 * Example usage:
 * const ref = useScrollProgress('element');
 * <Box ref={ref} sx={{ opacity: 'calc(1 - var(--progress))' }} />
 */
export function useScrollProgress(mode = 'page') {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // 움직임 줄이기 설정 사용자에게는 진입 연출 없이 완성된 상태를 보여줍니다
    if ((mode === 'enter' || mode === 'pass') && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.setProperty('--progress', '1');
      return undefined;
    }

    let frameId = 0;
    const update = () => {
      frameId = 0;
      let progress;
      if (mode === 'page') {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      } else if (mode === 'pass') {
        const { top } = node.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        progress = (viewHeight * 0.85 - top) / (viewHeight * 0.75);
      } else if (mode === 'enter') {
        const { top } = node.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        progress = (viewHeight - top) / (viewHeight * 0.6);
      } else {
        const height = node.offsetHeight || 1;
        progress = window.scrollY / height;
      }
      node.style.setProperty('--progress', Math.min(Math.max(progress, 0), 1).toFixed(4));
    };
    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [mode]);

  return ref;
}
