import { useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '../../theme';
import { ThemeModeContext } from './theme-mode-context';

const STORAGE_KEY = 'theme';
const THEME_COLORS = { light: '#FFFFFF', dark: '#0A0A0A' };

/** index.html 인라인 스크립트가 미리 정해 둔 모드를 읽습니다 */
function readInitialMode() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * ThemeModeProvider 컴포넌트
 * 라이트/다크 모드를 관리하고 MUI 테마와 <html data-theme>을 함께 바꿉니다.
 * 고른 모드는 브라우저에 저장되어 다음 방문에도 유지됩니다.
 *
 * Props:
 * @param {ReactNode} children - 앱 전체 [Required]
 *
 * Example usage:
 * <ThemeModeProvider><App /></ThemeModeProvider>
 */
function ThemeModeProvider({ children }) {
  const [mode, setModeState] = useState(readInitialMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const setMode = useCallback((nextMode) => {
    document.documentElement.dataset.theme = nextMode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[nextMode]);
    try {
      localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {
      /* 저장이 막힌 환경(시크릿 창 등)에서도 화면 전환은 동작합니다 */
    }
    setModeState(nextMode);
  }, []);

  const contextValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return (
    <ThemeModeContext.Provider value={ contextValue }>
      <ThemeProvider theme={ theme }>{ children }</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default ThemeModeProvider;
