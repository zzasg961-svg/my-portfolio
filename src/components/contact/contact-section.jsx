import { Alert, Box, Button, Stack } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useGuestbook } from '../../hooks/use-guestbook';
import PageSection from '../common/page-section';
import Reveal from '../common/reveal';
import RollText from '../common/roll-text';
import { CONTACT_ITEMS, SOCIAL_LINKS } from './contact-data';
import ContactInfoList from './contact-info-list';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';
import SectionHeading from './section-heading';
import SocialLinks from './social-links';

const EMAIL_ITEM = CONTACT_ITEMS.find((item) => item.href?.startsWith('mailto:'));

/**
 * ContactSection 컴포넌트
 * 홈 화면 마지막 Contact 섹션입니다.
 * 왼쪽: 연락 CTA·연락처·SNS / 오른쪽: 방명록 (모바일은 세로 배치)
 * 상단 바의 Contact 버튼을 누르면 이 섹션(id="contact")으로 스크롤됩니다.
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const { entries, isLoading, error, isConfigured, addEntry, deleteEntry } = useGuestbook();

  return (
    <PageSection
      id="contact"
      index="04"
      label="CONTACT"
      title={ '디자인과 코드 사이,\n그 거리를 줄이는 사람이\n필요하시다면.' }
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
          gap: { xs: 6, md: 10 },
          alignItems: 'start',
        }}
      >
        <Reveal>
          <Stack spacing={ 4 }>
            <Box sx={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              새로운 프로젝트, 협업 제안, 가벼운 인사 모두 환영해요.
            </Box>
            {EMAIL_ITEM && (
              <Button
                href={ EMAIL_ITEM.href }
                variant="contained"
                disableElevation
                size="large"
                startIcon={ <EmailOutlinedIcon /> }
                sx={{ alignSelf: 'flex-start', minHeight: 48, px: 3 }}
              >
                <RollText>이메일 보내기</RollText>
              </Button>
            )}
            <ContactInfoList items={ CONTACT_ITEMS } />
            <SocialLinks links={ SOCIAL_LINKS } />
          </Stack>
        </Reveal>

        <Reveal delay={ 120 }>
          <Box
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 4,
              bgcolor: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border-divider)',
            }}
          >
            <Stack spacing={ 3 }>
              <SectionHeading label="GUESTBOOK" title="방명록" as="h3" />

              {!isConfigured && (
                <Alert severity="info" sx={{ borderRadius: 3 }}>
                  방명록 서버를 준비하고 있어요. 곧 이용하실 수 있어요.
                </Alert>
              )}

              <GuestbookForm onSubmit={ addEntry } isDisabled={ !isConfigured } />

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
                      남겨진 메시지{ ' ' }
                      <Box component="strong" sx={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>
                        { entries.length }
                      </Box>
                      개
                    </Box>
                  )}
                  <GuestbookList entries={ entries } isLoading={ isLoading } error={ error } onDelete={ deleteEntry } />
                </Box>
              )}
            </Stack>
          </Box>
        </Reveal>
      </Box>
    </PageSection>
  );
}

export default ContactSection;
