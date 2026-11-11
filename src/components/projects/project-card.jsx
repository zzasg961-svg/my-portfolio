import { Box, Card, CardActionArea, CardContent } from '@mui/material';
import ProjectThumbnail from './project-thumbnail';
import ProjectActions from './project-actions';
import TechStackChips from './tech-stack-chips';

/** 마우스 위치에 따라 카드를 3D로 기울이고 반사광 위치를 옮깁니다 (마우스 사용자만) */
const handleTiltMove = (event) => {
  if (event.pointerType !== 'mouse') return;
  const card = event.currentTarget;
  const { left, top, width, height } = card.getBoundingClientRect();
  const x = (event.clientX - left) / width;
  const y = (event.clientY - top) / height;
  card.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
  card.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
  card.style.setProperty('--gx', `${x * 100}%`);
  card.style.setProperty('--gy', `${y * 100}%`);
};

const handleTiltLeave = (event) => {
  event.currentTarget.style.setProperty('--rx', '0deg');
  event.currentTarget.style.setProperty('--ry', '0deg');
};

/**
 * ProjectCard 컴포넌트
 * 썸네일(사이트 화면) + 제목 + 한 줄 설명 + 기술 스택 + 버튼으로 구성된 카드입니다.
 * 호버 시 살짝 떠오르며 그림자가 생기고, 터치 기기에서는 리플로 피드백합니다.
 *
 * Props:
 * @param {object} project - 프로젝트 데이터 (title, description, tech_stack, detail_url, thumbnail_url, github_url) [Required]
 * @param {function} onViewDetails - 상세 보기 요청 시 실행 [Required]
 *
 * Example usage:
 * <ProjectCard project={project} onViewDetails={() => setSelected(project)} />
 */
function ProjectCard({ project, onViewDetails }) {
  return (
    <Card
      component="article"
      elevation={ 0 }
      onPointerMove={ handleTiltMove }
      onPointerLeave={ handleTiltLeave }
      sx={{
        position: 'relative',
        '--rx': '0deg',
        '--ry': '0deg',
        transform: 'perspective(900px) rotateX(var(--rx)) rotateY(var(--ry))',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 4,
        bgcolor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
        transition: 'transform 0.4s var(--ease), box-shadow 0.4s var(--ease), border-color 0.4s var(--ease)',
        // 마우스를 따라 움직이는 반사광
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(400px circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.18), transparent 60%)',
          opacity: 0,
          transition: 'opacity 0.4s var(--ease)',
          zIndex: 2,
        },
        // 썸네일이 살짝 확대됩니다
        '& img, & iframe': { transition: 'transform 0.8s var(--ease)' },
        '@media (hover: hover)': {
          '&:hover': {
            borderColor: 'var(--color-accent)',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.14)',
          },
          '&:hover::after': { opacity: 1 },
          '&:hover img, &:hover iframe': { transform: 'scale(1.05)' },
        },
        '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
      }}
    >
      <CardActionArea
        onClick={ onViewDetails }
        aria-label={ `${project.title} 상세 보기` }
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <ProjectThumbnail src={ project.thumbnail_url } alt={ `${project.title} 미리보기` } />
        <CardContent sx={{ flexGrow: 1, px: 2, pt: 2, pb: 1.5 }}>
          <Box
            component="h3"
            sx={{
              m: 0,
              mb: 0.5,
              fontSize: { xs: '1.125rem', md: '1.2rem' },
              fontWeight: 800,
              lineHeight: 1.3,
              color: 'var(--color-text-primary)',
            }}
          >
            {project.title}
          </Box>
          <Box
            sx={{
              mb: 1.5,
              fontSize: '0.875rem',
              lineHeight: 1.5,
              color: 'var(--color-text-muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {project.description}
          </Box>
          <TechStackChips items={ project.tech_stack } />
        </CardContent>
      </CardActionArea>
      <Box sx={{ px: 2, pb: 2 }}>
        <ProjectActions
          demoUrl={ project.detail_url }
          githubUrl={ project.github_url }
          onViewDetails={ onViewDetails }
        />
      </Box>
    </Card>
  );
}

export default ProjectCard;
