import { IconButton, Stack, Tooltip } from '@mui/material';

/**
 * SocialLinks 컴포넌트
 * 작은 SNS 아이콘들을 한 줄로 정렬합니다.
 *
 * Props:
 * @param {Array<{icon: object, label: string, href: string}>} links - SNS 링크 목록 [Required]
 *
 * Example usage:
 * <SocialLinks links={ SOCIAL_LINKS } />
 */
function SocialLinks({ links }) {
  return (
    <Stack direction="row" spacing={1}>
      {links.map(({ icon: Icon, label, href }) => (
        <Tooltip key={label} title={label}>
          <IconButton
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            size="small"
            sx={{
              width: 40,
              height: 40,
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border-divider)',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: 'var(--color-bg-primary)',
                bgcolor: 'var(--color-text-primary)',
                borderColor: 'var(--color-text-primary)',
              },
            }}
          >
            <Icon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}

export default SocialLinks;
