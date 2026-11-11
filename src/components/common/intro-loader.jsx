import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { INTRO_DURATION_MS, SHOULD_SHOW_INTRO } from './intro-state';

const COUNT_DURATION_MS = 1000;

/**
 * IntroLoader 컴포넌트
 * 첫 방문 때 검은 막 위에서 숫자가 0 → 100으로 올라간 뒤, 막이 위로 걷히며 사이트가 드러납니다.
 * 같은 탭에서는 한 번만, 움직임 줄이기 설정 사용자에게는 보여주지 않습니다.
 *
 * Example usage:
 * <IntroLoader />
 */
function IntroLoader() {
  const [isVisible, setIsVisible] = useState(SHOULD_SHOW_INTRO);
  const [count, setCount] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!isVisible) return undefined;

    const startedAt = performance.now();
    let frameId = 0;
    const tick = (now) => {
      // 처음엔 빠르고 끝에서 느려지는 곡선으로 숫자를 올립니다
      const progress = Math.min((now - startedAt) / COUNT_DURATION_MS, 1);
      setCount(Math.round((1 - (1 - progress) ** 3) * 100));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    const leaveTimer = setTimeout(() => setIsLeaving(true), COUNT_DURATION_MS + 100);
    const hideTimer = setTimeout(() => setIsVisible(false), INTRO_DURATION_MS);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        bgcolor: '#0A0A0A',
        color: '#F6F6F6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: { xs: 3, md: 6 },
        transform: isLeaving ? 'translateY(-100%)' : 'none',
        // 막이 올라갈 때 아래쪽이 둥글게 휘어집니다
        borderBottomLeftRadius: isLeaving ? '50% 20%' : 0,
        borderBottomRightRadius: isLeaving ? '50% 20%' : 0,
        transition: 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1), border-radius 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <Box sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}>
        임유섭
        <Box component="span" sx={{ color: '#FA4343' }}>.</Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ fontFamily: 'var(--font-code)', fontSize: '0.8125rem', color: '#969696' }}>
          Design × Code
        </Box>
        <Box
          sx={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: { xs: '5rem', md: '10rem' },
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          { count }
          <Box component="span" sx={{ color: '#E82323' }}>%</Box>
        </Box>
      </Box>
      {/* 아래쪽 진행 막대 */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 3,
          width: `${count}%`,
          bgcolor: '#E82323',
        }}
      />
    </Box>
  );
}

export default IntroLoader;
