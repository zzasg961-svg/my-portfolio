import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import ThemeModeProvider from './components/common/theme-mode-provider'
import './index.css'
import App from './App.jsx'

// GitHub Pages는 새로고침 시 하위 경로를 찾지 못하므로 HashRouter를 사용합니다.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeModeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeModeProvider>
  </StrictMode>,
)
