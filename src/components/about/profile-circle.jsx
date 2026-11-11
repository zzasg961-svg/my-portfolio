import { Box } from '@mui/material';
import { useScrollProgress } from '../../hooks/use-scroll-progress';

/** SVG 원 둘레 길이 (반지름 49, viewBox 100 기준) */
const RING_LENGTH = 2 * Math.PI * 49;

/**
 * ProfileCircle 컴포넌트
 * 원형 프로필 사진입니다. 진입 연출이 스크롤 위치에 맞춰 움직입니다. (내리면 열리고, 올리면 닫힘)
 * - 사진이 가운데 점에서부터 원형으로 열리고, 확대돼 있던 사진이 제자리로 줄어들며 흑백 → 컬러로 바뀝니다.
 * - 동시에 둘레를 따라 얇은 빨간 선이 그려집니다.
 * - 마우스를 올리면 사진이 아주 살짝 확대되고, 선이 사진에서 한 발 떨어집니다.
 *
 * Props:
 * @param {string} name - 이름 (사진이 없을 때 첫 글자 표시, 대체 텍스트) [Required]
 * @param {string} photo - 사진 경로 [Optional]
 *
 * Example usage:
 * <ProfileCircle name="임유섭" photo="/profile.jpg" />
 */
function ProfileCircle({ name, photo }) {
  const enterRef = useScrollProgress('enter');

  return (
    <Box
      ref={ enterRef }
      sx={{
        '--progress': 0,
        position: 'relative',
        width: { xs: 160, md: 180 },
        aspectRatio: '1 / 1',
        '&:hover .profile-photo': { transform: 'scale(1.04)' },
        '&:hover .profile-ring': { transform: 'scale(1.06)' },
      }}
    >
      {/* 둘레를 따라 그려지는 얇은 선 */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        aria-hidden
        className="profile-ring"
        sx={{
          position: 'absolute',
          inset: -10,
          width: 'calc(100% + 20px)',
          height: 'calc(100% + 20px)',
          // 12시 방향에서 시작해 시계 방향으로 그려지도록 회전
          rotate: '-90deg',
          transition: 'transform 0.8s var(--ease)',
          overflow: 'visible',
        }}
      >
        <circle cx="50" cy="50" r="49" fill="none" stroke="var(--color-border-divider)" strokeWidth="0.4" />
        <Box
          component="circle"
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="0.6"
          strokeLinecap="round"
          sx={{
            strokeDasharray: RING_LENGTH,
            strokeDashoffset: `calc(${RING_LENGTH} * (1 - var(--progress)))`,
          }}
        />
      </Box>

      {/* 가운데 점에서 원형으로 열리는 사진 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          bgcolor: 'var(--color-bg-raised)',
          clipPath: 'circle(calc(var(--progress) * 50%) at 50% 50%)',
          // 흰 배경 사진도 페이지와 구분되도록 안쪽 테두리
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            boxShadow: 'inset 0 0 0 1px var(--color-border-default)',
            pointerEvents: 'none',
          },
        }}
      >
        {/* 바깥 상자는 호버 확대(transform), 안쪽 사진은 스크롤 연출(scale·filter)을 맡아 서로 충돌하지 않습니다 */}
        <Box className="profile-photo" sx={{ width: '100%', height: '100%', transition: 'transform 0.8s var(--ease)' }}>
          {photo ? (
            <Box
              component="img"
              src={ photo }
              alt={ `${name} 프로필 사진` }
              sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              // 스크롤 진행도에 따라 확대 → 원래 크기, 흑백 → 컬러
              style={{
                scale: 'calc(1.35 - var(--progress) * 0.35)',
                filter: 'grayscale(calc(1 - var(--progress) * 0.8))',
              }}
            />
          ) : (
            <Box
              role="img"
              aria-label={ `${name} 프로필` }
              sx={{ height: '100%', display: 'grid', placeItems: 'center', fontSize: '4rem', fontWeight: 800, color: 'var(--color-text-primary)' }}
            >
              { name.charAt(0) }
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileCircle;
