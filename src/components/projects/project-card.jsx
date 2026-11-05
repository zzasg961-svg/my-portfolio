import { Box, Card, CardActionArea, CardContent } from '@mui/material';
import ProjectThumbnail from './project-thumbnail';
import ProjectActions from './project-actions';
import TechStackChips from './tech-stack-chips';

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
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 4,
        bgcolor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-4px) scale(1.01)',
            boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)',
          },
        },
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
