import { useEffect, useState } from 'react';

/**
 * 영역 크기에 맞춰 그림의 배율(scale)을 계산하는 훅
 * 영역의 너비·높이 중 더 빠듯한 쪽에 맞추고, 최소·최대 배율 사이로 제한합니다.
 * 화면 크기가 바뀌면(회전 포함) ResizeObserver로 다시 계산합니다.
 *
 * @param {object} ref - 크기를 잴 영역 요소의 ref
 * @param {object} options
 * @param {number} options.width - 그림의 원래 너비(px) [Required]
 * @param {number} options.height - 그림의 원래 높이(px) [Required]
 * @param {number} options.min - 최소 배율 [Optional, 기본값: 0.3]
 * @param {number} options.max - 최대 배율 [Optional, 기본값: 1]
 * @param {boolean} enabled - false면 계산하지 않습니다 [Optional, 기본값: true]
 * @returns {number} 배율
 *
 * Example usage:
 * const scale = useFitScale(areaRef, { width: 600, height: 500, max: 0.9 });
 */
export function useFitScale(ref, { width, height, min = 0.3, max = 1 }, enabled = true) {
  const [scale, setScale] = useState(max);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return undefined;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width: areaWidth, height: areaHeight } = entry.contentRect;
      const fitScale = Math.min(areaWidth / width, areaHeight / height);
      setScale(Math.min(max, Math.max(min, Number(fitScale.toFixed(3)))));
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [ref, width, height, min, max, enabled]);

  return scale;
}
