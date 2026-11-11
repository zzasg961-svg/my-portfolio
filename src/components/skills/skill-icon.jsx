import { Box } from '@mui/material';
import { siCss, siFigma, siHtml5, siJavascript } from 'simple-icons';

/** simple-icons(CC0)에서 가져온 브랜드 아이콘 경로 */
const BRAND_PATHS = {
  figma: siFigma.path,
  html: siHtml5.path,
  css: siCss.path,
  javascript: siJavascript.path,
};

/**
 * simple-icons에 없는 Adobe 아이콘은 같은 크기·선 굵기의 둥근 사각형 + 약자로 그립니다.
 */
const LETTER_ICONS = {
  photoshop: 'Ps',
  illustrator: 'Ai',
};

/**
 * SkillIcon 컴포넌트
 * 스킬 id에 맞는 아이콘을 모노톤(currentColor)으로 그립니다.
 *
 * Props:
 * @param {string} id - 스킬 id ('figma' | 'photoshop' | 'illustrator' | 'html' | 'css' | 'javascript') [Required]
 * @param {number} size - 아이콘 크기(px) [Optional, 기본값: 28]
 *
 * Example usage:
 * <SkillIcon id="figma" size={28} />
 */
function SkillIcon({ id, size = 28 }) {
  const letters = LETTER_ICONS[id];

  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      aria-hidden
      sx={{ width: size, height: size, display: 'block', fill: 'currentColor' }}
    >
      {letters ? (
        <>
          <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <text
            x="12"
            y="16.2"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="'Space Grotesk', 'Pretendard Variable', sans-serif"
          >
            { letters }
          </text>
        </>
      ) : (
        <path d={ BRAND_PATHS[id] } />
      )}
    </Box>
  );
}

export default SkillIcon;
