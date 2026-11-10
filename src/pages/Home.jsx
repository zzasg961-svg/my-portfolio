import { Stack } from '@mui/material'
import SectionCard from '../components/SectionCard'
import ContactSection from '../components/contact/contact-section'
import HomeAboutSection from '../components/about/home-about-section'
import HomeProjectsSection from '../components/projects/home-projects-section'
import { useScrollToSection } from '../hooks/use-scroll-to-section'

const SECTIONS = [
  {
    id: 'hero',
    label: 'HERO',
    title: 'Hero',
    description: '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.',
    color: 'primary',
    highlight: true,
  },
  {
    id: 'skills',
    label: 'SKILL TREE',
    title: 'Skill Tree',
    description: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
    color: 'secondary',
  },
]

function Home() {
  useScrollToSection()

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      {/* Hero → About Me → Skill Tree 순서 유지 */}
      <SectionCard {...SECTIONS[0]} />
      <HomeAboutSection />
      {SECTIONS.slice(1).map((section) => (
        <SectionCard key={section.id} {...section} />
      ))}
      <HomeProjectsSection />
      <ContactSection />
    </Stack>
  )
}

export default Home
