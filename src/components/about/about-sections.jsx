import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Chip,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AboutSectionContent from './about-section-content';

/** 섹션 id별 아이콘 */
const SECTION_ICONS = {
  'dev-story': AutoStoriesOutlinedIcon,
  philosophy: LightbulbOutlinedIcon,
  personal: FavoriteBorderIcon,
};

/** Home 탭에도 표시되는 섹션임을 알려 주는 작은 뱃지 */
function HomeBadge() {
  return (
    <Chip
      label="Home 표시"
      size="small"
      sx={{
        height: 22,
        fontSize: '0.6875rem',
        fontWeight: 700,
        color: 'var(--color-primary-dark)',
        bgcolor: 'var(--color-primary-subtle)',
      }}
    />
  );
}

/** 섹션 제목 + 아이콘 + (Home 표시 뱃지) */
function SectionTitle({ section }) {
  const Icon = SECTION_ICONS[section.id];

  return (
    <Stack direction="row" spacing={ 1 } sx={{ alignItems: 'center' }}>
      {Icon && <Icon sx={{ fontSize: 22, color: 'var(--color-primary)' }} aria-hidden />}
      <Box component="h2" sx={{ m: 0, fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
        { section.title }
      </Box>
      {section.showInHome && <HomeBadge />}
    </Stack>
  );
}

/** PC·태블릿: 탭 형태 */
function SectionTabs({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const activeSection = sections.find((section) => section.id === activeId);

  return (
    <>
      <Tabs
        value={ activeId }
        onChange={ (_, nextId) => setActiveId(nextId) }
        variant="fullWidth"
        aria-label="About Me 콘텐츠"
        sx={{
          borderBottom: '1px solid var(--color-border-divider)',
          '& .MuiTab-root': { fontWeight: 700, color: 'var(--color-text-muted)', minHeight: 56 },
          '& .MuiTab-root.Mui-selected': { color: 'var(--color-primary)' },
          '& .MuiTabs-indicator': { bgcolor: 'var(--color-primary)', height: 3 },
        }}
      >
        {sections.map((section) => (
          <Tab
            key={ section.id }
            value={ section.id }
            label={ section.title }
            id={ `about-tab-${section.id}` }
            aria-controls={ `about-panel-${section.id}` }
          />
        ))}
      </Tabs>

      {activeSection && (
        <Box
          role="tabpanel"
          id={ `about-panel-${activeSection.id}` }
          aria-labelledby={ `about-tab-${activeSection.id}` }
          sx={{ p: { sm: 4, md: 5 } }}
        >
          <Box sx={{ mb: 2.5 }}>
            <SectionTitle section={ activeSection } />
          </Box>
          <AboutSectionContent content={ activeSection.content } />
        </Box>
      )}
    </>
  );
}

/** 모바일: 아코디언 형태 (첫 섹션은 펼쳐진 상태로 시작) */
function SectionAccordions({ sections }) {
  const [expandedId, setExpandedId] = useState(sections[0]?.id);

  return (
    <Box>
      {sections.map((section) => (
        <Accordion
          key={ section.id }
          disableGutters
          elevation={ 0 }
          expanded={ expandedId === section.id }
          onChange={ (_, isExpanded) => setExpandedId(isExpanded ? section.id : null) }
          sx={{
            bgcolor: 'transparent',
            '&:before': { display: 'none' },
            '&:not(:last-of-type)': { borderBottom: '1px solid var(--color-border-divider)' },
          }}
        >
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon sx={{ color: 'var(--color-text-muted)' }} /> }
            aria-controls={ `about-accordion-${section.id}` }
            sx={{ px: 2.5, minHeight: 64 }}
          >
            <SectionTitle section={ section } />
          </AccordionSummary>
          <AccordionDetails id={ `about-accordion-${section.id}` } sx={{ px: 2.5, pt: 0, pb: 3 }}>
            <AboutSectionContent content={ section.content } />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

/**
 * AboutSections 컴포넌트
 * About Me 콘텐츠 섹션들을 화면 크기에 맞게 보여줍니다.
 * - 600px 이상: 탭
 * - 600px 미만: 아코디언 (긴 탭 제목이 좁은 화면에서 잘리지 않도록)
 *
 * Props:
 * @param {object[]} sections - { id, title, content, showInHome } 배열 [Required]
 *
 * Example usage:
 * <AboutSections sections={sections} />
 */
function AboutSections({ sections }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      component="section"
      elevation={ 0 }
      sx={{ bgcolor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-divider)' }}
    >
      {isMobile ? <SectionAccordions sections={ sections } /> : <SectionTabs sections={ sections } />}
    </Card>
  );
}

export default AboutSections;
