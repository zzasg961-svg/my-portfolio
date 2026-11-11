import { Navigate, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import CustomCursor from './components/common/custom-cursor'
import IntroLoader from './components/common/intro-loader'
import Home from './pages/Home'
import Projects from './pages/Projects'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--color-bg-secondary)' }}>
      <Navbar />
      <Box component="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 예전 About Me 주소로 들어오면 홈의 About Me 섹션으로 이동 */}
          <Route path="/about" element={<Navigate to="/" replace state={{ scrollTo: 'about' }} />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Box>
      <Footer />
      <CustomCursor />
      <IntroLoader />
    </Box>
  )
}

export default App
