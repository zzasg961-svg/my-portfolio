import { Stack } from '@mui/material';
import BasicInfoCard from '../components/about/basic-info-card';
import AboutSections from '../components/about/about-sections';
import { useAboutMe } from '../hooks/use-about-me';

/**
 * About Me 페이지
 * 상단에 기본 정보 카드, 아래에 콘텐츠 섹션(탭/아코디언)을 보여줍니다.
 *
 * Example usage:
 * <Route path="/about" element={<About />} />
 */
function About() {
  const { basicInfo, sections } = useAboutMe();

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      <BasicInfoCard basicInfo={ basicInfo } />
      <AboutSections sections={ sections } />
    </Stack>
  );
}

export default About;
