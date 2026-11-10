import { Box, Stack } from '@mui/material';

/**
 * AboutSectionContent 컴포넌트
 * 섹션 본문을 문단(\n\n 기준)으로 나눠 읽기 좋게 보여줍니다.
 * About Me 탭과 Home 탭에서 함께 사용합니다.
 *
 * Props:
 * @param {string} content - 본문 텍스트 [Required]
 *
 * Example usage:
 * <AboutSectionContent content={section.content} />
 */
function AboutSectionContent({ content }) {
  const paragraphs = content.split('\n\n');

  return (
    <Stack spacing={ 1.5 }>
      {paragraphs.map((paragraph) => (
        <Box
          component="p"
          key={ paragraph }
          sx={{
            m: 0,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.8,
            fontSize: { xs: '0.9375rem', md: '1rem' },
            wordBreak: 'keep-all',
          }}
        >
          { paragraph }
        </Box>
      ))}
    </Stack>
  );
}

export default AboutSectionContent;
