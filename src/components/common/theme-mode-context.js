import { createContext } from 'react';

/**
 * 화면 모드(light/dark) 공유용 Context
 * 값: { mode: 'light' | 'dark', setMode: (mode) => void }
 */
export const ThemeModeContext = createContext({ mode: 'light', setMode: () => {} });
