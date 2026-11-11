import { Box, Stack } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import { useInView } from '../../hooks/use-in-view';
import ProfileCircle from './profile-circle';

/** 정보가 차례로 나타나는 간격(ms) */
const INFO_START_DELAY_MS = 200;
const ROW_STAGGER_MS = 160;

/**
 * BasicInfo 컴포넌트
 * 프로필 사진과 기본 정보(이름·직함·학력·전공·경력)를 보여줍니다.
 * 정보 줄은 아래 선이 가운데에서 양옆으로 퍼지듯 그어지고, 글자는 초점이 맞춰지듯 선명해집니다.
 *
 * Props:
 * @param {object} basicInfo - { name, role, education, major, experience, photo } [Required]
 *
 * Example usage:
 * <BasicInfo basicInfo={basicInfo} />
 */
function BasicInfo({ basicInfo }) {
  const { name, role, education, major, experience, photo } = basicInfo;
  const [infoRef, isInfoInView] = useInView({ threshold: 0.3 });

  const infoItems = [
    { icon: SchoolOutlinedIcon, label: '학력', value: education },
    { icon: MenuBookOutlinedIcon, label: '전공', value: major },
    { icon: WorkOutlinedIcon, label: '경력', value: experience },
  ];

  /** 순서대로 초점이 맞춰지듯 선명해지는 글자 스타일 */
  const slideInSx = (order) => ({
    opacity: isInfoInView ? 1 : 0,
    filter: isInfoInView ? 'blur(0)' : 'blur(10px)',
    transition: 'opacity 1.4s var(--ease), filter 1.4s var(--ease)',
    transitionDelay: `${INFO_START_DELAY_MS + order * ROW_STAGGER_MS}ms`,
    '@media (prefers-reduced-motion: reduce)': { opacity: 1, filter: 'none' },
  });

  return (
    <Stack spacing={ 5 } sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
      <ProfileCircle name={ name } photo={ photo } />

      <Box ref={ infoRef } sx={{ width: '100%', maxWidth: 360, pt: { xs: 1, md: 2 } }}>
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, ...slideInSx(0) }}>
          <Box sx={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>{ name }</Box>
          <Box sx={{ mt: 0.5, fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-accent-text)' }}>{ role }</Box>
        </Box>

        <Box component="dl" sx={{ m: 0, mt: 3 }}>
          {infoItems.map(({ icon: Icon, label, value }, index) => (
            <Stack
              key={ label }
              direction="row"
              spacing={ 1.5 }
              sx={{
                position: 'relative',
                alignItems: 'center',
                py: 1.75,
                // 아래 선이 왼쪽에서 오른쪽으로 그어집니다
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '1px',
                  bgcolor: 'var(--color-border-default)',
                  transformOrigin: 'center',
                  transform: isInfoInView ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 1.4s var(--ease)',
                  transitionDelay: `${INFO_START_DELAY_MS + (index + 1) * ROW_STAGGER_MS}ms`,
                  '@media (prefers-reduced-motion: reduce)': { transform: 'scaleX(1)' },
                },
              }}
            >
              <Stack direction="row" spacing={ 1.5 } sx={{ alignItems: 'center', ...slideInSx(index + 1) }}>
                <Icon sx={{ fontSize: 18, color: 'var(--color-text-muted)' }} aria-hidden />
                <Box component="dt" sx={{ minWidth: 36, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  { label }
                </Box>
                <Box component="dd" sx={{ m: 0, fontSize: '0.9375rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                  { value }
                </Box>
              </Stack>
            </Stack>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

export default BasicInfo;
