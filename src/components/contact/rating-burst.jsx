import { Box } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const BURST_DURATION = 1000;

/** 중심에서 순간적으로 커지며 튀어나간 뒤, 바깥으로 흩어지며 사라지는 움직임 */
const fly = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: translate(calc(-50% + var(--burst-x) * 0.6), calc(-50% + var(--burst-y) * 0.6)) scale(1.1) rotate(60deg);
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--burst-x)), calc(-50% + var(--burst-y))) scale(0.2) rotate(180deg);
    opacity: 0;
  }
`;

/** 터지는 순간 중심에 퍼지는 원형 파동 */
const ring = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.2);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.6);
    opacity: 0;
  }
`;

/** 폭죽이 터질 때 별들이 살짝 커졌다 돌아오는 움직임 */
const starPop = keyframes`
  0% { transform: scale(1); }
  35% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

/**
 * RatingBurst 컴포넌트
 * 별점 5점을 줬을 때 다섯 번째 별 위치에서 폭죽처럼 파티클을 터뜨립니다.
 * 모션 줄이기 설정을 켠 사용자에게는 보이지 않습니다.
 *
 * Props:
 * @param {Array<object>} particles - createBurstParticles()로 만든 파티클 목록 [Required]
 *
 * Example usage:
 * <RatingBurst key={ burstId } particles={ particles } />
 */
function RatingBurst({ particles }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        top: '50%',
        right: 12,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        '@media (prefers-reduced-motion: reduce)': { display: 'none' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '2px solid var(--color-text-primary)',
          animation: `${ring} ${BURST_DURATION * 0.6}ms ease-out forwards`,
        }}
      />
      {particles.map(({ id, x, y, size, color, isStar, delay }) => (
        <Box
          key={id}
          component={isStar ? StarRoundedIcon : 'span'}
          style={{ '--burst-x': `${x}px`, '--burst-y': `${y}px` }}
          sx={{
            position: 'absolute',
            width: isStar ? size * 2 : size,
            height: isStar ? size * 2 : size,
            fontSize: isStar ? size * 2 : undefined,
            borderRadius: '50%',
            color,
            bgcolor: isStar ? 'transparent' : color,
            opacity: 0,
            animation: `${fly} ${BURST_DURATION}ms cubic-bezier(0.15, 0.8, 0.3, 1) ${delay}ms forwards`,
          }}
        />
      ))}
    </Box>
  );
}

export { BURST_DURATION, starPop };
export default RatingBurst;
