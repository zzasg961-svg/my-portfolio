import { Box, Link } from '@mui/material';

/**
 * ContactInfoList 컴포넌트
 * 아이콘 + 텍스트 형태로 연락처를 세로로 정렬해 보여줍니다.
 *
 * Props:
 * @param {Array<{icon: object, label: string, value: string, href?: string}>} items - 연락처 목록 [Required]
 *
 * Example usage:
 * <ContactInfoList items={ CONTACT_ITEMS } />
 */
function ContactInfoList({ items }) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {items.map(({ icon: Icon, label, value, href }) => (
        <Box
          component="li"
          key={label}
          sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'var(--color-bg-raised)',
              color: 'var(--color-text-primary)',
            }}
          >
            <Icon fontSize="small" />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
              {label}
            </Box>
            {href ? (
              <Link
                href={href}
                underline="hover"
                sx={{
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  wordBreak: 'break-all',
                  '&:hover': { color: 'var(--color-text-primary)' },
                }}
              >
                {value}
              </Link>
            ) : (
              <Box sx={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{value}</Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ContactInfoList;
