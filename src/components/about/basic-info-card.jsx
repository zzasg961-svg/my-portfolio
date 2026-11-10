import { Avatar, Box, Card, CardContent, Chip, Stack } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';

/**
 * BasicInfoCard 컴포넌트
 * About Me 탭 상단의 기본 정보(사진·이름·학력·전공·경력) 카드입니다.
 *
 * Props:
 * @param {object} basicInfo - { name, role, education, major, experience, photo } [Required]
 *
 * Example usage:
 * <BasicInfoCard basicInfo={basicInfo} />
 */
function BasicInfoCard({ basicInfo }) {
  const { name, role, education, major, experience, photo } = basicInfo;

  const infoItems = [
    { icon: SchoolOutlinedIcon, label: '학력', value: education },
    { icon: MenuBookOutlinedIcon, label: '전공', value: major },
    { icon: WorkOutlinedIcon, label: '경력', value: experience },
  ];

  return (
    <Card
      component="section"
      elevation={ 0 }
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
        borderTop: '4px solid var(--color-primary)',
      }}
    >
      <CardContent sx={{ py: { xs: 4, md: 5 }, px: { xs: 2.5, md: 5 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 4 }}
          sx={{ alignItems: 'center' }}
        >
          {/* 사진이 없으면 이름 첫 글자로 대체합니다 */}
          <Avatar
            src={ photo || undefined }
            alt={ `${name} 프로필 사진` }
            sx={{
              width: { xs: 96, md: 120 },
              height: { xs: 96, md: 120 },
              fontSize: { xs: '2.25rem', md: '2.75rem' },
              fontWeight: 800,
              color: 'var(--color-primary-dark)',
              bgcolor: 'var(--color-primary-subtle)',
              flexShrink: 0,
            }}
          >
            { name.charAt(0) }
          </Avatar>

          <Box sx={{ width: '100%', textAlign: { xs: 'center', sm: 'left' } }}>
            <Chip
              label="ABOUT ME"
              size="small"
              sx={{ mb: 1.5, fontWeight: 700, color: '#FFFFFF', bgcolor: 'var(--color-primary)' }}
            />
            <Box
              component="h1"
              sx={{
                m: 0,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
              }}
            >
              { name }
            </Box>
            <Box sx={{ mt: 0.5, color: 'var(--color-text-muted)', fontWeight: 500 }}>{ role }</Box>

            <Box
              component="dl"
              sx={{
                mt: 3,
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
      </CardContent>
    </Card>
  );
}

export default BasicInfoCard;
