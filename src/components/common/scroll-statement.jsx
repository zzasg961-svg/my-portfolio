import { Box, Container } from '@mui/material';
import { useScrollProgress } from '../../hooks/use-scroll-progress';

/**
 * 한 줄씩 채워질 문장
 * - accent: true인 줄은 포인트 컬러로 채워집니다.
 */
const STATEMENT_LINES = [
  { text: 'Design with intent,', accent: false },
  { text: 'build with care.', accent: true },
];

/**
 * ScrollStatement 컴포넌트
 * Hero와 About 사이를 잇는 큰 문장입니다.
 * 처음엔 얇은 외곽선만 보이다가, 스크롤하는 만큼 줄마다 왼쪽에서 오른쪽으로 글자가 채워집니다.
 * 위아래 얇은 선과 작은 캡션이 함께 그어져 차분한 '쉼표' 역할을 합니다.
 * 움직임 줄이기 설정 사용자에게는 처음부터 채워진 상태로 보입니다.
 *
 * Example usage:
 * <ScrollStatement />
 */
function ScrollStatement() {
  const progressRef = useScrollProgress('pass');
  const lineCount = STATEMENT_LINES.length;

  return (
    <Box
      ref={ progressRef }
      component="section"
      aria-label={ STATEMENT_LINES.map((line) => line.text).join(' ') }
      sx={{ '--progress': 0, pt: { xs: 8, md: 14 }, pb: { xs: 2, md: 4 } }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* 위쪽 캡션과 선: 진행도에 맞춰 선이 그어집니다 */}
        <Box
          aria-hidden
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: { xs: 4, md: 6 },
            fontFamily: 'var(--font-code)',
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>(Philosophy)</span>
          <Box sx={{ position: 'relative', flex: 1, height: '1px', bgcolor: 'var(--color-border-divider)' }}>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                bgcolor: 'var(--color-accent)',
                transformOrigin: 'left',
                transform: 'scaleX(var(--progress))',
              }}
            />
          </Box>
          <span>Scroll</span>
        </Box>

        <Box
          aria-hidden
          sx={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: { xs: '2.75rem', sm: '4.5rem', md: '7.5rem' },
            lineHeight: 1,
            letterSpacing: '-0.045em',
          }}
        >
          {STATEMENT_LINES.map((line, index) => {
            // 줄마다 진행 구간을 나눠, 앞줄이 다 채워진 뒤 다음 줄이 채워집니다
            const lineProgress = `clamp(0, calc(var(--progress) * ${lineCount} - ${index}), 1)`;
            return (
              <Box
                key={ line.text }
                sx={{
                  position: 'relative',
                  width: 'fit-content',
                  pb: '0.08em',
                  // 두 번째 줄은 오른쪽으로 들여 써서 리듬을 줍니다
                  ml: index % 2 ? { xs: '8%', md: '18%' } : 0,
                }}
              >
                {/* 바탕: 얇은 외곽선 */}
                <Box
                  component="span"
                  sx={{ color: 'transparent', WebkitTextStroke: '1px var(--color-border-default)' }}
                >
                  { line.text }
                </Box>
                {/* 위: 채워진 글자. 진행도만큼 왼쪽부터 드러납니다 */}
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    color: line.accent ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    clipPath: `inset(0 calc((1 - ${lineProgress}) * 100%) 0 0)`,
                  }}
                >
                  { line.text }
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default ScrollStatement;
