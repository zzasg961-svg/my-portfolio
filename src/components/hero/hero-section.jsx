import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useScrollProgress } from '../../hooks/use-scroll-progress';
import { INTRO_DURATION_MS, SHOULD_SHOW_INTRO } from '../common/intro-state';
import HeroObject from './hero-object';

/** 글자 단위로 올라올 헤드라인 */
/** 아래 섹션(About Me·Skill Tree·Projects)을 한 문장으로 요약: 디자인과 개발을 모두 다루고, 처음부터 끝까지 직접 만든다 */
const HEADLINE_LINES = ['디자인부터 개발까지,', '직접 완성합니다'];
/** 포인트 컬러로 강조할 부분: [줄 번호, 시작 글자, 끝 글자(미포함)] → "직접" */
const HIGHLIGHT_RANGE = [1, 0, 2];
const CHAR_STAGGER_MS = 30;

/** 글자마다 등장 지연 시간을 미리 계산해 둡니다 (줄이 바뀌어도 순서가 이어지도록) */
const HEADLINE_CHARS = HEADLINE_LINES.map((line, lineIndex) => {
  const offset = HEADLINE_LINES.slice(0, lineIndex).reduce((sum, prev) => sum + Array.from(prev).length, 0);
  const [highlightLine, highlightStart, highlightEnd] = HIGHLIGHT_RANGE;
  return Array.from(line).map((character, charIndex) => ({
    character,
    delay: (offset + charIndex) * CHAR_STAGGER_MS,
    isHighlight: lineIndex === highlightLine && charIndex >= highlightStart && charIndex < highlightEnd,
  }));
});
const DOT_DELAY_MS = HEADLINE_CHARS.flat().length * CHAR_STAGGER_MS + 150;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 배경에서 천천히 흘러다니는 빛 번짐(오로라) 3개: 위치·크기·색·이동 거리(마우스 패럴랙스) */
const AURORA_BLOBS = [
  { id: 'a', top: '-20%', left: '-10%', size: '55vw', color: 'var(--hero-blob-1)', duration: 18, depth: 40 },
  { id: 'b', top: '30%', left: '55%', size: '45vw', color: 'var(--hero-blob-2)', duration: 22, depth: -60 },
  { id: 'c', top: '55%', left: '10%', size: '35vw', color: 'var(--hero-blob-3)', duration: 26, depth: 80 },
];

/** 마우스 위치를 -1 ~ 1 값의 CSS 변수(--mx, --my)로 넘겨 패럴랙스에 씁니다 */
const handleParallaxMove = (event) => {
  if (event.pointerType !== 'mouse') return;
  const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', (((event.clientX - left) / width) * 2 - 1).toFixed(3));
  event.currentTarget.style.setProperty('--my', (((event.clientY - top) / height) * 2 - 1).toFixed(3));
};

/** 순서대로 떠오르며 나타나는 요소에 쓰는 스타일 */
const fadeInSx = (isShown, delayMs) => ({
  opacity: isShown ? 1 : 0,
  transform: isShown ? 'none' : 'translateY(16px)',
  transition: 'opacity 0.8s var(--ease), transform 0.8s var(--ease)',
  transitionDelay: isShown ? `${delayMs}ms` : '0ms',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
});

/** 헤드라인: 줄마다 마스크 안에서 글자가 하나씩 튀어 올라옵니다 */
function Headline({ isShown }) {
  return (
    <Box
      component="h1"
      aria-label={ `${HEADLINE_LINES.join(' ')}.` }
      sx={{
        m: 0,
        fontSize: { xs: '2.375rem', sm: '3.5rem', md: '4.75rem' },
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.045em',
        color: 'var(--hero-text)',
      }}
    >
      {HEADLINE_LINES.map((line, lineIndex) => {
        const isLastLine = lineIndex === HEADLINE_LINES.length - 1;
        return (
          <Box component="span" key={ line } aria-hidden sx={{ display: 'block', overflow: 'hidden', pb: '0.08em' }}>
            {HEADLINE_CHARS[lineIndex].map(({ character, delay, isHighlight }) => (
              <Box
                component="span"
                key={ delay }
                sx={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  color: isHighlight ? 'var(--hero-highlight)' : 'inherit',
                  transform: isShown ? 'none' : 'translateY(115%) rotate(8deg)',
                  opacity: isShown ? 1 : 0,
                  transition: 'transform 0.9s var(--ease), opacity 0.5s var(--ease)',
                  transitionDelay: `${delay}ms`,
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                }}
              >
                { character }
              </Box>
            ))}
            {isLastLine && (
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  color: 'var(--hero-accent)',
                  transform: isShown ? 'none' : 'scale(0)',
                  transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: `${DOT_DELAY_MS}ms`,
                }}
              >
                .
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

/**
 * HeroSection 컴포넌트
 * 화면 가운데의 3D 레이어 오브제(디자인 → 레이아웃 → 코드)가 주인공이고,
 * 글은 최소한만 둡니다. (왼쪽 위: 태그 + 헤드라인 / 오른쪽 아래: 스크롤 안내)
 * 이름은 상단 바에, 자세한 소개·작업·연락처는 아래 섹션과 상단 바가 맡으므로 Hero에서는 반복하지 않습니다.
 * 스크롤하면 글은 흐려지고 레이어는 더 벌어지며, 다음 섹션이 그 위를 덮습니다. (Home에서 sticky로 고정)
 * 움직임 줄이기 설정이 켜져 있으면 바로 완성된 화면을 보여줍니다.
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  const [isShown, setIsShown] = useState(() => prefersReducedMotion());
  const scrollRef = useScrollProgress('element');

  // 첫 방문 인트로가 걷힐 즈음, 아니면 첫 화면이 그려진 직후 등장 연출을 시작합니다
  useEffect(() => {
    if (isShown) return undefined;
    const timerId = setTimeout(() => setIsShown(true), SHOULD_SHOW_INTRO ? INTRO_DURATION_MS - 300 : 80);
    return () => clearTimeout(timerId);
  }, [isShown]);

  return (
    <Box
      ref={ scrollRef }
      component="section"
      id="hero"
      aria-label="소개"
      onPointerMove={ handleParallaxMove }
      sx={{
        '--progress': 0,
        '--mx': 0,
        '--my': 0,
        bgcolor: 'var(--color-bg-hero)',
        transition: 'background-color 0.6s var(--ease)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 오로라: 천천히 떠다니고, 마우스 반대 방향으로 깊이감 있게 움직입니다 */}
      {AURORA_BLOBS.map((blob) => (
        <Box
          key={ blob.id }
          aria-hidden
          sx={{
            position: 'absolute',
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 65%)`,
            filter: 'blur(40px)',
            pointerEvents: 'none',
            translate: `calc(var(--mx) * ${blob.depth}px) calc(var(--my) * ${blob.depth}px)`,
            transition: 'translate 1.2s var(--ease)',
            animation: `heroDrift ${blob.duration}s ease-in-out infinite alternate`,
            '@keyframes heroDrift': {
              '0%': { transform: 'translate(0, 0) scale(1)' },
              '50%': { transform: 'translate(6%, -8%) scale(1.15)' },
              '100%': { transform: 'translate(-6%, 6%) scale(0.95)' },
            },
          }}
        />
      ))}

      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3 },
          minHeight: { xs: 'calc(100svh - 104px)', sm: 'calc(100svh - 72px)' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 4,
          py: { xs: 5, md: 8 },
          position: 'relative',
          // 스크롤 연동: 내려갈수록 살짝 작아지고 흐려집니다
          transform: 'translateY(calc(var(--progress) * -6%)) scale(calc(1 - var(--progress) * 0.08))',
          opacity: 'calc(1 - var(--progress) * 0.9)',
          filter: 'blur(calc(var(--progress) * 6px))',
          transformOrigin: 'center top',
          '@media (prefers-reduced-motion: reduce)': { transform: 'none', filter: 'none', opacity: 1 },
        }}
      >
        <HeroObject isShown={ isShown } />

        {/* 왼쪽 위: 태그 + 헤드라인 */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              mb: { xs: 2, md: 3 },
              fontFamily: 'var(--font-code)',
              fontSize: { xs: '0.75rem', md: '0.8125rem' },
              letterSpacing: '0.06em',
              color: 'var(--hero-muted)',
              ...fadeInSx(isShown, 0),
            }}
          >
            {/* 작업 중임을 알리는 맥박 점 */}
            <Box
              aria-hidden
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'var(--hero-accent)',
                animation: 'heroPulse 2s var(--ease) infinite',
                '@keyframes heroPulse': {
                  '0%': { boxShadow: '0 0 0 0 var(--hero-pulse)' },
                  '70%': { boxShadow: '0 0 0 10px transparent' },
                  '100%': { boxShadow: '0 0 0 0 transparent' },
                },
              }}
            />
            {'// DESIGN × CODE'}
          </Box>
          <Headline isShown={ isShown } />
        </Box>

        {/* 아래: 스크롤 안내(오른쪽) — 이름은 상단 바에 있어 Hero에서는 반복하지 않습니다 */}
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            aria-hidden
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              pb: 0.5,
              fontFamily: 'var(--font-code)',
              fontSize: '0.75rem',
              color: 'var(--hero-muted)',
              ...fadeInSx(isShown, 900),
            }}
          >
            scroll
            <ArrowDownwardIcon
              sx={{
                fontSize: 16,
                animation: 'heroScroll 1.8s var(--ease) infinite',
                '@keyframes heroScroll': { '0%, 100%': { transform: 'none' }, '50%': { transform: 'translateY(5px)' } },
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
