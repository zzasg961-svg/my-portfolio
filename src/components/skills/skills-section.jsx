import { useState } from 'react';
import { Box, ButtonBase } from '@mui/material';
import PageSection from '../common/page-section';
import Reveal from '../common/reveal';
import SkillIcon from './skill-icon';
import LabelDot from '../common/label-dot';
import { SKILL_GROUPS } from './skills-data';

const ALL_SKILLS = SKILL_GROUPS.flatMap((group) => group.skills);

/** 마우스 위치를 CSS 변수(--mx, --my)로 넘겨 스포트라이트가 따라오게 합니다 */
const handleSpotlightMove = (event) => {
  const { left, top } = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - top}px`);
};

/** 아이콘 버튼 하나 (마우스 올리기·포커스·탭 모두로 선택) */
function SkillTile({ skill, isActive, onSelect }) {
  return (
    <ButtonBase
      onClick={ onSelect }
      onMouseEnter={ onSelect }
      onMouseMove={ handleSpotlightMove }
      onFocus={ onSelect }
      aria-pressed={ isActive }
      aria-controls="skill-detail"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: { xs: 96, md: 120 },
        flexDirection: 'column',
        gap: 1.25,
        borderRadius: 3,
        border: '1px solid',
        borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border-divider)',
        bgcolor: 'var(--color-bg-primary)',
        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
        transition: 'border-color 0.3s var(--ease), color 0.3s var(--ease), transform 0.4s var(--ease)',
        // 마우스를 따라다니는 붉은 빛
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(160px circle at var(--mx, 50%) var(--my, 50%), var(--color-primary-subtle), transparent 70%)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.4s var(--ease)',
        },
        '& .skill-icon': { transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' },
        '@media (hover: hover)': {
          '&:hover': { transform: 'translateY(-4px)', color: 'var(--color-text-primary)' },
          '&:hover::before': { opacity: 1 },
          '&:hover .skill-icon': { transform: 'translateY(-3px) scale(1.15) rotate(-6deg)' },
        },
      }}
    >
      <Box className="skill-icon" sx={{ position: 'relative' }}>
        <SkillIcon id={ skill.id } size={ 30 } />
      </Box>
      <Box sx={{ position: 'relative', fontSize: '0.8125rem', fontWeight: 600, color: isActive ? 'var(--color-accent-text)' : 'inherit' }}>
        { skill.name }
      </Box>
    </ButtonBase>
  );
}

/**
 * SkillsSection 컴포넌트
 * Design·Code 두 그룹의 아이콘 버튼과, 선택한 기술의 Can Do 카드로 구성됩니다.
 * 상단 바의 Skill Tree를 누르면 이 섹션(id="skills")으로 스크롤됩니다.
 *
 * Example usage:
 * <SkillsSection />
 */
function SkillsSection() {
  const [activeId, setActiveId] = useState(ALL_SKILLS[0].id);
  const activeSkill = ALL_SKILLS.find((skill) => skill.id === activeId);

  return (
    <PageSection
      id="skills"
      index="02"
      label="SKILL TREE"
      title={ '디자인과 코드,\n두 개의 언어' }
      description="숙련도 막대 대신, 각 기술로 어려움 없이 해낼 수 있는 일을 적었어요. 아이콘을 눌러 보세요."
    >
      <Reveal>
        {/* 모바일: 그룹 세로 배치 / 데스크톱: Design·Code 그룹 나란히 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 5 } }}>
          {SKILL_GROUPS.map((group) => (
            <Box key={ group.id }>
              <LabelDot sx={{ mb: 1.5 }}>{ group.label }</LabelDot>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: { xs: 1.25, md: 1.5 } }}>
                {group.skills.map((skill) => (
                  <SkillTile
                    key={ skill.id }
                    skill={ skill }
                    isActive={ skill.id === activeId }
                    onSelect={ () => setActiveId(skill.id) }
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* 선택한 기술의 Can Do 카드 */}
        <Box
          id="skill-detail"
          aria-live="polite"
          sx={{
            mt: { xs: 3, md: 4 },
            p: { xs: 2.5, md: 4 },
            borderRadius: 4,
            bgcolor: 'var(--color-bg-raised)',
            border: '1px solid var(--color-border-divider)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '240px 1fr' },
            gap: { xs: 2, md: 4 },
            alignItems: 'center',
            '@keyframes skillSwap': {
              from: { opacity: 0, transform: 'translateY(10px)', filter: 'blur(4px)' },
              to: { opacity: 1, transform: 'none', filter: 'none' },
            },
          }}
        >
          {/* 기술이 바뀔 때마다 key가 바뀌어 내용이 새로 떠오릅니다 */}
          <Box key={ `title-${activeSkill.id}` } sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'var(--color-text-primary)', animation: 'skillSwap 0.5s var(--ease)' }}>
            <SkillIcon id={ activeSkill.id } size={ 32 } />
            <Box>
              <Box component="h3" sx={{ m: 0, fontSize: '1.25rem', fontWeight: 800 }}>{ activeSkill.name }</Box>
              <Box sx={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--color-accent-text)' }}>can do</Box>
            </Box>
          </Box>
          <Box key={ `list-${activeSkill.id}` } component="ul" sx={{ m: 0, pl: 2.25, color: 'var(--color-text-secondary)', lineHeight: 1.9 }}>
            {activeSkill.canDo.map((item, index) => (
              <Box
                component="li"
                key={ item }
                sx={{
                  animation: 'skillSwap 0.5s var(--ease) both',
                  animationDelay: `${index * 60}ms`,
                  '&::marker': { color: 'var(--color-accent)' },
                }}
              >
                { item }
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 2, fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
          * 기준: 이 기술로 실제 프로젝트를 처음부터 끝까지 어려움 없이 완성할 수 있는 수준
        </Box>
      </Reveal>
    </PageSection>
  );
}

export default SkillsSection;
