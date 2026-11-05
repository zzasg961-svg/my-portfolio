import { Box, Dialog, DialogContent, IconButton, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { useSwipe } from '../../hooks/use-swipe';
import ProjectThumbnail from './project-thumbnail';
import ProjectActions from './project-actions';
import TechStackChips from './tech-stack-chips';

/**
 * ProjectDetailDialog 컴포넌트
 * 선택한 프로젝트의 상세 정보를 보여주는 다이얼로그입니다.
 * 모바일에서는 전체 화면으로 열리고, 좌우 스와이프(또는 화살표 버튼)로 이전/다음 프로젝트를 볼 수 있습니다.
 *
 * Props:
 * @param {Array} projects - 전체 프로젝트 목록 [Required]
 * @param {number} selectedIndex - 열려 있는 프로젝트 인덱스 (-1이면 닫힘) [Required]
 * @param {function} onChangeIndex - 인덱스 변경 시 실행 (index) => void [Required]
 * @param {function} onClose - 닫기 시 실행 [Required]
 *
 * Example usage:
 * <ProjectDetailDialog projects={projects} selectedIndex={index} onChangeIndex={setIndex} onClose={handleClose} />
 */
function ProjectDetailDialog({ projects, selectedIndex, onChangeIndex, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const project = projects[selectedIndex];
  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex < projects.length - 1;

  const goPrev = () => hasPrev && onChangeIndex(selectedIndex - 1);
  const goNext = () => hasNext && onChangeIndex(selectedIndex + 1);
  const swipeHandlers = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev });

  return (
    <Dialog
      open={ Boolean(project) }
      onClose={ onClose }
      fullScreen={ isMobile }
      fullWidth
      maxWidth="sm"
      aria-labelledby="project-detail-title"
      slotProps={{ paper: { sx: { borderRadius: isMobile ? 0 : 3, bgcolor: 'var(--color-bg-primary)' } } }}
    >
      {project && (
        <>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between', px: 1, py: 0.5 }}
          >
            <Box sx={{ px: 1, fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              {selectedIndex + 1} / {projects.length}
            </Box>
            <Stack direction="row">
              <IconButton onClick={ goPrev } disabled={ !hasPrev } aria-label="이전 프로젝트">
                <ChevronLeftIcon />
              </IconButton>
              <IconButton onClick={ goNext } disabled={ !hasNext } aria-label="다음 프로젝트">
                <ChevronRightIcon />
              </IconButton>
              <IconButton onClick={ onClose } aria-label="닫기">
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Box { ...swipeHandlers }>
            <ProjectThumbnail key={ project.id } src={ project.thumbnail_url } alt={ `${project.title} 미리보기` } />
          </Box>

          <DialogContent sx={{ px: { xs: 2, md: 3 }, pt: 2.5, pb: 3 }}>
            <Stack spacing={ 2 }>
              <Box>
                <Box
                  component="h2"
                  id="project-detail-title"
                  sx={{
                    m: 0,
                    mb: 0.75,
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                    fontWeight: 800,
                    lineHeight: 1.25,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {project.title}
                </Box>
                <Box sx={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                  {project.description}
                </Box>
              </Box>

              <Box>
                <Box
                  sx={{
                    mb: 1,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  TECH STACK
                </Box>
                <TechStackChips items={ project.tech_stack } />
              </Box>

              <ProjectActions demoUrl={ project.detail_url } githubUrl={ project.github_url } />

              {isMobile && projects.length > 1 && (
                <Box sx={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  이미지를 좌우로 밀어 다른 프로젝트를 볼 수 있어요
                </Box>
              )}
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

export default ProjectDetailDialog;
