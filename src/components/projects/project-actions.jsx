import { Button, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

/**
 * 링크 버튼 공통 스타일
 * - 글자 길이에 맞춰 폭을 나눠 갖고(flex: 1 1 auto), 좌우 여백·아이콘 간격을 동일하게 고정
 * - 클릭 시 살짝 눌리는 피드백 (과하지 않게 0.97배)
 */
const actionButtonSx = {
  flex: '1 1 auto',
  minWidth: 0,
  height: 40,
  px: 1.5,
  borderRadius: 2,
  fontSize: '0.875rem',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  transition: 'transform 0.12s ease, background-color 0.2s ease',
  '& .MuiButton-startIcon': { ml: 0, mr: 0.75 },
  '& .MuiButton-startIcon > svg': { fontSize: 18 },
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
          startIcon={ <LaunchIcon /> }
          disableElevation
          sx={ actionButtonSx }
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
            startIcon={ <GitHubIcon /> }
            sx={{
              ...actionButtonSx,
              color: 'var(--color-text-primary)',
              borderColor: 'var(--color-border-divider)',
              '&:hover': { borderColor: 'var(--color-border-default)', bgcolor: 'var(--color-hover-layer)' },
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
          sx={{ ...actionButtonSx, width: '100%' }}
        >
          View Details
        </Button>
      )}
    </Stack>
  );
}

export default ProjectActions;
