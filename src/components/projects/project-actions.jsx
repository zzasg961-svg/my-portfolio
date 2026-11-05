import { Button, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

/** 버튼 클릭 시 살짝 눌리는 피드백 (과하지 않게 0.97배) */
const pressFeedbackSx = {
  flex: 1,
  minHeight: 40,
  borderRadius: 2,
  whiteSpace: 'nowrap',
  transition: 'transform 0.12s ease',
  '&:active': { transform: 'scale(0.97)' },
};

/**
 * ProjectActions 컴포넌트
 * Live Demo / GitHub / View Details 버튼 묶음입니다.
 *
 * Props:
 * @param {string} demoUrl - 배포 사이트 URL [Required]
 * @param {string} githubUrl - GitHub 저장소 URL (없으면 버튼 숨김) [Optional, 기본값: '']
 * @param {function} onViewDetails - View Details 클릭 시 실행 (없으면 버튼 숨김) [Optional]
 *
 * Example usage:
 * <ProjectActions demoUrl={url} githubUrl={repo} onViewDetails={handleOpen} />
 */
function ProjectActions({ demoUrl, githubUrl = '', onViewDetails }) {
  return (
    <Stack spacing={ 1 }>
      <Stack direction="row" spacing={ 1 }>
        <Button
          variant="contained"
          href={ demoUrl }
          target="_blank"
          rel="noopener noreferrer"
          startIcon={ <LaunchIcon fontSize="small" /> }
          disableElevation
          sx={ pressFeedbackSx }
        >
          Live Demo
        </Button>
        {githubUrl && (
          <Button
            variant="outlined"
            color="inherit"
            href={ githubUrl }
            target="_blank"
            rel="noopener noreferrer"
            startIcon={ <GitHubIcon fontSize="small" /> }
            sx={{
              ...pressFeedbackSx,
              color: 'var(--color-text-primary)',
              borderColor: 'var(--color-border-divider)',
            }}
          >
            GitHub
          </Button>
        )}
      </Stack>
      {onViewDetails && (
        <Button
          variant="text"
          color="secondary"
          onClick={ onViewDetails }
          sx={ pressFeedbackSx }
        >
          View Details
        </Button>
      )}
    </Stack>
  );
}

export default ProjectActions;
