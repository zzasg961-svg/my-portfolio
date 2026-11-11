/**
 * 버튼 공통 스타일
 * 텍스트만 보이던 버튼을 테두리가 있는 알약(pill) 박스로 바꾸고,
 * 마우스를 올리면 아래에서 색이 차오르는(fill sweep) 효과를 줍니다.
 *
 * @param {'neutral' | 'accent'} tone - neutral: 검정/흰색으로 채움, accent: 포인트 레드로 채움
 * @returns {object} MUI sx 객체
 *
 * Example usage:
 * <Button sx={ outlinedPillSx('accent') }>전체 보기</Button>
 */
export function outlinedPillSx(tone = 'neutral') {
  const isAccent = tone === 'accent';
  const lineColor = isAccent ? 'var(--color-accent)' : 'var(--color-border-default)';
  const fillColor = isAccent ? 'var(--color-accent)' : 'var(--color-text-primary)';
  const hoverTextColor = isAccent ? '#FFFFFF' : 'var(--color-bg-secondary)';

  return {
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
    minHeight: 44,
    px: 2.5,
    borderRadius: 999,
    border: '1px solid',
    borderColor: lineColor,
    color: isAccent ? 'var(--color-accent-text)' : 'var(--color-text-primary)',
    bgcolor: isAccent ? 'var(--color-primary-subtle)' : 'var(--color-bg-secondary)',
    fontWeight: 700,
    transition: 'color 0.45s var(--ease), border-color 0.45s var(--ease)',
    // 아래에서 위로 차오르는 채움 레이어
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      borderRadius: 'inherit',
      bgcolor: fillColor,
      transform: 'translateY(101%)',
      transition: 'transform 0.5s var(--ease)',
    },
    '& .MuiButton-endIcon, & .MuiButton-startIcon': { transition: 'transform 0.45s var(--ease)' },
    '&:hover, &:focus-visible': {
      color: hoverTextColor,
      borderColor: fillColor,
      bgcolor: isAccent ? 'var(--color-primary-subtle)' : 'var(--color-bg-secondary)',
    },
    '&:hover::before, &:focus-visible::before': { transform: 'translateY(0)' },
    '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
  };
}
