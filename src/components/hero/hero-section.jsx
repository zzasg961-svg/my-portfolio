import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Stack } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useScrollProgress } from '../../hooks/use-scroll-progress';
import RollText from '../common/roll-text';
import { outlinedPillSx } from '../common/button-styles';
import { INTRO_DURATION_MS, SHOULD_SHOW_INTRO } from '../common/intro-state';
import { useMagnetic } from '../../hooks/use-magnetic';

/** 타이핑될 코드를 색깔별 조각으로 나눕니다 (간단한 문법 강조) */
const CODE_SEGMENTS = [
  { text: '<h1 ', color: 'var(--hero-code-tag)' },
  { text: 'class=', color: 'var(--hero-code-attr)' },
  { text: '"headline"', color: 'var(--hero-code-string)' },
  { text: '>', color: 'var(--hero-code-tag)' },
  { text: '디자인은 그리고, 코드는 짓습니다.', color: 'var(--hero-text)' },
  { text: '</h1>', color: 'var(--hero-code-tag)' },
];
const CODE_LENGTH = CODE_SEGMENTS.reduce((sum, segment) => sum + segment.text.length, 0);

/** 각 조각이 전체 코드에서 몇 번째 글자부터 시작하는지 미리 계산해 둡니다 */
const SEGMENT_STARTS = CODE_SEGMENTS.map((_, index) =>
  CODE_SEGMENTS.slice(0, index).reduce((sum, segment) => sum + segment.text.length, 0),
);

/** 렌더링 후 글자 단위로 올라올 헤드라인 */
const HEADLINE_LINES = ['디자인은 그리고,', '코드는 짓습니다'];
/** 포인트 컬러로 강조할 부분: [줄 번호, 시작 글자, 끝 글자(미포함)] → "코드는" */
const HIGHLIGHT_RANGE = [1, 0, 3];

const TYPE_SPEED_MS = 30;
const HOLD_AFTER_TYPING_MS = 400;
const CHAR_STAGGER_MS = 40;

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

/** typedCount 글자까지만 잘라서 색을 입혀 보여줍니다 */
function TypedCode({ typedCount }) {
  return (
    <>
      {CODE_SEGMENTS.map((segment, index) => (
        <Box component="span" key={ segment.text } sx={{ color: segment.color }}>
          { segment.text.slice(0, Math.max(typedCount - SEGMENT_STARTS[index], 0)) }
        </Box>
      ))}
    </>
  );
}

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

/** 렌더링 완료 후 순서대로 나타나는 요소에 쓰는 스타일 */
const fadeInSx = (isShown, delayMs) => ({
  opacity: isShown ? 1 : 0,
  transform: isShown ? 'none' : 'translateY(16px)',
  transition: 'opacity 0.8s var(--ease), transform 0.8s var(--ease)',
  transitionDelay: isShown ? `${delayMs}ms` : '0ms',
});

/** 헤드라인: 줄마다 마스크 안에서 글자가 하나씩 튀어 올라옵니다 */
function Headline({ isRendered }) {
  return (
    <Box
      component="h1"
      aria-label={ `${HEADLINE_LINES.join(' ')}.` }
      sx={{
        m: 0,
        fontSize: { xs: '2.75rem', sm: '4.5rem', md: '7rem' },
        fontWeight: 800,
        lineHeight: 1.08,
        letterSpacing: '-0.05em',
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
                  transform: isRendered ? 'none' : 'translateY(115%) rotate(8deg)',
                  opacity: isRendered ? 1 : 0,
                  transition: 'transform 0.9s var(--ease), opacity 0.5s var(--ease)',
                  transitionDelay: `${delay}ms`,
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
                  transform: isRendered ? 'none' : 'scale(0)',
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
 * 시그니처 연출 "코드가 디자인이 되는 순간"
 * 1) 코드가 한 글자씩 타이핑 → 2) 코드가 흐려지며 헤드라인이 글자 단위로 튀어 오름 → 3) 서브카피·버튼 등장
 * 스크롤하면 Hero가 작아지고 흐려지며, 다음 섹션이 그 위를 덮습니다. (Home에서 sticky로 고정)
 * 움직임 줄이기 설정이 켜져 있으면 바로 완성된 화면을 보여줍니다.
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  const [typedCount, setTypedCount] = useState(() => (prefersReducedMotion() ? CODE_LENGTH : 0));
  const [isRendered, setIsRendered] = useState(() => prefersReducedMotion());
  // 첫 방문 인트로가 걷힌 뒤에 타이핑을 시작합니다
  const [isStarted, setIsStarted] = useState(() => !SHOULD_SHOW_INTRO);
  const isTypingDone = typedCount >= CODE_LENGTH;
  const scrollRef = useScrollProgress('element');
  const primaryMagnetRef = useMagnetic(0.35);
  const secondaryMagnetRef = useMagnetic(0.35);

  useEffect(() => {
    if (isStarted) return undefined;
    const timerId = setTimeout(() => setIsStarted(true), INTRO_DURATION_MS - 300);
    return () => clearTimeout(timerId);
  }, [isStarted]);

  useEffect(() => {
    if (isRendered || !isStarted) return undefined;
    const timerId = isTypingDone
      ? setTimeout(() => setIsRendered(true), HOLD_AFTER_TYPING_MS)
      : setTimeout(() => setTypedCount((count) => count + 1), TYPE_SPEED_MS);
    return () => clearTimeout(timerId);
  }, [typedCount, isTypingDone, isRendered, isStarted]);

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

      {/* 배경의 큰 </> 기호: 웹(코드)을 상징. 스크롤하면 오른쪽으로 밀려나고 마우스를 따라 기울어집니다 */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          right: { xs: '-8%', md: '-2%' },
          bottom: { xs: '4%', md: '-6%' },
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: { xs: '10rem', md: '24rem' },
          lineHeight: 1,
          letterSpacing: '-0.08em',
          color: 'transparent',
          WebkitTextStroke: '1px var(--hero-outline)',
          transform: 'translateX(calc(var(--progress) * 30%)) translate(calc(var(--mx) * -24px), calc(var(--my) * -24px)) rotate(calc(var(--mx) * -3deg))',
          transition: 'opacity 1.6s var(--ease) 0.6s, transform 0.9s var(--ease)',
          opacity: isRendered ? 1 : 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        { '</>' }
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3 },
          minHeight: { xs: 'calc(100svh - 104px)', sm: 'calc(100svh - 72px)' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 8, md: 10 },
          position: 'relative',
          // 스크롤 연동: 내려갈수록 작아지고, 흐려지고, 살짝 올라갑니다
          transform: 'translateY(calc(var(--progress) * -6%)) scale(calc(1 - var(--progress) * 0.08))',
          opacity: 'calc(1 - var(--progress) * 0.9)',
          filter: 'blur(calc(var(--progress) * 6px))',
          transformOrigin: 'center top',
          '@media (prefers-reduced-motion: reduce)': { transform: 'none', filter: 'none', opacity: 1 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            fontFamily: 'var(--font-code)',
            fontSize: { xs: '0.8125rem', md: '0.9375rem' },
            mb: { xs: 3, md: 4 },
            ...fadeInSx(isRendered, 0),
          }}
        >
          {/* 깜빡이는 상태 점 */}
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
          <Box component="span" sx={{ color: 'var(--hero-muted)' }}>Web designer who codes</Box>
        </Box>

        {/* 코드 레이어와 헤드라인 레이어를 같은 칸에 겹쳐 두어 화면이 출렁이지 않게 합니다 */}
        <Box sx={{ display: 'grid', '& > *': { gridArea: '1 / 1' } }}>
          <Box
            aria-hidden
            sx={{
              alignSelf: 'center',
              fontFamily: 'var(--font-code)',
              fontSize: { xs: '0.9375rem', sm: '1.125rem', md: '1.5rem' },
              lineHeight: 1.7,
              wordBreak: 'break-all',
              opacity: isRendered ? 0 : 1,
              filter: isRendered ? 'blur(10px)' : 'none',
              transform: isRendered ? 'translateY(-20px)' : 'none',
              transition: 'opacity 0.5s var(--ease), filter 0.5s var(--ease), transform 0.5s var(--ease)',
              pointerEvents: 'none',
            }}
          >
            <TypedCode typedCount={ typedCount } />
            {/* 깜빡이는 커서 */}
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: '0.6em',
                height: '1.1em',
                ml: 0.25,
                verticalAlign: 'text-bottom',
                bgcolor: 'var(--hero-accent)',
                animation: 'heroCaret 1s steps(1) infinite',
                '@keyframes heroCaret': { '50%': { opacity: 0 } },
              }}
            />
          </Box>

          <Box sx={{ translate: 'calc(var(--mx) * -10px) calc(var(--my) * -6px)', transition: 'translate 0.9s var(--ease)' }}>
            <Headline isRendered={ isRendered } />
          </Box>
        </Box>

        <Box
          component="p"
          sx={{
            m: 0,
            mt: { xs: 3, md: 4 },
            maxWidth: 520,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.7,
            color: 'var(--hero-muted)',
            ...fadeInSx(isRendered, 900),
          }}
        >
          내가 그린 화면을 직접 움직이고 싶어서, 코드를 배웠습니다.
          <br />
          디자인과 개발 사이의 거리를 줄이는 웹디자이너 임유섭입니다.
        </Box>

        <Stack
          direction="row"
          spacing={ 1.5 }
          sx={{ mt: { xs: 4, md: 5 }, alignItems: 'center', flexWrap: 'wrap', rowGap: 1.5, ...fadeInSx(isRendered, 1100) }}
        >
          <Button
            ref={ primaryMagnetRef }
            component={ Link }
            to="/"
            state={{ scrollTo: 'projects' }}
            variant="contained"
            disableElevation
            size="large"
            sx={{
              minHeight: 52,
              px: 3.5,
              color: 'var(--hero-btn-text)',
              bgcolor: 'var(--hero-btn-bg)',
              boxShadow: '0 10px 30px var(--hero-btn-shadow)',
              '&:hover': { bgcolor: 'var(--hero-btn-hover)' },
              '&:active': { bgcolor: 'var(--hero-btn-hover)' },
            }}
          >
            <RollText>작업 보기 →</RollText>
          </Button>
          <Button
            ref={ secondaryMagnetRef }
            component={ Link }
            to="/"
            state={{ scrollTo: 'about' }}
            size="large"
            sx={{
              ...outlinedPillSx('neutral'),
              minHeight: 52,
              px: 3,
              color: 'var(--hero-text)',
              borderColor: 'var(--hero-line)',
              bgcolor: 'transparent',
              '&::before': { ...outlinedPillSx('neutral')['&::before'], bgcolor: 'var(--hero-line)' },
              '&:hover, &:focus-visible': { color: 'var(--hero-line-hover-text)', borderColor: 'var(--hero-line)', bgcolor: 'transparent' },
            }}
          >
            <RollText>저를 소개할게요</RollText>
          </Button>
        </Stack>

        <Box
          aria-hidden
          sx={{
            mt: { xs: 8, md: 10 },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontFamily: 'var(--font-code)',
            fontSize: '0.75rem',
            color: 'var(--hero-muted)',
            ...fadeInSx(isRendered, 1300),
          }}
        >
          <ArrowDownwardIcon
            sx={{
              fontSize: 16,
              animation: 'heroScroll 1.8s var(--ease) infinite',
              '@keyframes heroScroll': { '0%, 100%': { transform: 'none' }, '50%': { transform: 'translateY(5px)' } },
            }}
          />
          scroll
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
