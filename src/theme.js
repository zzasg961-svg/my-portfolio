import { createTheme } from '@mui/material/styles'

/**
 * MUI 테마 생성
 * MUI 내부 계산(대비색, 입력창 기본색 등)에 쓰이는 기준값입니다.
 * 실제 화면 색상은 colors.css의 CSS 변수를 사용합니다.
 *
 * @param {'light' | 'dark'} mode - 화면 모드
 * @returns {object} MUI 테마
 *
 * Example usage:
 * const theme = createAppTheme('dark')
 */
export function createAppTheme(mode) {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      // 레퍼런스 포인트 레드 (흰 글자와 대비 4.5:1)
      primary: {
        main: '#E82323',
        light: '#FA4343',
        dark: '#C81E1E',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: isDark ? '#FA4343' : '#E82323',
      },
      error: {
        main: isDark ? '#FA4343' : '#C81E1E',
      },
      background: {
        default: isDark ? '#0A0A0A' : '#FFFFFF',
        paper: isDark ? '#121212' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F6F6F6' : '#0A0A0A',
        secondary: isDark ? '#969696' : '#757575',
      },
    },
    typography: {
      fontFamily:
        "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
      button: {
        fontWeight: 700,
        textTransform: 'none',
      },
    },
    // 둥글기 단위 4px: sx의 borderRadius: 2 → 8px, 3 → 12px
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 16, backgroundImage: 'none' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          // 다크 모드에서 MUI가 자동으로 덧입히는 밝은 그라데이션 제거
          root: { backgroundImage: 'none' },
        },
      },
      MuiChip: {
        styleOverrides: {
          label: { paddingLeft: 10, paddingRight: 10 },
          labelSmall: { paddingLeft: 10, paddingRight: 10 },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 12, paddingLeft: 16, paddingRight: 16 },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, paddingLeft: 20, paddingRight: 20 },
          sizeSmall: { paddingLeft: 14, paddingRight: 14 },
          containedPrimary: {
            backgroundColor: 'var(--color-button-primary)',
            '&:hover': { backgroundColor: 'var(--color-button-hover)' },
            '&:active': { backgroundColor: 'var(--color-button-active)' },
          },
        },
      },
    },
  })
}
