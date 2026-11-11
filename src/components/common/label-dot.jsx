import { Box } from '@mui/material';

/**
 * LabelDot 컴포넌트
 * 빨간 점 + 작은 대문자 라벨입니다. (예: ● STORY)
 *
 * Props:
 * @param {ReactNode} children - 라벨 텍스트 [Required]
 * @param {string} color - 글자 색 CSS 값 [Optional, 기본값: 'var(--color-text-muted)']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <LabelDot>DESIGN</LabelDot>
 */
function LabelDot({ children, color = 'var(--color-text-muted)', sx }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        fontFamily: 'var(--font-code)',
        fontSize: '0.75rem',
        letterSpacing: '0.06em',
        color,
        ...sx,
      }}
    >
      <Box component="span" aria-hidden sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'var(--color-accent)', flexShrink: 0 }} />
      { children }
    </Box>
  );
}

export default LabelDot;
