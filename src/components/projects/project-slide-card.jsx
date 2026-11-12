import { useState } from 'react';
import { Box, ButtonBase } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SLIDE_SIZE_SX } from './slide-size';

/**
 * ProjectSlideCard 컴포넌트
 * 가로 슬라이드용 가로형 프로젝트 카드입니다.
 * 사이트 화면이 카드 전체를 채우고, 그 위에 제목(가운데)과 한 줄 설명(아래)을 얹습니다.
 * 평소에는 사이트 화면을 흐리고 어둡게 깔아 제목이 또렷하게 읽히고(사이트 안 글자와 겹치지 않도록),
 * 마우스를 올리면 흐림이 걷히며 실제 화면이 드러나고 '자세히 보기'가 나타납니다. 누르면 상세 다이얼로그를 엽니다.
 *
 * Props:
 * @param {object} project - { title, description, thumbnail_url } [Required]
 * @param {number} index - 카드 순서 (0부터) [Required]
 * @param {function} onViewDetails - 카드를 눌렀을 때 실행 [Required]
 * @param {function} onFocus - 키보드로 카드에 들어왔을 때 실행 (화면 밖 카드를 보이게 할 때 사용) [Optional]
 *
 * Example usage:
 * <ProjectSlideCard project={project} index={0} onViewDetails={() => setSelectedIndex(0)} />
 */
function ProjectSlideCard({ project, index, onViewDetails, onFocus }) {
  const [hasImageError, setHasImageError] = useState(false);
  const hasImage = Boolean(project.thumbnail_url) && !hasImageError;

  return (
    <ButtonBase
      component="article"
      role="button"
      tabIndex={ 0 }
      data-slide-index={ index }
      onClick={ onViewDetails }
      onFocus={ onFocus }
      aria-label={ `${project.title} 자세히 보기` }
      sx={{
        ...SLIDE_SIZE_SX,
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        borderRadius: { xs: 3, md: 4 },
        bgcolor: '#121212',
        color: '#FFFFFF',
        textAlign: 'left',
        '&.Mui-focusVisible': { outline: '3px solid var(--color-accent)', outlineOffset: 3 },
        '& .slide-image': { transition: 'transform 1.2s var(--ease), filter 0.8s var(--ease)' },
        '& .slide-shade': { transition: 'opacity 0.6s var(--ease)' },
        '& .slide-title': { transition: 'transform 0.6s var(--ease)' },
        '& .slide-more': { transition: 'opacity 0.5s var(--ease), transform 0.5s var(--ease)' },
        '@media (hover: hover)': {
          '&:hover .slide-image, &.Mui-focusVisible .slide-image': { transform: 'scale(1.02)', filter: 'grayscale(0) blur(0)' },
          '&:hover .slide-shade, &.Mui-focusVisible .slide-shade': { opacity: 0.6 },
          '&:hover .slide-title, &.Mui-focusVisible .slide-title': { transform: 'translateY(-10px)' },
          '&:hover .slide-more, &.Mui-focusVisible .slide-more': { opacity: 1, transform: 'none' },
        },
      }}
    >
      {/* 사이트 화면 (없거나 못 불러오면 어두운 바탕만) */}
      {hasImage && (
        <Box
          component="img"
          className="slide-image"
          src={ project.thumbnail_url }
          alt=""
          loading="lazy"
          decoding="async"
          onError={ () => setHasImageError(true) }
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            // 흐림 가장자리가 보이지 않도록 살짝 확대해 둡니다
            transform: 'scale(1.08)',
            filter: 'grayscale(0.6) blur(3px)',
          }}
        />
      )}

      {/* 글씨가 잘 읽히도록 덮는 어두운 막 (위는 옅게, 아래는 진하게) */}
      <Box
        className="slide-shade"
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.45) 0%, rgba(10, 10, 10, 0.55) 50%, rgba(10, 10, 10, 0.88) 100%)',
        }}
      />

      {/* 왼쪽 위: 순서 */}
      <Box aria-hidden sx={{ position: 'absolute', top: { xs: 14, md: 24 }, left: { xs: 16, md: 28 }, fontFamily: 'var(--font-code)', fontSize: { xs: '0.75rem', md: '0.8125rem' }, letterSpacing: '0.06em', opacity: 0.8 }}>
        { String(index + 1).padStart(2, '0') }
      </Box>

      {/* 가운데: 제목 + 자세히 보기 */}
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 3, textAlign: 'center' }}>
        <Box
          component="h3"
          className="slide-title"
          sx={{ m: 0, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.75rem' }, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, textShadow: '0 2px 24px rgba(0, 0, 0, 0.35)' }}
        >
          { project.title }
        </Box>
        <Box
          className="slide-more"
          aria-hidden
          sx={{
            mt: 2,
            display: { xs: 'none', md: 'inline-flex' },
            alignItems: 'center',
            gap: 0.75,
            px: 2,
            py: 0.75,
            borderRadius: 999,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            fontSize: '0.875rem',
            fontWeight: 700,
            opacity: 0,
            transform: 'translateY(8px)',
          }}
        >
          자세히 보기 <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Box>
      </Box>

      {/* 아래: 한 줄 설명 (위계: 제목이 가장 크고, 설명은 그 아래 단계) */}
      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, px: { xs: 2, md: 4 }, pb: { xs: 2, md: 3.5 }, textAlign: 'center' }}>
        <Box
          component="p"
          sx={{
            m: 0,
            fontSize: { xs: '0.875rem', md: '1rem' },
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.8)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          { project.description }
        </Box>
      </Box>
    </ButtonBase>
  );
}

export default ProjectSlideCard;
