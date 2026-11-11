import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useProjects } from '../../hooks/use-projects';
import PageSection from '../common/page-section';
import Reveal from '../common/reveal';
import RollText from '../common/roll-text';
import { outlinedPillSx } from '../common/button-styles';
import { useMagnetic } from '../../hooks/use-magnetic';
import ProjectGrid from './project-grid';

/**
 * HomeProjectsSection 컴포넌트
 * 홈 화면의 Projects 섹션입니다. 대표 프로젝트를 최대 previewCount개 보여주고
 * '전체 보기' 버튼으로 Projects 페이지로 이동합니다.
 * 상단 바의 Projects를 누르면 이 섹션(id="projects")으로 스크롤됩니다.
 *
 * Props:
 * @param {number} previewCount - 미리 보여줄 프로젝트 수 [Optional, 기본값: 3]
 *
 * Example usage:
 * <HomeProjectsSection previewCount={3} />
 */
function HomeProjectsSection({ previewCount = 3 }) {
  const { projects, isLoading, error, isConfigured } = useProjects();
  const previewProjects = projects.slice(0, previewCount);
  const isUnavailable = !isConfigured || Boolean(error) || (!isLoading && previewProjects.length === 0);
  const magnetRef = useMagnetic(0.3);

  return (
    <PageSection
      id="projects"
      index="03"
      label="PROJECTS"
      title={ '직접 디자인하고,\n직접 만든 작업' }
      description="기획부터 디자인, 구현과 배포까지 직접 진행한 프로젝트들이에요. 카드를 눌러 자세히 볼 수 있어요."
      action={
        <Button
          ref={ magnetRef }
          component={ RouterLink }
          to="/projects"
          endIcon={ <ArrowForwardIcon /> }
          sx={{ ...outlinedPillSx('accent'), flexShrink: 0, minHeight: 48, px: 3 }}
        >
          <RollText>전체 보기</RollText>
        </Button>
      }
    >
      {isUnavailable ? (
        <Box
          sx={{
            py: 6,
            textAlign: 'center',
            borderRadius: 3,
            color: 'var(--color-text-muted)',
            border: '1px dashed var(--color-border-default)',
          }}
        >
          프로젝트를 불러오지 못했어요. 잠시 후 다시 확인해 주세요.
        </Box>
      ) : (
        <Reveal>
          <ProjectGrid projects={ previewProjects } isLoading={ isLoading } skeletonCount={ previewCount } />
        </Reveal>
      )}
    </PageSection>
  );
}

export default HomeProjectsSection;
