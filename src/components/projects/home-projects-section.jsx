import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useProjects } from '../../hooks/use-projects';
import SectionHeading from '../contact/section-heading';
import ProjectGrid from './project-grid';

/**
 * HomeProjectsSection 컴포넌트
 * Home 탭의 Projects 섹션입니다. 대표 프로젝트를 최대 previewCount개 보여주고
 * '더 보기' 버튼으로 Projects 탭으로 이동합니다.
 *
 * Props:
 * @param {number} previewCount - 미리 보여줄 프로젝트 수 [Optional, 기본값: 3]
 *
 * Example usage:
 * <HomeProjectsSection previewCount={3} />
 */
function HomeProjectsSection({ previewCount = 3 }) {
  const { projects, isLoading, error, isConfigured } = useProjects();
  const previewProjects = projects.slice(0, previewCount);

  /** 서버 미설정 또는 오류 시에는 홈 화면을 깔끔하게 유지하기 위해 섹션을 숨깁니다 */
  if (!isConfigured || error || (!isLoading && previewProjects.length === 0)) return null;

  return (
    <Card
      id="projects"
      component="section"
      elevation={ 0 }
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 4 } }}>
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={ 2 }
            sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' } }}
          >
            <Box>
              <SectionHeading eyebrow="PROJECTS" title="대표 프로젝트" />
              <Box sx={{ mt: 1.5, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                직접 기획하고 개발해 배포한 프로젝트들이에요.
              </Box>
            </Box>
            <Button
              component={ RouterLink }
              to="/projects"
              color="secondary"
              endIcon={ <ArrowForwardIcon /> }
              sx={{ flexShrink: 0, minHeight: 40 }}
            >
              더 보기
            </Button>
          </Stack>

          <ProjectGrid projects={ previewProjects } isLoading={ isLoading } skeletonCount={ previewCount } />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default HomeProjectsSection;
