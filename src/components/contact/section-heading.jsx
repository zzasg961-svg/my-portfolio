import { Box } from '@mui/material';
import { useInView } from '../../hooks/use-in-view';

/**
 * SectionHeading 컴포넌트
 * 번호 + 선 + 라벨(01 ── ABOUT ME) + 굵은 제목 조합입니다.
 * 화면에 들어오면 제목이 줄마다 아래에서 밀려 올라오며 나타납니다. (마스크 등장 효과)
 *
 * Props:
 * @param {string} label - 위쪽 영문 라벨 [Required]
 * @param {string} index - 라벨 앞 번호 ('01'), 포인트 색으로 표시 [Optional]
 * @param {string} title - 제목. 줄바꿈(\n) 기준으로 한 줄씩 등장 [Required]
 * @param {string} as - 제목 태그 ('h2' | 'h3') [Optional, 기본값: 'h2']
 *
 * Example usage:
 * <SectionHeading index="04" label="CONTACT" title={'함께\n이야기 나눠요'} />
 */
function SectionHeading({ index, label, title, as = 'h2' }) {
  const [ref, isInView] = useInView();
  const lines = String(title).split('\n');

  return (
    <Box ref={ ref }>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          fontFamily: 'var(--font-code)',
          fontSize: '0.8125rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: 'var(--color-text-muted)',
          mb: 2,
          opacity: isInView ? 1 : 0,
          transition: 'opacity 0.6s var(--ease)',
          '@media (prefers-reduced-motion: reduce)': { opacity: 1 },
        }}
      >
        {index && <Box component="span" sx={{ color: 'var(--color-accent-text)', fontWeight: 500 }}>{ index }</Box>}
        {/* 번호와 라벨 사이 선이 왼쪽에서 그어집니다 */}
        <Box
          aria-hidden
          sx={{
            width: 32,
            height: '1px',
            bgcolor: 'var(--color-accent)',
            transformOrigin: 'left',
            transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.8s var(--ease) 0.1s',
            '@media (prefers-reduced-motion: reduce)': { transform: 'scaleX(1)' },
          }}
        />
        <span>{ label }</span>
      </Box>
      <Box
        component={ as }
        aria-label={ lines.join(' ') }
        sx={{
          m: 0,
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: 1.18,
          color: 'var(--color-text-primary)',
          fontSize: as === 'h2' ? { xs: '2rem', md: '3.5rem' } : { xs: '1.25rem', md: '1.5rem' },
        }}
      >
        {lines.map((line, index) => (
          <Box component="span" key={ line } aria-hidden sx={{ display: 'block', overflow: 'hidden', pb: '0.06em' }}>
            <Box
              component="span"
              sx={{
                display: 'block',
                transform: isInView ? 'none' : 'translateY(110%) rotate(2deg)',
                transformOrigin: 'left bottom',
                transition: 'transform 1s var(--ease)',
                transitionDelay: `${0.12 + index * 0.1}s`,
                // 움직임 줄이기 설정 사용자에게는 처음부터 보이게
                '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
              }}
            >
              { line }
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SectionHeading;
