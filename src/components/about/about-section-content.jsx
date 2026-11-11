import { Stack } from '@mui/material';
import SoftReveal from '../common/soft-reveal';

/** 문단끼리 이어서 나타나는 간격(ms) */
const PARAGRAPH_STAGGER_MS = 220;

/**
 * AboutSectionContent 컴포넌트
 * 섹션 본문을 문단(\n\n 기준)으로 나누고, 문단마다 차례로 초점이 맞춰지듯 나타나게 합니다.
 *
 * Props:
 * @param {string} content - 본문 텍스트 [Required]
 * @param {number} delay - 첫 문단이 나타나기 전 대기 시간(ms) [Optional, 기본값: 0]
 *
 * Example usage:
 * <AboutSectionContent content={section.content} delay={300} />
 */
function AboutSectionContent({ content, delay = 0 }) {
  const paragraphs = content.split('\n\n');

  return (
    <Stack spacing={ 2 }>
      {paragraphs.map((paragraph, index) => (
        <SoftReveal
          key={ paragraph }
          component="p"
          delay={ delay + index * PARAGRAPH_STAGGER_MS }
          sx={{
            m: 0,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.85,
            fontSize: { xs: '1rem', md: '1.0625rem' },
            wordBreak: 'keep-all',
          }}
        >
          { paragraph }
        </SoftReveal>
      ))}
    </Stack>
  );
}

export default AboutSectionContent;
