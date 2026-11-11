import { Box } from '@mui/material';
import { useInView } from '../../hooks/use-in-view';

/**
 * Reveal 컴포넌트
 * 화면에 들어오면 아래에서 떠오르며 선명해집니다. (한 번만 실행)
 * 움직임 줄이기 설정이 켜져 있으면 애니메이션 없이 바로 보입니다.
 *
 * Props:
 * @param {ReactNode} children - 감쌀 내용 [Required]
 * @param {number} delay - 나타나기 전 대기 시간(ms), 순차 등장에 사용 [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional]
 * @param {string} component - 렌더링할 태그 (목록 안에서는 'li') [Optional, 기본값: 'div']
 *
 * Example usage:
 * <Reveal delay={120}><Card /></Reveal>
 */
function Reveal({ children, delay = 0, sx, component = 'div' }) {
  const [ref, isVisible] = useInView();

  return (
    <Box
      ref={ ref }
      component={ component }
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(48px) scale(0.98)',
        filter: isVisible ? 'none' : 'blur(6px)',
        transition: 'opacity var(--duration) var(--ease), transform var(--duration) var(--ease), filter var(--duration) var(--ease)',
        transitionDelay: `${delay}ms`,
        '@media (prefers-reduced-motion: reduce)': { opacity: 1, transform: 'none', filter: 'none' },
        ...sx,
      }}
    >
      { children }
    </Box>
  );
}

export default Reveal;
