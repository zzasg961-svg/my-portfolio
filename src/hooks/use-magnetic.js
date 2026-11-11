import { useEffect, useRef } from 'react';

/** 마우스(정밀 포인터)를 쓰고, 움직임 줄이기를 끄지 않은 경우에만 동작합니다 */
const canUseMagnetic = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 마그네틱 효과 훅
 * 마우스가 요소 위에 있으면 요소가 커서 쪽으로 살짝 끌려오고, 벗어나면 탄성 있게 돌아갑니다.
 *
 * @param {number} strength - 끌려오는 정도 (0~1) [Optional, 기본값: 0.3]
 * @returns {object} ref - 효과를 줄 요소에 연결
 *
 * Example usage:
 * const magneticRef = useMagnetic(0.35);
 * <Button ref={magneticRef}>Contact</Button>
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !canUseMagnetic()) return undefined;

    const handleMove = (event) => {
      const { left, top, width, height } = node.getBoundingClientRect();
      const x = (event.clientX - (left + width / 2)) * strength;
      const y = (event.clientY - (top + height / 2)) * strength;
      node.style.transition = 'transform 0.2s ease-out';
      node.style.transform = `translate(${x}px, ${y}px)`;
    };
    const handleLeave = () => {
      node.style.transition = 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
      node.style.transform = '';
    };

    node.addEventListener('pointermove', handleMove);
    node.addEventListener('pointerleave', handleLeave);
    return () => {
      node.removeEventListener('pointermove', handleMove);
      node.removeEventListener('pointerleave', handleLeave);
    };
  }, [strength]);

  return ref;
}
