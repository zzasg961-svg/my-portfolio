import { Stack } from '@mui/material'
import SectionCard from '../components/SectionCard'
import ContactSection from '../components/contact/contact-section'

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
    id: 'about',
    label: 'ABOUT ME',
    title: 'About Me',
    description:
      "여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.",
    color: 'primary',
  },
  {
    id: 'skills',
    label: 'SKILL TREE',
    title: 'Skill Tree',
    description: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
    color: 'secondary',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    title: 'Projects',
    description:
      "여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.",
    color: 'secondary',
  },
]

function Home() {
  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      {SECTIONS.map((section) => (
        <SectionCard key={section.id} {...section} />
      ))}
      <ContactSection />
    </Stack>
  )
}

export default Home
