import { Box, Card, CardContent, Divider, Stack } from '@mui/material';
import { useAboutMe } from '../../hooks/use-about-me';
import SectionHeading from '../contact/section-heading';
import AboutSectionContent from './about-section-content';
import BasicInfo from './basic-info';

/**
 * HomeAboutSection 컴포넌트
 * Home 탭의 About Me 섹션입니다. 별도 페이지 없이 여기서 모든 내용을 보여줍니다.
 * - 기본 정보(사진·학력·전공·경력)
 * - showInHome이 true인 콘텐츠 섹션
 * 상단 바의 About Me를 누르면 이 섹션(id="about")으로 스크롤됩니다.
 *
 * Example usage:
 * <HomeAboutSection />
 */
function HomeAboutSection() {
  const { basicInfo, homeSections } = useAboutMe();

  return (
    <Card
      id="about"
      component="section"
      elevation={ 0 }
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
        borderTop: '4px solid var(--color-primary)',
        /** 상단 고정 바에 가려지지 않도록 스크롤 위치 보정 */
        scrollMarginTop: { xs: 120, sm: 88 },
      }}
    >
      <CardContent sx={{ py: { xs: 5, md: 8 }, px: { xs: 2.5, md: 5 } }}>
        <Stack spacing={{ xs: 3, md: 4 }}>
          <SectionHeading eyebrow="ABOUT ME" title={ `안녕하세요, ${basicInfo.name}입니다` } />

          <BasicInfo basicInfo={ basicInfo } />

          {homeSections.length > 0 && (
            <>
              <Divider sx={{ borderColor: 'var(--color-border-divider)' }} />

              {/* 모바일 1열, 태블릿 이상 섹션 수만큼 나란히 */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: `repeat(${homeSections.length}, 1fr)` },
                  gap: { xs: 2, md: 3 },
                }}
              >
                {homeSections.map((section) => (
                  <Box
                    key={ section.id }
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRadius: 3,
                      bgcolor: 'var(--color-bg-raised)',
                      border: '1px solid var(--color-border-divider)',
                    }}
                  >
                    <Box
                      component="h3"
                      sx={{ m: 0, mb: 1.5, fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-text-primary)' }}
                    >
                      { section.title }
                    </Box>
                    <AboutSectionContent content={ section.content } />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default HomeAboutSection;
