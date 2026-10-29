import { Alert, Box, Card, CardContent, Divider, Stack } from '@mui/material';
import { useGuestbook } from '../../hooks/use-guestbook';
import { CONTACT_ITEMS, SOCIAL_LINKS } from './contact-data';
import ContactInfoList from './contact-info-list';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';
import SectionHeading from './section-heading';
import SocialLinks from './social-links';

/**
 * ContactSection 컴포넌트
 * Home 탭 하단의 Contact 섹션입니다.
 * 연락처 → SNS → 방명록 작성 → 방명록 목록 순서로 세로 배치합니다.
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const { entries, isLoading, error, isConfigured, addEntry } = useGuestbook();

  return (
    <Card
      id="contact"
      component="section"
      elevation={0}
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ py: { xs: 5, md: 8 }, px: { xs: 2.5, md: 8 } }}>
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Box>
            <SectionHeading eyebrow="CONTACT" title="함께 이야기 나눠요" />
            <Box sx={{ mt: 1.5, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              새로운 프로젝트, 협업 제안, 가벼운 인사 모두 환영해요.
            </Box>
          </Box>

          <ContactInfoList items={CONTACT_ITEMS} />

          <SocialLinks links={SOCIAL_LINKS} />

          <Divider sx={{ borderColor: 'var(--color-border-divider)' }} />

          <SectionHeading eyebrow="GUESTBOOK" title="방명록" as="h3" />

          {!isConfigured && (
            <Alert severity="info" sx={{ borderRadius: 3 }}>
              방명록 서버를 준비하고 있어요. 곧 이용하실 수 있어요.
            </Alert>
          )}

          <GuestbookForm onSubmit={addEntry} isDisabled={!isConfigured} />

          {isConfigured && (
            <Box>
              {entries.length > 0 && (
                <Box
                  sx={{
                    mb: 1.5,
                    pb: 1.5,
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    borderBottom: '1px solid var(--color-border-divider)',
                  }}
                >
                  남겨진 메시지{' '}
                  <Box component="strong" sx={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>
                    {entries.length}
                  </Box>
                  개
                </Box>
              )}
              <GuestbookList entries={entries} isLoading={isLoading} error={error} />
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ContactSection;
