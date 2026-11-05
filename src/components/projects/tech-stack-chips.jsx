import { Chip, Stack } from '@mui/material';

/**
 * TechStackChips 컴포넌트
 * 기술 스택을 작은 뱃지(Chip) 목록으로 보여줍니다.
 *
 * Props:
 * @param {string[]} items - 기술 스택 이름 배열 [Required]
 *
 * Example usage:
 * <TechStackChips items={['React', 'Supabase']} />
 */
function TechStackChips({ items }) {
  return (
    <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 0.75 }}>
      {items.map((item) => (
        <Chip
          key={ item }
          label={ item }
          size="small"
          sx={{
            height: 24,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            bgcolor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border-divider)',
          }}
        />
      ))}
    </Stack>
  );
}

export default TechStackChips;
