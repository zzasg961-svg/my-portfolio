import { useState } from 'react';
import { Alert, Box, Button, Grid, Stack } from '@mui/material';
import SectionHeading from '../components/contact/section-heading';
import ProjectCard from '../components/projects/project-card';
import ProjectCardSkeleton from '../components/projects/project-card-skeleton';
import ProjectDetailDialog from '../components/projects/project-detail-dialog';
import { useProjects } from '../hooks/use-projects';

/** 카드 그리드: 모바일 1열 → 태블릿 2열 → 데스크톱 3열 */
const GRID_SIZE = { xs: 12, sm: 6, md: 4 };
const SKELETON_COUNT = 3;

/**
 * Projects 페이지
 * Supabase projects 테이블의 게시된 프로젝트를 카드 그리드로 보여줍니다.
 *
 * Example usage:
 * <Route path="/projects" element={<Projects />} />
 */
function Projects() {
  const { projects, isLoading, error, isConfigured, onRetry } = useProjects();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Box component="section" id="projects">
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Box>
          <SectionHeading eyebrow="PROJECTS" title="작업한 프로젝트" />
          <Box sx={{ mt: 1.5, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            직접 기획하고 개발해 배포한 프로젝트들이에요. 카드를 눌러 자세히 볼 수 있어요.
          </Box>
        </Box>

        {!isConfigured && (
          <Alert severity="info" sx={{ borderRadius: 3 }}>
            프로젝트 목록을 준비하고 있어요. 곧 확인하실 수 있어요.
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{ borderRadius: 3 }}
            action={
              <Button color="inherit" size="small" onClick={ onRetry }>
                다시 시도
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {isConfigured && !isLoading && !error && projects.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center', color: 'var(--color-text-muted)' }}>
            아직 등록된 프로젝트가 없어요.
          </Box>
        )}

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <Grid key={ index } size={ GRID_SIZE }>
                <ProjectCardSkeleton />
              </Grid>
            ))
            : projects.map((project, index) => (
              <Grid key={ project.id } size={ GRID_SIZE }>
                <ProjectCard project={ project } onViewDetails={ () => setSelectedIndex(index) } />
              </Grid>
            ))}
        </Grid>
      </Stack>

      <ProjectDetailDialog
        projects={ projects }
        selectedIndex={ selectedIndex }
        onChangeIndex={ setSelectedIndex }
        onClose={ () => setSelectedIndex(-1) }
      />
    </Box>
  );
}

export default Projects;
