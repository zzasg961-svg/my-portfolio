import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, ButtonBase, Skeleton, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useProjects } from '../../hooks/use-projects';
import { useHorizontalScroll } from '../../hooks/use-horizontal-scroll';
import { useMagnetic } from '../../hooks/use-magnetic';
import SectionHeading from '../contact/section-heading';
import RollText from '../common/roll-text';
import { outlinedPillSx } from '../common/button-styles';
import ProjectSlideCard from './project-slide-card';
import ProjectDetailDialog from './project-detail-dialog';
import { SLIDE_SIZE_SX } from './slide-size';

/** 상단 바 높이 (모바일은 메뉴가 두 줄) — 이 아래에 섹션이 고정됩니다 */
const NAV_HEIGHT = { xs: 86, sm: 72 };
const SKELETON_COUNT = 3;

/** 마지막 카드: 전체 프로젝트 페이지로 이동 */
function ViewAllSlide({ onFocus }) {
  return (
    <ButtonBase
      component={ RouterLink }
      to="/projects"
      onFocus={ onFocus }
      sx={{
        ...SLIDE_SIZE_SX,
        aspectRatio: { xs: '3 / 4', md: '3 / 4' },
        width: { xs: '56vw', md: 'auto' },
        borderRadius: { xs: 3, md: 4 },
        border: '1px solid var(--color-border-default)',
        color: 'var(--color-text-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        transition: 'background-color 0.4s var(--ease), border-color 0.4s var(--ease)',
        '& .view-all-arrow': { transition: 'transform 0.5s var(--ease)' },
        '&.Mui-focusVisible': { outline: '3px solid var(--color-accent)', outlineOffset: 3 },
        '@media (hover: hover)': {
          '&:hover': { bgcolor: 'var(--color-primary-subtle)', borderColor: 'var(--color-accent)' },
          '&:hover .view-all-arrow': { transform: 'translateX(6px)' },
        },
      }}
    >
      <Box sx={{ width: 56, height: 56, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'var(--color-accent)', color: '#FFFFFF' }}>
        <ArrowForwardIcon className="view-all-arrow" />
      </Box>
      <Box sx={{ fontWeight: 800, fontSize: { xs: '1rem', md: '1.25rem' } }}>전체 프로젝트 보기</Box>
    </ButtonBase>
  );
}

/**
 * HomeProjectsSection 컴포넌트
 * 홈 화면의 Projects 섹션입니다. 스크롤을 내리면 섹션이 화면에 고정되고, 스크롤한 만큼 가로형 카드들이 옆으로 지나갑니다.
 * 마지막 카드까지 지나가면 고정이 풀려 다음 섹션으로 이어집니다.
 * 카드를 누르면 상세 다이얼로그가 열리고, 맨 끝 카드로 전체 프로젝트 페이지에 갈 수 있습니다.
 * 움직임 줄이기 설정 사용자에게는 고정 없이 손가락/트랙패드로 넘기는 일반 가로 스크롤로 보여줍니다.
 * 상단 바의 Projects를 누르면 이 섹션(id="projects")으로 스크롤됩니다.
 *
 * Example usage:
 * <HomeProjectsSection />
 */
function HomeProjectsSection() {
  const { projects, isLoading, error, isConfigured } = useProjects();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const isUnavailable = !isConfigured || Boolean(error) || (!isLoading && projects.length === 0);
  const slideCount = isLoading ? SKELETON_COUNT : projects.length;
  const { sectionRef, stickyRef, trackRef, activeIndex, isPinned, revealItem } = useHorizontalScroll(isUnavailable ? 0 : slideCount);
  const magnetRef = useMagnetic(0.3);

  /** 키보드로 카드에 들어오면 그 카드가 보이도록 스크롤 */
  const handleSlideFocus = (event) => revealItem(event.currentTarget);

  return (
    <Box
      ref={ sectionRef }
      component="section"
      id="projects"
      aria-labelledby="projects-title"
      sx={{
        '--progress': 0,
        position: 'relative',
        borderTop: '1px solid var(--color-border-divider)',
        scrollMarginTop: { xs: NAV_HEIGHT.xs, sm: NAV_HEIGHT.sm },
      }}
    >
      <Box
        ref={ stickyRef }
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 3, md: 4 },
          py: { xs: 4, md: 6 },
          ...(isPinned && {
            position: 'sticky',
            top: { xs: NAV_HEIGHT.xs, sm: NAV_HEIGHT.sm },
            height: { xs: `calc(100svh - ${NAV_HEIGHT.xs}px)`, sm: `calc(100svh - ${NAV_HEIGHT.sm}px)` },
          }),
        }}
      >
        {/* 제목 + 설명 + 전체 보기 */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={ 2 }
          sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, flexShrink: 0 }}
        >
          <Box id="projects-title">
            <SectionHeading index="03" label="PROJECTS" title={ '직접 디자인하고,\n직접 만든 작업' } />
          </Box>
          <Stack spacing={ 2 } sx={{ alignItems: { xs: 'flex-start', md: 'flex-end' }, textAlign: { md: 'right' } }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: 380, color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
              기획부터 디자인, 구현과 배포까지 직접 진행한 프로젝트들이에요. 카드를 눌러 자세히 볼 수 있어요.
            </Box>
            <Button
              ref={ magnetRef }
              component={ RouterLink }
              to="/projects"
              endIcon={ <ArrowForwardIcon /> }
              sx={{ ...outlinedPillSx('accent'), flexShrink: 0, minHeight: 44, px: 2.5 }}
            >
              <RollText>전체 보기</RollText>
            </Button>
          </Stack>
        </Stack>

        {isUnavailable ? (
          <Box sx={{ py: 6, textAlign: 'center', borderRadius: 3, color: 'var(--color-text-muted)', border: '1px dashed var(--color-border-default)' }}>
            프로젝트를 불러오지 못했어요. 잠시 후 다시 확인해 주세요.
          </Box>
        ) : (
          <>
            {/* 카드 줄: 왼쪽은 본문 시작선에 맞추고, 오른쪽은 화면 끝까지 이어져 다음 카드가 살짝 보입니다 */}
            <Box
              sx={{
                // 고정 영역의 남은 높이를 카드 줄이 모두 차지합니다 (모바일은 카드가 세로 가운데에 놓임)
                flex: isPinned ? 1 : 'none',
                minHeight: 0,
                mr: 'calc(50% - 50vw)',
                ...(isPinned
                  ? { overflow: 'clip' }
                  : { overflowX: 'auto', scrollSnapType: 'x mandatory', height: { md: '60vh' }, pb: 1 }),
              }}
            >
              <Box
                ref={ trackRef }
                role="list"
                aria-label="프로젝트 목록"
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: { xs: 'center', md: 'stretch' },
                  gap: { xs: 1.5, md: 3 },
                  width: 'max-content',
                  height: '100%',
                  pr: { xs: 2, md: '6vw' },
                  willChange: isPinned ? 'transform' : 'auto',
                  '& > *': { scrollSnapAlign: 'start' },
                }}
              >
                {isLoading
                  ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
                    <Skeleton key={ index } variant="rounded" data-slide-index={ index } sx={{ ...SLIDE_SIZE_SX, borderRadius: { xs: 3, md: 4 } }} />
                  ))
                  : projects.map((project, index) => (
                    <Box key={ project.id } role="listitem" sx={{ display: 'contents' }}>
                      <ProjectSlideCard
                        project={ project }
                        index={ index }
                        onViewDetails={ () => setSelectedIndex(index) }
                        onFocus={ handleSlideFocus }
                      />
                    </Box>
                  ))}
                {!isLoading && (
                  <Box role="listitem" sx={{ display: 'contents' }}>
                    <ViewAllSlide onFocus={ handleSlideFocus } />
                  </Box>
                )}
              </Box>
            </Box>

            {/* 현재 순서 + 진행 막대 */}
            <Stack direction="row" spacing={ 2 } sx={{ alignItems: 'center', flexShrink: 0, fontFamily: 'var(--font-code)', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              <Box aria-live="polite" sx={{ minWidth: 64 }}>
                <Box component="span" sx={{ color: 'var(--color-text-primary)' }}>{ String(Math.min(activeIndex + 1, Math.max(slideCount, 1))).padStart(2, '0') }</Box>
                { ` / ${String(slideCount).padStart(2, '0')}` }
              </Box>
              <Box aria-hidden sx={{ position: 'relative', flex: 1, height: '1px', bgcolor: 'var(--color-border-default)' }}>
                <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'var(--color-accent)', transformOrigin: 'left', transform: 'scaleX(var(--progress))' }} />
              </Box>
              {isPinned && <Box aria-hidden sx={{ display: { xs: 'none', sm: 'block' } }}>scroll →</Box>}
            </Stack>
          </>
        )}
      </Box>

      <ProjectDetailDialog
        projects={ projects }
        selectedIndex={ selectedIndex }
        onChangeIndex={ setSelectedIndex }
        onClose={ () => setSelectedIndex(-1) }
      />
    </Box>
  );
}

export default HomeProjectsSection;
