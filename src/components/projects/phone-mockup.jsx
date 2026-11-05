import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

/**
 * PhoneMockup 컴포넌트
 * 4:3 영역 가운데에 스마트폰 프레임을 두고, 그 안에 썸네일을 보여줍니다.
 * 이미지 로딩 중에는 Skeleton, 실패 시 대체 아이콘을 표시합니다.
 *
 * Props:
 * @param {string} src - 썸네일 이미지 URL [Required]
 * @param {string} alt - 이미지 대체 텍스트 [Required]
 *
 * Example usage:
 * <PhoneMockup src={project.thumbnail_url} alt="MOA 미리보기" />
 */
function PhoneMockup({ src, alt }) {
  const [status, setStatus] = useState('loading');

  return (
    <Box
      sx={{
        aspectRatio: '4 / 3',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        pt: 2.5,
        overflow: 'hidden',
        bgcolor: 'var(--color-primary-subtle)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '46%',
          height: '100%',
          p: '6px',
          pb: 0,
          borderRadius: '20px 20px 0 0',
          bgcolor: '#1C1C1E',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
            borderRadius: '15px 15px 0 0',
            bgcolor: 'var(--color-bg-primary)',
          }}
        >
          {status === 'loading' && (
            <Skeleton variant="rectangular" animation="wave" sx={{ position: 'absolute', inset: 0, height: '100%' }} />
          )}
          {status === 'error' ? (
            <Box
              sx={{
                height: '100%',
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
          <Box
            sx={{
              position: 'absolute',
              top: 6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '32%',
              height: 8,
              borderRadius: 4,
              bgcolor: '#1C1C1E',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PhoneMockup;
