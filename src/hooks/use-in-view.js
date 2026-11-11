import { useEffect, useRef, useState } from 'react';

/** IntersectionObserver를 지원하지 않는 환경에서는 처음부터 보이게 합니다 */
const canObserve = () => typeof window !== 'undefined' && 'IntersectionObserver' in window;

/**
 * 요소가 화면에 들어왔는지 알려주는 훅 (한 번 들어오면 계속 true)
 *
 * @param {object} options - { threshold, rootMargin } [Optional]
 * @returns {[object, boolean]} [ref, isInView]
 *
 * Example usage:
 * const [ref, isInView] = useInView();
 * <div ref={ref} style={{ opacity: isInView ? 1 : 0 }} />
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(() => !canObserve());

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView, threshold, rootMargin]);

  return [ref, isInView];
}
