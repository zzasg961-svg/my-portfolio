import { createTheme } from '@mui/material/styles'

// MUI 내부 계산(대비색 등)에 쓰이는 기준값입니다.
// 실제 화면 색상은 colors.css의 CSS 변수를 사용하므로 다크모드에서도 자동으로 바뀝니다.
const theme = createTheme({
  palette: {
    primary: {
      main: '#03C75A',
      light: '#29CF73',
      dark: '#00893D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3283FD',
    },
    error: {
      main: '#F4361E',
    },
  },
  typography: {
    fontFamily:
      "'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: 'var(--color-button-primary)',
          '&:hover': { backgroundColor: 'var(--color-button-hover)' },
          '&:active': { backgroundColor: 'var(--color-button-active)' },
        },
      },
    },
  },
})

export default theme
