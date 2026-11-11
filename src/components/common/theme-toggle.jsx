import { flushSync } from 'react-dom';
import { IconButton, Tooltip } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useThemeMode } from '../../hooks/use-theme-mode';

/**
 * ThemeToggle 컴포넌트
 * 라이트/다크 모드 전환 버튼입니다.
 * 지원하는 브라우저에서는 버튼 위치에서 새 테마가 원형으로 퍼져 나갑니다. (View Transitions API)
 *
 * Example usage:
 * <ThemeToggle />
 */
function ThemeToggle() {
  const { mode, setMode } = useThemeMode();
  const nextMode = mode === 'dark' ? 'light' : 'dark';
  const label = nextMode === 'dark' ? '다크 모드로 보기' : '라이트 모드로 보기';

  const handleClick = (event) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      setMode(nextMode);
      return;
    }

    // 버튼 중심에서 화면 가장 먼 모서리까지를 반지름으로 원을 키웁니다
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => {
      flushSync(() => setMode(nextMode));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  };

  return (
    <Tooltip title={ label }>
      <IconButton
        onClick={ handleClick }
        aria-label={ label }
        size="small"
        sx={{
          width: 36,
          height: 36,
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-default)',
          '&:hover': { bgcolor: 'var(--color-hover-layer)' },
          '& svg': { transition: 'transform 0.6s var(--ease)' },
          '&:hover svg': { transform: 'rotate(40deg)' },
        }}
      >
        {mode === 'dark' ? <LightModeOutlinedIcon sx={{ fontSize: 18 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
