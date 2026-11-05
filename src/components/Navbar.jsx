import { Link, NavLink, useLocation } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  // Projects는 홈 화면의 프로젝트 섹션으로 스크롤합니다.
  { label: 'Projects', to: '/', scrollTo: 'projects' },
]

function Navbar() {
  const location = useLocation()
  const currentScrollTo = location.state?.scrollTo

  // 같은 경로('/')를 공유하므로 scrollTo 값까지 비교해 활성 탭을 정합니다.
  const isItemActive = (item) => {
    if (item.scrollTo === 'projects') {
      return location.pathname === '/projects' || (location.pathname === '/' && currentScrollTo === 'projects')
    }
    if (item.to === '/') return location.pathname === '/' && currentScrollTo !== 'projects'
    return location.pathname === item.to
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border-divider)',
      }}
    >
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 0 },
            py: { xs: 1.5, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{ fontWeight: 800, color: 'var(--color-primary)', textDecoration: 'none' }}
          >
            My Portfolio
          </Typography>

          <Box component="nav" sx={{ display: 'flex', gap: 0.5 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.to}
                state={item.scrollTo ? { scrollTo: item.scrollTo } : undefined}
                className={isItemActive(item) ? 'active' : undefined}
                sx={{
                  color: 'var(--color-text-muted)',
                  fontWeight: 600,
                  borderRadius: 999,
                  px: 2,
                  '&:hover': { bgcolor: 'var(--color-hover-layer)' },
                  // 활성 탭만 Primary 컬러로 강조
                  '&.active': {
                    color: '#FFFFFF',
                    bgcolor: 'var(--color-primary)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
