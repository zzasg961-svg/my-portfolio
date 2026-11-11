import { Box, Button, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { outlinedPillSx } from './common/button-styles';

const SOURCE_URL = 'https://github.com/zzasg961-svg/my-portfolio';

/**
 * Footer 컴포넌트
 * 사이트 자체가 포트폴리오라는 기획에 맞춰, 이 사이트의 코드를 바로 볼 수 있는 링크를 둡니다.
 *
 * Example usage:
 * <Footer />
 */
function Footer() {
  return (
    <Box component="footer" sx={{ position: 'relative', zIndex: 1, bgcolor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border-divider)' }}>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 1.5,
          fontFamily: 'var(--font-code)',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
        }}
      >
        <Box>
          Designed &amp; built by 임유섭 · © 2026
        </Box>
        <Button
          href={ SOURCE_URL }
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          startIcon={ <GitHubIcon /> }
          sx={{ ...outlinedPillSx('neutral'), minHeight: 36, fontSize: '0.8125rem', fontWeight: 600 }}
        >
          이 사이트의 코드 보기
        </Button>
      </Container>
    </Box>
  );
}

export default Footer;
