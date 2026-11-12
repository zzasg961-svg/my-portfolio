import { Box, ButtonBase } from '@mui/material';
import PageSection from '../common/page-section';
import SkillIcon from './skill-icon';
import { SKILL_GROUPS } from './skills-data';
import { useScrollSteps } from '../../hooks/use-scroll-steps';

/** 모든 스킬을 한 줄로 펼치고, 그룹 이름(DESIGN / CODE)을 붙여 둡니다 */
const ALL_SKILLS = SKILL_GROUPS.flatMap((group) => group.skills.map((skill) => ({ ...skill, groupLabel: group.label })));
const SKILL_COUNT = ALL_SKILLS.length;

/** 상단 바 높이 (모바일은 메뉴가 두 줄) — 이 아래에 무대가 고정됩니다 */
const NAV_HEIGHT = { xs: 86, sm: 72 };
/** 오른쪽 목록 한 줄의 높이 */
const ITEM_HEIGHT = { xs: 52, md: 104 };

const pad = (number) => String(number).padStart(2, '0');

/** 현재 항목과의 거리에 따라 흐려지는 정도 (가까울수록 선명) */
const OPACITY_BY_DISTANCE = [1, 0.32, 0.14, 0.06];

/** 오른쪽: 큰 글씨 스킬 목록. 현재 스킬이 항상 가운데 오도록 목록 전체가 위아래로 움직입니다 */
function SkillWheel({ activeIndex, onSelect }) {
  return (
    <Box
      sx={{
        gridArea: 'wheel',
        position: 'relative',
        height: { xs: ITEM_HEIGHT.xs * 3, md: '100%' },
        overflow: 'clip',
        '--item-h': { xs: `${ITEM_HEIGHT.xs}px`, md: `${ITEM_HEIGHT.md}px` },
        // 위아래 끝은 서서히 사라지게
        maskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)',
      }}
    >
      <Box
        component="ol"
        aria-label="스킬 목록"
        sx={{
          m: 0,
          p: 0,
          listStyle: 'none',
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: `translateY(calc((${activeIndex} + 0.5) * var(--item-h) * -1))`,
          transition: 'transform 0.8s var(--ease)',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      >
        {ALL_SKILLS.map((skill, index) => {
          const distance = Math.abs(index - activeIndex);
          const isActive = distance === 0;
          return (
            <Box component="li" key={ skill.id } sx={{ height: 'var(--item-h)', borderTop: index === 0 ? 'none' : '1px dashed var(--color-border-default)' }}>
              <ButtonBase
                onClick={ () => onSelect(index) }
                aria-current={ isActive ? 'true' : undefined }
                sx={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'flex-start',
                  gap: { xs: 1.5, md: 2.5 },
                  fontFamily: 'var(--font-display)',
                  fontSize: { xs: '1.75rem', sm: '2.5rem', md: '4.25rem' },
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  color: 'var(--color-text-primary)',
                  opacity: OPACITY_BY_DISTANCE[Math.min(distance, OPACITY_BY_DISTANCE.length - 1)],
                  transition: 'opacity 0.6s var(--ease)',
                  '&:hover': { opacity: isActive ? 1 : 0.6 },
                  '&.Mui-focusVisible': { outline: '2px solid var(--color-accent)', outlineOffset: -2, opacity: 1 },
                }}
              >
                <Box component="span" aria-hidden sx={{ fontFamily: 'var(--font-code)', fontSize: { xs: '0.6875rem', md: '0.875rem' }, fontWeight: 500, letterSpacing: 0, color: isActive ? 'var(--color-accent-text)' : 'inherit', alignSelf: 'flex-start', mt: { xs: 1.5, md: 3 } }}>
                  { pad(index + 1) }
                </Box>
                { skill.name }
              </ButtonBase>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/** 왼쪽 위: 큰 아이콘 패널. 모든 아이콘을 겹쳐 두고 현재 것만 선명하게 떠오릅니다 */
function SkillVisual({ activeIndex }) {
  return (
    <Box
      aria-hidden
      sx={{
        gridArea: 'visual',
        position: 'relative',
        aspectRatio: { xs: '16 / 7', md: '16 / 10' },
        borderRadius: { xs: 3, md: 4 },
        overflow: 'hidden',
        bgcolor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
        // 은은한 붉은 빛과 모눈
        backgroundImage: 'radial-gradient(circle at 50% 55%, var(--color-primary-subtle), transparent 60%), linear-gradient(var(--color-border-divider) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-divider) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 32px 32px, 32px 32px',
      }}
    >
      {/* 배경의 큰 번호 */}
      <Box
        key={ `num-${activeIndex}` }
        sx={{
          position: 'absolute',
          right: { xs: 12, md: 24 },
          bottom: { xs: -8, md: -16 },
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: { xs: '4rem', md: '7.5rem' },
          lineHeight: 1,
          letterSpacing: '-0.06em',
          color: 'transparent',
          WebkitTextStroke: '1px var(--color-border-default)',
          animation: 'skillNumIn 0.8s var(--ease)',
          '@keyframes skillNumIn': { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'none' } },
        }}
      >
        { pad(activeIndex + 1) }
      </Box>

      {ALL_SKILLS.map((skill, index) => {
        const isActive = index === activeIndex;
        return (
          <Box
            key={ skill.id }
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              color: 'var(--color-text-primary)',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'none' : `translateY(${index < activeIndex ? -24 : 24}px) scale(0.85)`,
              filter: isActive ? 'none' : 'blur(8px)',
              transition: 'opacity 0.6s var(--ease), transform 0.8s var(--ease), filter 0.6s var(--ease)',
              '& svg': { width: { xs: 64, md: 132 }, height: { xs: 64, md: 132 } },
            }}
          >
            <SkillIcon id={ skill.id } size={ 132 } />
          </Box>
        );
      })}
    </Box>
  );
}

/** 왼쪽 아래: 스킬 이름 + 그룹 + Can Do + 순서 */
function SkillDetail({ activeIndex }) {
  const skill = ALL_SKILLS[activeIndex];

  return (
    <Box id="skill-detail" aria-live="polite" sx={{ gridArea: 'detail', minWidth: 0 }}>
      {/* 스킬이 바뀔 때마다 key가 바뀌어 내용이 새로 떠오릅니다 */}
      <Box
        key={ skill.id }
        sx={{
          '@keyframes skillSwap': {
            from: { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
            to: { opacity: 1, transform: 'none', filter: 'none' },
          },
          '& > *': { animation: 'skillSwap 0.6s var(--ease) both' },
          '@media (prefers-reduced-motion: reduce)': { '& > *': { animation: 'none' } },
        }}
      >
        <Box component="h3" sx={{ m: 0, fontFamily: 'var(--font-display)', fontSize: { xs: '1.5rem', md: '2.5rem' }, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--color-text-primary)' }}>
          { skill.name }
        </Box>
        <Box sx={{ mt: { xs: 0.5, md: 1 }, fontFamily: 'var(--font-code)', fontSize: { xs: '0.75rem', md: '0.8125rem' }, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--color-accent-text)', animationDelay: '60ms' }}>
          { `(${skill.groupLabel}) · CAN DO` }
        </Box>
        <Box
          component="ul"
          sx={{
            m: 0,
            mt: { xs: 1.25, md: 2 },
            pl: 2.25,
            color: 'var(--color-text-secondary)',
            fontSize: { xs: '0.875rem', md: '1rem' },
            lineHeight: { xs: 1.7, md: 1.85 },
            animationDelay: '120ms',
            '& li::marker': { color: 'var(--color-accent)' },
          }}
        >
          {skill.canDo.map((item) => <li key={ item }>{ item }</li>)}
        </Box>
      </Box>
      <Box sx={{ mt: { xs: 1.5, md: 3 }, fontFamily: 'var(--font-code)', fontSize: '0.75rem', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
        { `(${pad(activeIndex + 1)} / ${pad(SKILL_COUNT)})` }
      </Box>
    </Box>
  );
}

/**
 * SkillsSection 컴포넌트
 * 스크롤을 내리면 무대가 화면에 고정되고, 스크롤할 때마다 다음 스킬로 넘어갑니다.
 * - 오른쪽: 큰 글씨 스킬 목록 (현재 스킬이 가운데에서 선명, 나머지는 흐리게)
 * - 왼쪽 위: 현재 스킬의 큰 아이콘 / 왼쪽 아래: 이름·분류·Can Do·순서
 * 목록의 스킬 이름을 누르면(또는 키보드로 고르면) 그 스킬 위치로 이동합니다.
 * 마지막 스킬까지 지나가면 고정이 풀리고 다음 섹션으로 이어집니다.
 * 움직임 줄이기 설정 사용자에게는 고정 없이 목록을 눌러 바꾸는 방식으로 보여줍니다.
 * 상단 바의 Skill Tree를 누르면 이 섹션(id="skills")으로 스크롤됩니다.
 *
 * Example usage:
 * <SkillsSection />
 */
function SkillsSection() {
  const { sectionRef, stickyRef, activeIndex, isPinned, goTo } = useScrollSteps(SKILL_COUNT, 0.5);

  return (
    <PageSection
      id="skills"
      index="02"
      label="SKILL TREE"
      title={ '디자인과 코드,\n두 개의 언어' }
      description="숙련도 막대 대신, 각 기술로 어려움 없이 해낼 수 있는 일을 적었어요. 스크롤하면 기술이 하나씩 넘어가요."
    >
      <Box ref={ sectionRef } sx={{ position: 'relative' }}>
        <Box
          ref={ stickyRef }
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 6fr' },
            gridTemplateRows: { xs: 'auto auto auto', md: 'auto 1fr' },
            gridTemplateAreas: { xs: '"wheel" "visual" "detail"', md: '"visual wheel" "detail wheel"' },
            columnGap: { md: 8 },
            rowGap: { xs: 2.5, md: 4 },
            alignContent: 'center',
            py: { xs: 3, md: 5 },
            ...(isPinned && {
              position: 'sticky',
              top: { xs: NAV_HEIGHT.xs, sm: NAV_HEIGHT.sm },
              height: { xs: `calc(100svh - ${NAV_HEIGHT.xs}px)`, sm: `calc(100svh - ${NAV_HEIGHT.sm}px)` },
            }),
          }}
        >
          <SkillVisual activeIndex={ activeIndex } />
          <SkillDetail activeIndex={ activeIndex } />
          <SkillWheel activeIndex={ activeIndex } onSelect={ goTo } />
        </Box>
      </Box>

      <Box sx={{ mt: 2, fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
        * 기준: 이 기술로 실제 프로젝트를 처음부터 끝까지 어려움 없이 완성할 수 있는 수준
      </Box>
    </PageSection>
  );
}

export default SkillsSection;
