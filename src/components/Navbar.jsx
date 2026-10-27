import { NavLink } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
]

function Navbar() {
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
                key={item.to}
                component={NavLink}
                to={item.to}
                end
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
