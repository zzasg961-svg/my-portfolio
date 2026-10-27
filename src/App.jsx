import { Routes, Route } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--color-bg-secondary)' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, sm: 3 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
