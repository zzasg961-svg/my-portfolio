import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

/**
 * ProjectThumbnail 컴포넌트
 * 4:3 영역을 사이트 스크린샷으로 꽉 채워 보여줍니다. (상단 기준으로 잘림)
 * 이미지 로딩 중에는 Skeleton, 실패 시 대체 아이콘을 표시합니다.
 *
 * Props:
 * @param {string} src - 썸네일 이미지 URL [Required]
 * @param {string} alt - 이미지 대체 텍스트 [Required]
 *
 * Example usage:
 * <ProjectThumbnail src={project.thumbnail_url} alt="MOA 미리보기" />
 */
function ProjectThumbnail({ src, alt }) {
  const [status, setStatus] = useState('loading');

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        bgcolor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border-divider)',
      }}
    >
      {status === 'loading' && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      )}
      {status === 'error' ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-muted)',
          }}
        >
          <ImageNotSupportedOutlinedIcon />
        </Box>
      ) : (
        <Box
          component="img"
          src={ src }
          alt={ alt }
          loading="lazy"
          onLoad={ () => setStatus('loaded') }
          onError={ () => setStatus('error') }
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
            opacity: status === 'loaded' ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </Box>
  );
}

export default ProjectThumbnail;
