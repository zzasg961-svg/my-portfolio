import { Box } from '@mui/material';

/**
 * SectionHeading 컴포넌트
 * 작은 회색 라벨 + 굵은 제목 조합 (애플 스타일 헤더)
 *
 * Props:
 * @param {string} eyebrow - 위쪽 작은 라벨 [Required]
 * @param {string} title - 제목 [Required]
 * @param {string} as - 제목 태그 ('h2' | 'h3') [Optional, 기본값: 'h2']
 *
 * Example usage:
 * <SectionHeading eyebrow="CONTACT" title="함께 이야기 나눠요" />
 */
function SectionHeading({ eyebrow, title, as = 'h2' }) {
  return (
    <Box>
      <Box
        sx={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: 'var(--color-text-muted)',
          mb: 1,
        }}
      >
        {eyebrow}
      </Box>
      <Box
        component={as}
        sx={{
          m: 0,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          color: 'var(--color-text-primary)',
          fontSize: as === 'h2' ? { xs: '1.75rem', md: '2.25rem' } : { xs: '1.25rem', md: '1.5rem' },
        }}
      >
        {title}
      </Box>
    </Box>
  );
}

export default SectionHeading;
