import { Box } from '@mui/material';

/** 레이어 한 장의 크기(px) — 화면 크기에 맞춰 바깥에서 scale로 줄이고 키웁니다 */
const LAYER_WIDTH = 440;
const LAYER_HEIGHT = 300;
/** 레이어 사이 간격(px)과 스크롤할 때 추가로 벌어지는 간격 */
const LAYER_GAP = 110;
const SCROLL_SPREAD = 70;

/**
 * 디자인 시안의 구성 요소 위치 (디자인 레이어와 레이아웃 레이어가 같은 좌표를 써서 위아래로 딱 맞물립니다)
 * shape: 'bar' 막대 | 'circle' 원 | 'pill' 버튼
 */
const BLOCKS = [
  { id: 'avatar', top: 62, left: 28, width: 56, height: 56, shape: 'circle', tone: 'accent' },
  { id: 'title-1', top: 70, left: 104, width: 220, height: 16, shape: 'bar', tone: 'strong' },
  { id: 'title-2', top: 96, left: 104, width: 150, height: 16, shape: 'bar', tone: 'accent' },
  { id: 'text-1', top: 150, left: 28, width: 384, height: 8, shape: 'bar', tone: 'muted' },
  { id: 'text-2', top: 168, left: 28, width: 340, height: 8, shape: 'bar', tone: 'muted' },
  { id: 'text-3', top: 186, left: 28, width: 250, height: 8, shape: 'bar', tone: 'muted' },
  { id: 'button', top: 226, left: 28, width: 132, height: 40, shape: 'pill', tone: 'accent' },
];

const TONE_COLORS = {
  strong: 'var(--hero-layer-bar)',
  muted: 'var(--hero-layer-bar-muted)',
  accent: 'var(--hero-accent)',
};

/** 코드 레이어에 보이는 코드 (코드 패널은 두 테마 모두 어두운 바탕이라 색을 고정합니다) */
const CODE_COLORS = { tag: '#FA4343', attr: '#969696', text: '#F6F6F6', line: '#525252' };
const CODE_LINES = [
  [['<section ', 'tag'], ['class="hero"', 'attr'], ['>', 'tag']],
  [['  <img ', 'tag'], ['class="avatar"', 'attr'], [' />', 'tag']],
  [['  <h1>', 'tag'], ['디자인부터 개발까지,', 'text'], ['</h1>', 'tag']],
  [['  <em>', 'tag'], ['직접 완성합니다.', 'text'], ['</em>', 'tag']],
  [['  <p>', 'tag'], ['…', 'text'], ['</p>', 'tag']],
  [['  <button>', 'tag'], ['View work', 'text'], ['</button>', 'tag']],
  [['</section>', 'tag']],
];

/**
 * 레이어 바깥의 작은 이름표
 * 기울어진 화면에서 다른 레이어에 가려지지 않는 모서리가 레이어마다 달라서 위치를 따로 받습니다.
 */
const LABEL_POSITIONS = {
  topRight: { top: -30, right: 4 },
  bottomRight: { bottom: -30, right: 4 },
  bottomLeft: { bottom: -30, left: 0 },
};

function LayerLabel({ index, position, children }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        ...LABEL_POSITIONS[position],
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontFamily: 'var(--font-code)',
        fontSize: 13,
        letterSpacing: '0.06em',
        color: 'var(--hero-muted)',
        whiteSpace: 'nowrap',
      }}
    >
      <Box component="span" sx={{ color: 'var(--hero-accent)' }}>{ index }</Box>
      { children }
    </Box>
  );
}

/** 맨 아래: 실제 코드 */
function CodeLayer() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        p: '26px 24px',
        borderRadius: '16px',
        bgcolor: '#0A0A0A',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: 'var(--hero-layer-shadow)',
        fontFamily: 'var(--font-code)',
        fontSize: 14,
        lineHeight: '30px',
        whiteSpace: 'pre',
      }}
    >
      {CODE_LINES.map((tokens, lineIndex) => (
        <Box key={ lineIndex }>
          <Box component="span" sx={{ display: 'inline-block', width: 26, color: CODE_COLORS.line }}>{ lineIndex + 1 }</Box>
          {tokens.map(([text, kind]) => (
            <Box component="span" key={ text } sx={{ color: CODE_COLORS[kind] }}>{ text }</Box>
          ))}
        </Box>
      ))}
      <LayerLabel index="03" position="bottomLeft">CODE</LayerLabel>
    </Box>
  );
}

/** 가운데: 그리드와 구성 요소의 외곽선 (레이아웃 설계) */
function LayoutLayer() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        border: '2px dashed var(--hero-grid-line)',
        bgcolor: 'var(--hero-grid-fill)',
        // 8칸 세로 그리드
        backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 54px, var(--hero-grid-line) 54px 55px)',
        backgroundSize: '100% 100%',
        backgroundBlendMode: 'normal',
        opacity: 0.9,
      }}
    >
      {BLOCKS.map((block) => (
        <Box
          key={ block.id }
          sx={{
            position: 'absolute',
            top: block.top,
            left: block.left,
            width: block.width,
            height: block.height,
            border: '1.5px solid var(--hero-grid-line)',
            borderRadius: block.shape === 'bar' ? '3px' : 999,
          }}
        />
      ))}
      <LayerLabel index="02" position="bottomRight">LAYOUT</LayerLabel>
    </Box>
  );
}

/** 맨 위: 완성된 디자인 시안 + 선택 상자와 마우스 커서 */
function DesignLayer() {
  const button = BLOCKS.find((block) => block.id === 'button');

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        bgcolor: 'var(--hero-layer-bg)',
        border: '1px solid var(--hero-layer-border)',
        // 흰 배경에서도 시안이 또렷하게 떠 보이도록 테마별 그림자를 씁니다
        boxShadow: 'var(--hero-design-shadow)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 브라우저 상단 바 */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 36, borderBottom: '1px solid var(--hero-layer-border)', display: 'flex', alignItems: 'center', gap: '6px', px: '14px' }}>
        {[0, 1, 2].map((dot) => (
          <Box key={ dot } sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: dot === 0 ? 'var(--hero-accent)' : 'var(--hero-layer-bar-muted)' }} />
        ))}
      </Box>

      {BLOCKS.map((block) => (
        <Box
          key={ block.id }
          sx={{
            position: 'absolute',
            top: block.top,
            left: block.left,
            width: block.width,
            height: block.height,
            borderRadius: block.shape === 'bar' ? '4px' : 999,
            bgcolor: TONE_COLORS[block.tone],
          }}
        >
          {block.shape === 'pill' && (
            <Box sx={{ height: '100%', display: 'grid', placeItems: 'center', color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>
              View work →
            </Box>
          )}
        </Box>
      ))}

      {/* 디자인 툴의 선택 상자: 버튼을 고르고 있는 순간 */}
      <Box
        sx={{
          position: 'absolute',
          top: button.top - 6,
          left: button.left - 6,
          width: button.width + 12,
          height: button.height + 12,
          border: '1.5px solid var(--hero-accent)',
          transform: 'translateZ(2px)',
        }}
      >
        {[{ top: -4, left: -4 }, { top: -4, right: -4 }, { bottom: -4, left: -4 }, { bottom: -4, right: -4 }].map((position, index) => (
          <Box key={ index } sx={{ position: 'absolute', width: 7, height: 7, bgcolor: 'var(--hero-layer-bg)', border: '1.5px solid var(--hero-accent)', ...position }} />
        ))}
        <Box sx={{ position: 'absolute', top: '100%', left: '50%', mt: '8px', translate: '-50% 0', px: '6px', py: '2px', borderRadius: '4px', bgcolor: 'var(--hero-accent)', color: '#FFFFFF', fontFamily: 'var(--font-code)', fontSize: 11, whiteSpace: 'nowrap' }}>
          { `${button.width} × ${button.height}` }
        </Box>
      </Box>

      {/* 시안 위에 떠 있는 마우스 커서 */}
      <Box
        component="svg"
        viewBox="0 0 24 24"
        sx={{
          position: 'absolute',
          top: button.top + 22,
          left: button.left + button.width - 10,
          width: 30,
          height: 30,
          transform: 'translateZ(40px)',
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25))',
        }}
      >
        <path d="M4 2.5 20 11l-7 1.8L9.6 20 4 2.5Z" fill="var(--hero-layer-bar)" stroke="var(--hero-layer-bg)" strokeWidth="1.5" strokeLinejoin="round" />
      </Box>

      <LayerLabel index="01" position="topRight">DESIGN</LayerLabel>
    </Box>
  );
}

const LAYERS = [
  { id: 'code', Component: CodeLayer },
  { id: 'layout', Component: LayoutLayer },
  { id: 'design', Component: DesignLayer },
];

/**
 * HeroObject 컴포넌트
 * Hero 가운데에 떠 있는 3D 오브제입니다. 디자인 시안 → 레이아웃 → 코드, 세 장의 레이어가 공중에 겹쳐 떠 있습니다.
 * - 등장: 한 장으로 겹쳐 있던 레이어가 아래에서부터 차례로 벌어집니다.
 * - 평소: 천천히 위아래로 떠다니고, 마우스 위치(--mx, --my)에 따라 살짝 기울어집니다.
 * - 스크롤: 내려갈수록(--progress) 레이어 사이가 더 벌어집니다.
 * 움직임 줄이기 설정 사용자에게는 완성된 상태로 멈춰 있습니다.
 * 장식용 그림이라 스크린 리더에서는 읽지 않습니다.
 *
 * Props:
 * @param {boolean} isShown - 등장 연출 시작 여부 [Required]
 *
 * Example usage:
 * <HeroObject isShown={isShown} />
 */
function HeroObject({ isShown }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        top: { xs: '52%', md: '57%', lg: '53%' },
        left: { xs: '50%', md: '67%', lg: '64%' },
        width: 640,
        height: 520,
        translate: '-50% -50%',
        scale: { xs: '0.54', sm: '0.78', md: '0.76', lg: '1' },
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* 천천히 떠다니는 층 (perspective로 원근감을 줍니다) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          perspective: '2000px',
          animation: 'heroFloat 6s ease-in-out infinite alternate',
          '@keyframes heroFloat': { from: { transform: 'translateY(-10px)' }, to: { transform: 'translateY(12px)' } },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        {/* 기울어진 무대: 마우스를 따라 각도가 조금씩 바뀝니다 */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: LAYER_WIDTH,
            height: LAYER_HEIGHT,
            ml: `${-LAYER_WIDTH / 2}px`,
            mt: `${-LAYER_HEIGHT / 2 + 70}px`,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(calc(56deg + var(--my) * -6deg)) rotateZ(calc(-36deg + var(--mx) * 6deg))',
            transition: 'transform 1.2s var(--ease)',
          }}
        >
          {LAYERS.map(({ id, Component }, index) => (
            <Box
              key={ id }
              sx={{
                position: 'absolute',
                inset: 0,
                transformStyle: 'preserve-3d',
                translate: isShown ? `0 0 calc(${index * LAYER_GAP}px + var(--progress) * ${index * SCROLL_SPREAD}px)` : '0 0 0',
                opacity: isShown ? 1 : 0,
                transition: `translate 1.4s var(--ease) ${index * 140}ms, opacity 0.7s var(--ease) ${index * 140}ms`,
                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              }}
            >
              <Component />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default HeroObject;
