import { Box, Card, Skeleton, Stack } from '@mui/material';

/**
 * ProjectCardSkeleton 컴포넌트
 * 프로젝트 목록을 불러오는 동안 카드 자리를 표시합니다.
 *
 * Example usage:
 * <ProjectCardSkeleton />
 */
function ProjectCardSkeleton() {
  return (
    <Card
      elevation={ 0 }
      sx={{
        borderRadius: 4,
        bgcolor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-divider)',
      }}
    >
      <Skeleton variant="rectangular" sx={{ aspectRatio: '4 / 3', height: 'auto' }} />
      <Box sx={{ p: 2 }}>
        <Skeleton width="60%" height={ 28 } />
        <Skeleton width="90%" />
        <Stack direction="row" spacing={ 0.75 } sx={{ mt: 1.5 }}>
          <Skeleton variant="rounded" width={ 56 } height={ 24 } />
          <Skeleton variant="rounded" width={ 64 } height={ 24 } />
          <Skeleton variant="rounded" width={ 48 } height={ 24 } />
        </Stack>
        <Skeleton variant="rounded" height={ 40 } sx={{ mt: 2 }} />
      </Box>
    </Card>
  );
}

export default ProjectCardSkeleton;
