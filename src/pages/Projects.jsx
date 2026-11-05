import { Alert, Box, Button, Stack } from '@mui/material';
import SectionHeading from '../components/contact/section-heading';
import ProjectGrid from '../components/projects/project-grid';
import { useProjects } from '../hooks/use-projects';

/**
 * Projects 페이지
 * Supabase projects 테이블의 게시된 프로젝트를 카드 그리드로 보여줍니다.
 *
 * Example usage:
 * <Route path="/projects" element={<Projects />} />
 */
function Projects() {
  const { projects, isLoading, error, isConfigured, onRetry } = useProjects();

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

        <ProjectGrid projects={ projects } isLoading={ isLoading } />
      </Stack>
    </Box>
  );
}

export default Projects;
