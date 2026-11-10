import { Avatar, Box, Stack } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';

/**
 * BasicInfo 컴포넌트
 * 프로필 사진과 기본 정보(직함·학력·전공·경력)를 보여줍니다.
 *
 * Props:
 * @param {object} basicInfo - { name, role, education, major, experience, photo } [Required]
 *
 * Example usage:
 * <BasicInfo basicInfo={basicInfo} />
 */
function BasicInfo({ basicInfo }) {
  const { name, role, education, major, experience, photo } = basicInfo;

  const infoItems = [
    { icon: SchoolOutlinedIcon, label: '학력', value: education },
    { icon: MenuBookOutlinedIcon, label: '전공', value: major },
    { icon: WorkOutlinedIcon, label: '경력', value: experience },
  ];

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 2.5, sm: 4 }}
      sx={{ alignItems: 'center' }}
    >
      {/* 사진이 없으면 이름 첫 글자로 대체합니다 */}
      <Avatar
        src={ photo || undefined }
        alt={ `${name} 프로필 사진` }
        sx={{
          width: { xs: 96, md: 112 },
          height: { xs: 96, md: 112 },
          fontSize: { xs: '2.25rem', md: '2.5rem' },
          fontWeight: 800,
          color: 'var(--color-primary-dark)',
          bgcolor: 'var(--color-primary-subtle)',
          flexShrink: 0,
        }}
      >
        { name.charAt(0) }
      </Avatar>

      <Box sx={{ width: '100%', textAlign: { xs: 'center', sm: 'left' } }}>
        <Box sx={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          { role }
        </Box>

        <Box
          component="dl"
          sx={{
            mt: 2,
            mb: 0,
            display: 'grid',
            gap: 1.25,
            justifyContent: { xs: 'center', sm: 'start' },
          }}
        >
          {infoItems.map(({ icon: Icon, label, value }) => (
            <Stack key={ label } direction="row" spacing={ 1.25 } sx={{ alignItems: 'center' }}>
              <Icon sx={{ fontSize: 20, color: 'var(--color-primary)' }} aria-hidden />
              <Box
                component="dt"
                sx={{ minWidth: 36, fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-muted)' }}
              >
                { label }
              </Box>
              <Box component="dd" sx={{ m: 0, color: 'var(--color-text-primary)', fontWeight: 600 }}>
                { value }
              </Box>
            </Stack>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

export default BasicInfo;
