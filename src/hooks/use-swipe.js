import { useRef } from 'react';

/** 스와이프로 인정할 최소 가로 이동 거리(px) */
const SWIPE_THRESHOLD = 50;

/**
 * 좌우 스와이프를 감지하는 훅
 * 반환된 핸들러를 요소에 펼쳐서 사용합니다.
 *
 * @param {object} options
 * @param {function} options.onSwipeLeft - 왼쪽으로 밀었을 때 (다음 항목)
 * @param {function} options.onSwipeRight - 오른쪽으로 밀었을 때 (이전 항목)
 * @returns {{ onTouchStart: function, onTouchEnd: function }}
 *
 * Example usage:
 * const swipeHandlers = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });
 * <Box {...swipeHandlers} />
 */
export function useSwipe({ onSwipeLeft, onSwipeRight }) {
  const startRef = useRef(null);

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    startRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    if (!startRef.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startRef.current.x;
    const deltaY = touch.clientY - startRef.current.y;
    startRef.current = null;

    /** 세로 스크롤 동작과 헷갈리지 않도록 가로 이동이 더 클 때만 처리 */
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) onSwipeLeft?.();
    else onSwipeRight?.();
  };

  return { onTouchStart, onTouchEnd };
}
