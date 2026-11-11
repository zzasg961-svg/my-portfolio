import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label';

/** 마우스(정밀 포인터)를 쓰고, 움직임 줄이기를 끄지 않은 사용자에게만 켭니다 */
const shouldEnable = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * CustomCursor 컴포넌트
 * 포인트 레드 점이 마우스를 바로 따라오고, 큰 원이 살짝 늦게 따라옵니다.
 * 버튼·링크 위에서는 원이 커지며 반전(difference) 효과로 강조합니다.
 * 기본 마우스 커서는 그대로 두어 사용성을 해치지 않습니다.
 *
 * Example usage:
 * <CustomCursor />
 */
function CustomCursor() {
  const [isEnabled] = useState(shouldEnable);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!isEnabled) return undefined;

    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100, scale: 1 };
    let isHovering = false;
    let isOnHero = false;
    let frameId = 0;

    const handleMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      isHovering = Boolean(event.target.closest?.(INTERACTIVE_SELECTOR));
      // Hero(라이트 모드는 빨간 배경) 위에서는 커서 색을 바꿔 묻히지 않게 합니다
      isOnHero = Boolean(event.target.closest?.('#hero'));
      dotRef.current.dataset.hero = String(isOnHero);
      dotRef.current.style.transform = `translate(${target.x}px, ${target.y}px)`;
    };

    const animate = () => {
      // 큰 원은 목표 위치로 15%씩 다가가며 부드럽게 따라옵니다
      ring.x += (target.x - ring.x) * 0.15;
      ring.y += (target.y - ring.y) * 0.15;
      // 크기도 같은 방식으로 서서히 바뀌게 합니다
      ring.scale += ((isHovering ? 1.8 : 1) - ring.scale) * 0.2;
      ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) scale(${ring.scale})`;
      ringRef.current.dataset.hover = String(isHovering);
      ringRef.current.dataset.hero = String(isOnHero);
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    frameId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(frameId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  const baseSx = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 2000,
    borderRadius: '50%',
    // 마우스를 움직이기 전에는 화면 밖에 둡니다
    transform: 'translate(-100px, -100px)',
  };

  return (
    <>
      <Box
        ref={ ringRef }
        aria-hidden
        sx={{
          ...baseSx,
          width: 36,
          height: 36,
          ml: '-18px',
          mt: '-18px',
          border: '1px solid var(--color-accent)',
          transition: 'background-color 0.3s var(--ease), border-color 0.3s var(--ease)',
          '&[data-hero="true"]': { borderColor: 'var(--hero-cursor)' },
          '&[data-hover="true"]': {
            bgcolor: '#FFFFFF',
            borderColor: 'transparent',
            mixBlendMode: 'difference',
          },
        }}
      />
      <Box
        ref={ dotRef }
        aria-hidden
        sx={{
          ...baseSx,
          width: 6,
          height: 6,
          ml: '-3px',
          mt: '-3px',
          bgcolor: 'var(--color-accent)',
          transition: 'background-color 0.3s var(--ease)',
          '&[data-hero="true"]': { bgcolor: 'var(--hero-cursor)' },
        }}
      />
    </>
  );
}

export default CustomCursor;
