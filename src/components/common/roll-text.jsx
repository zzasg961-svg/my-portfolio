import { Box } from '@mui/material';

/**
 * RollText 컴포넌트
 * 부모에 마우스를 올리면 글자가 한 글자씩 위로 굴러가며 같은 글자로 바뀝니다. (레퍼런스의 Roll 효과)
 * 부모 요소에 className="roll-trigger"를 붙이거나, 부모가 버튼/링크면 자동으로 동작합니다.
 * 스크린 리더에는 글자를 한 번만 읽어 줍니다.
 *
 * Props:
 * @param {string} children - 표시할 텍스트 [Required]
 *
 * Example usage:
 * <Button><RollText>Contact</RollText></Button>
 */
function RollText({ children }) {
  const characters = Array.from(children);

  const renderLine = (isClone) =>
    characters.map((character, index) => (
      <Box
        component="span"
        // 같은 글자가 반복될 수 있어 위치를 key로 사용합니다 (순서가 바뀌지 않는 정적 텍스트)
        key={ `${isClone ? 'b' : 'a'}-${index}` }
        className="roll-char"
        sx={{
          display: 'inline-block',
          whiteSpace: 'pre',
          transition: 'transform 0.45s var(--ease)',
          transitionDelay: `${index * 18}ms`,
        }}
      >
        { character }
      </Box>
    ));

  return (
    <Box
      component="span"
      sx={{
        position: 'relative',
        display: 'inline-flex',
        overflow: 'hidden',
        verticalAlign: 'top',
        lineHeight: 1.2,
        'button:hover &, a:hover &, .roll-trigger:hover &, button:focus-visible &, a:focus-visible &': {
          '& .roll-char': { transform: 'translateY(-100%)' },
        },
      }}
    >
      <Box component="span" sx={{ display: 'inline-flex' }}>{ renderLine(false) }</Box>
      <Box component="span" aria-hidden sx={{ position: 'absolute', top: '100%', left: 0, display: 'inline-flex' }}>
        { renderLine(true) }
      </Box>
    </Box>
  );
}

export default RollText;
