import { Card, CardContent, Chip, Typography } from '@mui/material'

const ACCENT_COLORS = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
}

// 섹션 하나를 카드로 감싸서 역할(라벨·제목·설명)이 한눈에 보이도록 합니다.
function SectionCard({ id, label, title, description, color = 'primary', highlight = false }) {
  const accent = ACCENT_COLORS[color]

  return (
    <Card
      id={id}
      component="section"
      elevation={0}
      sx={{
        bgcolor: highlight ? 'var(--color-primary-subtle)' : 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
        borderTop: `4px solid ${accent}`,
        textAlign: 'center',
      }}
    >
      <CardContent sx={{ py: { xs: 4, md: highlight ? 8 : 5 }, px: { xs: 2.5, md: 5 } }}>
        <Chip
          label={label}
          size="small"
          sx={{ mb: 2, fontWeight: 700, color: '#FFFFFF', bgcolor: accent }}
        />
        <Typography
          variant={highlight ? 'h3' : 'h5'}
          component="h2"
          sx={{
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            mb: 1.5,
            fontSize: highlight ? { xs: '2rem', md: '3rem' } : undefined,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 560, mx: 'auto' }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SectionCard
