import { Box, Container } from '@mui/material'
import HeroSection from '../components/hero/hero-section'
import HomeAboutSection from '../components/about/home-about-section'
import SkillsSection from '../components/skills/skills-section'
import HomeProjectsSection from '../components/projects/home-projects-section'
import ContactSection from '../components/contact/contact-section'
import ScrollStatement from '../components/common/scroll-statement'
import { useScrollToSection } from '../hooks/use-scroll-to-section'

/**
 * Home 페이지
 * 스크롤 순서: Hero → About Me → Skill Tree → Projects → Contact
 * Hero는 화면에 고정(sticky)되고, 나머지 콘텐츠가 둥근 모서리의 막처럼 그 위를 덮으며 올라옵니다.
 */
function Home() {
  useScrollToSection()

  return (
    <Box>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 0 }}>
        <HeroSection />
      </Box>

      {/* Hero를 덮고 올라오는 콘텐츠 막 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          bgcolor: 'var(--color-bg-secondary)',
          borderTopLeftRadius: { xs: 24, md: 48 },
          borderTopRightRadius: { xs: 24, md: 48 },
          boxShadow: 'var(--shadow-curtain)',
          // hidden 대신 clip: 둥근 모서리 밖은 잘라 내면서도, Projects 섹션의 화면 고정(sticky)이 동작하도록 합니다
          overflow: 'clip',
        }}
      >
        <ScrollStatement />
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <HomeAboutSection />
          <SkillsSection />
          <HomeProjectsSection />
          <ContactSection />
        </Container>
      </Box>
    </Box>
  )
}

export default Home
