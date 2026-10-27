import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import './index.css'
import App from './App.jsx'

// GitHub Pages는 새로고침 시 하위 경로를 찾지 못하므로 HashRouter를 사용합니다.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
)
