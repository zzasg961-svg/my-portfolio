import { Box, Stack } from '@mui/material';
import { useAboutMe } from '../../hooks/use-about-me';
import { useInView } from '../../hooks/use-in-view';
import PageSection from '../common/page-section';
import LabelDot from '../common/label-dot';
import SoftReveal from '../common/soft-reveal';
import AboutSectionContent from './about-section-content';
import BasicInfo from './basic-info';

/** 섹션 id별 작은 라벨 */
const SECTION_LABELS = {
  'dev-story': 'STORY',
  philosophy: 'VALUE',
};

/**
 * 글 한 덩어리 (라벨 → 제목 → 본문)
 * 위쪽 선이 가운데에서 양옆으로 퍼지듯 그어지고, 라벨·제목·본문이 차례로 초점이 맞춰지듯 나타납니다.
 */
function AboutArticle({ section }) {
  const [ref, isInView] = useInView({ threshold: 0.25 });

  return (
    <Box
      ref={ ref }
      component="article"
      sx={{
        position: 'relative',
        pt: 3.5,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          bgcolor: 'var(--color-border-default)',
          transformOrigin: 'center',
          transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.6s var(--ease)',
          '@media (prefers-reduced-motion: reduce)': { transform: 'scaleX(1)' },
        },
      }}
    >
      <SoftReveal delay={ 200 } sx={{ mb: 1.5 }}>
        <LabelDot color="var(--color-accent-text)">{ SECTION_LABELS[section.id] ?? section.id.toUpperCase() }</LabelDot>
      </SoftReveal>
      <SoftReveal
        component="h3"
        delay={ 350 }
        sx={{ m: 0, mb: 2.5, fontSize: { xs: '1.375rem', md: '1.75rem' }, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}
      >
        { section.title }
      </SoftReveal>
      <AboutSectionContent content={ section.content } delay={ 500 } />
    </Box>
  );
}

/**
 * HomeAboutSection 컴포넌트
 * 홈 화면의 About Me 섹션입니다. 왼쪽에 원형 프로필, 오른쪽에 개발 스토리·철학을 보여줍니다.
 * 상단 바의 About Me를 누르면 이 섹션(id="about")으로 스크롤됩니다.
 *
 * Example usage:
 * <HomeAboutSection />
 */
function HomeAboutSection() {
  const { basicInfo, homeSections } = useAboutMe();

  return (
    <PageSection id="about" index="01" label="ABOUT ME" title={ `안녕하세요,\n${basicInfo.name}입니다.` }>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
          gap: { xs: 8, md: 10 },
          alignItems: 'start',
        }}
      >
        {/* 데스크톱에서는 글을 읽는 동안 프로필이 옆에 머무릅니다 */}
        <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
          <BasicInfo basicInfo={ basicInfo } />
        </Box>

        <Stack spacing={{ xs: 6, md: 8 }}>
          {homeSections.map((section) => (
            <AboutArticle key={ section.id } section={ section } />
          ))}
        </Stack>
      </Box>
    </PageSection>
  );
}

export default HomeAboutSection;
