import { useContext } from 'react';
import { ThemeModeContext } from '../components/common/theme-mode-context';

/**
 * 현재 화면 모드와 변경 함수를 돌려주는 훅
 *
 * @returns {{ mode: 'light' | 'dark', setMode: (mode: 'light' | 'dark') => void }}
 *
 * Example usage:
 * const { mode, setMode } = useThemeMode();
 */
export function useThemeMode() {
  return useContext(ThemeModeContext);
}
