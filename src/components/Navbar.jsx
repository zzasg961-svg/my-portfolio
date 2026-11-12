import { Link, useLocation } from 'react-router-dom'
import { AppBar, Box, Button, Container, Stack, Toolbar } from '@mui/material'
import { useScrollProgress } from '../hooks/use-scroll-progress'
import RollText from './common/roll-text'
import ThemeToggle from './common/theme-toggle'

/** 모든 메뉴는 홈 화면의 해당 섹션으로 스크롤합니다 (Hero → About Me → Skill Tree → Projects → Contact) */
const NAV_ITEMS = [
  { label: 'Home', scrollTo: 'hero' },
  { label: 'About Me', scrollTo: 'about' },
  { label: 'Skill Tree', scrollTo: 'skills' },
  { label: 'Projects', scrollTo: 'projects' },
]

/**
 * Navbar 컴포넌트
 * 상단 고정 바입니다. 왼쪽 로고, 가운데 메뉴, 오른쪽 테마 전환·Contact 버튼으로 구성됩니다.
 * 바 아래쪽 빨간 선이 페이지 스크롤 진행도를 보여줍니다.
 * 모바일에서는 로고·버튼 한 줄, 메뉴 한 줄로 나뉩니다.
 */
function Navbar() {
  const location = useLocation()
  const currentScrollTo = location.state?.scrollTo
  const progressRef = useScrollProgress('page')

  const isItemActive = (item) => {
    if (item.scrollTo === 'projects' && location.pathname === '/projects') return true
    if (location.pathname !== '/') return false
    // 처음 접속했을 때(이동 기록 없음)는 Home을 활성화
    if (item.scrollTo === 'hero') return !currentScrollTo || currentScrollTo === 'hero'
    return currentScrollTo === item.scrollTo
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'var(--color-nav-bg)',
        backdropFilter: 'saturate(140%) blur(14px)',
        borderBottom: '1px solid var(--color-border-divider)',
        color: 'var(--color-text-primary)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 'auto', sm: 72 },
            py: { xs: 1, sm: 0 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr auto', sm: 'auto 1fr auto' },
            gridTemplateAreas: { xs: '"logo actions" "nav nav"', sm: '"logo nav actions"' },
            alignItems: 'center',
            rowGap: 0.5,
            columnGap: 2,
          }}
        >
          <Box
            component={Link}
            to="/"
            state={{ scrollTo: 'hero' }}
            aria-label="맨 위로"
            className="roll-trigger"
            sx={{
              gridArea: 'logo',
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              textDecoration: 'none',
              color: 'var(--color-text-primary)',
              '&:hover': { color: 'var(--color-text-primary)' },
            }}
          >
            <Box component="span" sx={{ fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
              <RollText>임유섭</RollText>
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: 'none', sm: 'inline' }, fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text-muted)' }}
            >
              Web Designer
            </Box>
          </Box>

          <Box
            component="nav"
            aria-label="섹션 이동"
            sx={{ gridArea: 'nav', display: 'flex', justifyContent: { xs: 'space-between', sm: 'center' }, gap: { sm: 0.5 } }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = isItemActive(item)
              return (
                <Button
                  key={item.label}
                  component={Link}
                  to="/"
                  state={{ scrollTo: item.scrollTo }}
                  aria-current={isActive ? 'location' : undefined}
                  sx={{
                    position: 'relative',
                    minWidth: 0,
                    px: { xs: 1, sm: 1.75 },
                    borderRadius: 999,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    '&:hover': { color: 'var(--color-text-primary)', bgcolor: 'transparent' },
                    // 활성 메뉴 아래 빨간 점
                    // 글자(특히 Projects의 j처럼 아래로 내려오는 글자)와 닿지 않도록 버튼 아래쪽에 충분히 띄웁니다
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -3,
                      left: '50%',
                      width: 4,
                      height: 4,
                      ml: '-2px',
                      borderRadius: '50%',
                      bgcolor: 'var(--color-accent)',
                      transform: isActive ? 'scale(1)' : 'scale(0)',
                      transition: 'transform 0.4s var(--ease)',
                    },
                  }}
                >
                  <RollText>{item.label}</RollText>
                </Button>
              )
            })}
          </Box>

          <Stack direction="row" spacing={1} sx={{ gridArea: 'actions', alignItems: 'center' }}>
            <ThemeToggle />
            {/* Contact는 언제든 바로 누를 수 있도록 항상 포인트 컬러로 고정 */}
            <Button
              component={Link}
              to="/"
              state={{ scrollTo: 'contact' }}
              variant="contained"
              disableElevation
              size="small"
              sx={{ minHeight: 36, fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              <RollText>Contact</RollText>
            </Button>
          </Stack>
        </Toolbar>
      </Container>

      {/* 페이지 스크롤 진행 막대 */}
      <Box
        ref={progressRef}
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          bottom: -1,
          width: '100%',
          height: 2,
          bgcolor: 'var(--color-accent)',
          transformOrigin: 'left',
          transform: 'scaleX(var(--progress, 0))',
        }}
      />
    </AppBar>
  )
}

export default Navbar
