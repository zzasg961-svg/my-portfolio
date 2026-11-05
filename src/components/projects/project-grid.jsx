import { useState } from 'react';
import { Grid } from '@mui/material';
import ProjectCard from './project-card';
import ProjectCardSkeleton from './project-card-skeleton';
import ProjectDetailDialog from './project-detail-dialog';

/** 카드 그리드: 모바일 1열 → 태블릿 2열 → 데스크톱 3열 */
const GRID_SIZE = { xs: 12, sm: 6, md: 4 };

/**
 * ProjectGrid 컴포넌트
 * 프로젝트 카드 그리드와 상세 다이얼로그를 함께 관리합니다.
 * Home(미리보기)과 Projects 페이지에서 공통으로 사용합니다.
 *
 * Props:
 * @param {Array} projects - 표시할 프로젝트 목록 [Required]
 * @param {boolean} isLoading - 로딩 중 여부 [Optional, 기본값: false]
 * @param {number} skeletonCount - 로딩 중 표시할 자리 카드 수 [Optional, 기본값: 3]
 *
 * Example usage:
 * <ProjectGrid projects={projects} isLoading={isLoading} />
 */
function ProjectGrid({ projects, isLoading = false, skeletonCount = 3 }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {isLoading
          ? Array.from({ length: skeletonCount }, (_, index) => (
            <Grid key={ index } size={ GRID_SIZE }>
              <ProjectCardSkeleton />
            </Grid>
          ))
          : projects.map((project, index) => (
            <Grid key={ project.id } size={ GRID_SIZE }>
              <ProjectCard project={ project } onViewDetails={ () => setSelectedIndex(index) } />
            </Grid>
          ))}
      </Grid>

      <ProjectDetailDialog
        projects={ projects }
        selectedIndex={ selectedIndex }
        onChangeIndex={ setSelectedIndex }
        onClose={ () => setSelectedIndex(-1) }
      />
    </>
  );
}

export default ProjectGrid;
