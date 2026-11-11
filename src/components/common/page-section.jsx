import { Box, Stack } from '@mui/material';
import SectionHeading from '../contact/section-heading';
import Reveal from './reveal';

/**
 * PageSection 컴포넌트
 * 홈 화면 섹션의 공통 틀입니다. (번호 // 라벨 → 제목 → 설명 → 내용)
 * 제목은 줄마다 밀려 올라오고, 설명과 버튼은 뒤이어 떠오릅니다.
 *
 * Props:
 * @param {string} id - 상단 바에서 스크롤해 올 때 쓰는 섹션 id [Required]
 * @param {string} index - 섹션 번호 ('01') [Required]
 * @param {string} label - 영문 라벨 ('ABOUT ME') [Required]
 * @param {string} title - 섹션 제목 (\n으로 줄바꿈) [Required]
 * @param {ReactNode} description - 제목 아래 설명 [Optional]
 * @param {ReactNode} action - 제목 오른쪽 버튼 영역 [Optional]
 * @param {ReactNode} children - 섹션 내용 [Required]
 *
 * Example usage:
 * <PageSection id="skills" index="02" label="SKILL TREE" title="디자인과 코드">...</PageSection>
 */
function PageSection({ id, index, label, title, description, action, children }) {
  return (
    <Box
      component="section"
      id={ id }
      aria-labelledby={ `${id}-title` }
      sx={{
        py: { xs: 10, md: 18 },
        borderTop: '1px solid var(--color-border-divider)',
        '&:first-of-type': { borderTop: 'none' },
        /** 상단 고정 바에 가려지지 않도록 스크롤 위치 보정 */
        scrollMarginTop: { xs: 56, md: 8 },
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={ 2 }
        sx={{
          mb: { xs: 6, md: 10 },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'flex-end' },
        }}
      >
        <Box id={ `${id}-title` }>
          <SectionHeading index={ index } label={ label } title={ title } />
          {description && (
            <Reveal delay={ 300 }>
              <Box sx={{ mt: 2.5, maxWidth: 560, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                { description }
              </Box>
            </Reveal>
          )}
        </Box>
        {action && <Reveal delay={ 400 }>{ action }</Reveal>}
      </Stack>
      { children }
    </Box>
  );
}

export default PageSection;
