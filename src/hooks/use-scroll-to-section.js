import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 라우터 state의 scrollTo 값(섹션 id)으로 부드럽게 스크롤하는 훅
 * HashRouter에서는 #앵커를 쓸 수 없어서 navigate state로 대상 섹션을 전달합니다.
 *
 * Example usage:
 * navigate('/', { state: { scrollTo: 'projects' } });
 * useScrollToSection(); // Home 페이지에서 호출
 */
export function useScrollToSection() {
  const location = useLocation();
  const targetId = location.state?.scrollTo;

  useEffect(() => {
    if (!targetId) return;
    /** 페이지 렌더링이 끝난 뒤 스크롤하도록 한 프레임 미룹니다 */
    const frameId = requestAnimationFrame(() => {
      // Hero는 sticky로 고정되어 있어 scrollIntoView가 동작하지 않으므로 맨 위로 이동합니다
      if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frameId);
  }, [targetId, location.key]);
}
