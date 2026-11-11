import { Box } from '@mui/material';
import { useInView } from '../../hooks/use-in-view';

/**
 * SoftReveal 컴포넌트
 * 흐릿하던 내용이 카메라 초점이 맞춰지듯 천천히 선명해지며 나타납니다. (위치 이동 없이 차분하게)
 * 움직임 줄이기 설정이 켜져 있으면 바로 보입니다.
 *
 * Props:
 * @param {ReactNode} children - 감쌀 내용 [Required]
 * @param {number} delay - 나타나기 전 대기 시간(ms) [Optional, 기본값: 0]
 * @param {string} component - 렌더링할 태그 [Optional, 기본값: 'div']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SoftReveal delay={200}><p>본문</p></SoftReveal>
 */
function SoftReveal({ children, delay = 0, component = 'div', sx }) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <Box
      ref={ ref }
      component={ component }
      sx={{
        opacity: isInView ? 1 : 0,
        filter: isInView ? 'blur(0)' : 'blur(14px)',
        letterSpacing: isInView ? 'inherit' : '0.02em',
        transition: 'opacity 1.6s var(--ease), filter 1.6s var(--ease), letter-spacing 1.6s var(--ease)',
        transitionDelay: `${delay}ms`,
        '@media (prefers-reduced-motion: reduce)': { opacity: 1, filter: 'none' },
        ...sx,
      }}
    >
      { children }
    </Box>
  );
}

export default SoftReveal;
