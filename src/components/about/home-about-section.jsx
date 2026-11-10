import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAboutMe } from '../../hooks/use-about-me';
import SectionHeading from '../contact/section-heading';
import AboutSectionContent from './about-section-content';

/**
 * HomeAboutSection 컴포넌트
 * Home 탭의 About Me 섹션입니다. showInHome이 true인 섹션만 보여주고
 * '더 알아보기' 버튼으로 About Me 탭으로 이동합니다.
 *
 * Example usage:
 * <HomeAboutSection />
 */
function HomeAboutSection() {
  const { basicInfo, homeSections } = useAboutMe();

  if (homeSections.length === 0) return null;

  return (
    <Card
      id="about"
      component="section"
      elevation={ 0 }
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
        borderTop: '4px solid var(--color-primary)',
      }}
    >
      <CardContent sx={{ py: { xs: 5, md: 8 }, px: { xs: 2.5, md: 5 } }}>
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={ 2 }
            sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' } }}
          >
            <SectionHeading eyebrow="ABOUT ME" title={ `안녕하세요, ${basicInfo.name}입니다` } />
            <Button
              component={ RouterLink }
              to="/about"
              color="secondary"
              endIcon={ <ArrowForwardIcon /> }
              sx={{ flexShrink: 0, minHeight: 40 }}
            >
              더 알아보기
            </Button>
          </Stack>

          {/* 모바일 1열, 태블릿 이상 2열 */}
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
        </Stack>
      </CardContent>
    </Card>
  );
}

export default HomeAboutSection;
