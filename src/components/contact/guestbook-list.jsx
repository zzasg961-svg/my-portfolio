import { useState } from 'react';
import { Alert, Box, IconButton, Rating, Skeleton, Stack } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { formatDate } from '../../utils/format-date';
import GuestbookDeleteDialog from './guestbook-delete-dialog';

/**
 * GuestbookList 컴포넌트
 * 방명록을 최신순으로 보여줍니다. 작성자 이름은 비공개이므로 표시하지 않습니다.
 *
 * Props:
 * @param {Array<{id: number, message: string, rating: number, created_at: string}>} entries - 방명록 목록 [Required]
 * @param {boolean} isLoading - 불러오는 중인지 여부 [Optional, 기본값: false]
 * @param {string} error - 오류 메시지 [Optional, 기본값: '']
 * @param {function} onDelete - (id, password) => Promise<boolean> 삭제 함수 (없으면 삭제 버튼 숨김) [Optional]
 *
 * Example usage:
 * <GuestbookList entries={ entries } isLoading={ isLoading } error={ error } onDelete={ deleteEntry } />
 */
function GuestbookList({ entries, isLoading = false, error = '', onDelete }) {
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  if (error) {
    return <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>;
  }

  if (isLoading) {
    return (
      <Stack spacing={1.5}>
        {[0, 1, 2].map((key) => (
          <Skeleton key={key} variant="rounded" height={88} sx={{ borderRadius: 3 }} />
        ))}
      </Stack>
    );
  }

  if (entries.length === 0) {
    return (
      <Box sx={{ py: 5, textAlign: 'center', color: 'var(--color-text-muted)' }}>
        아직 방명록이 없어요. 첫 번째 메시지를 남겨 주세요!
      </Box>
    );
  }

  return (
    <>
      <Stack component="ul" spacing={1.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {entries.map((entry) => (
          <Box
            component="li"
            key={entry.id}
            sx={{
              px: { xs: 2.5, md: 3 },
            py: { xs: 2, md: 2.5 },
              borderRadius: 3,
              bgcolor: 'var(--color-bg-raised)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1,
              }}
            >
              {entry.rating ? (
                <Rating
                  value={entry.rating}
                  readOnly
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': { color: 'var(--color-text-primary)' },
                    '& .MuiRating-iconEmpty': { color: 'var(--color-border-default)' },
                  }}
                />
              ) : (
                <span />
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  component="time"
                  dateTime={entry.created_at}
                  sx={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}
                >
                  {formatDate(entry.created_at)}
                </Box>
                {onDelete && (
                  <IconButton
                    size="small"
                    onClick={() => setDeleteTargetId(entry.id)}
                    aria-label="방명록 삭제"
                    sx={{
                      mr: -0.75,
                      color: 'var(--color-text-muted)',
                      '&:hover': { color: 'var(--color-text-primary)', bgcolor: 'var(--color-hover-layer)' },
                    }}
                  >
                    <DeleteOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                color: 'var(--color-text-primary)',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {entry.message}
            </Box>
          </Box>
        ))}
      </Stack>

      {onDelete && (
        <GuestbookDeleteDialog
          isOpen={deleteTargetId !== null}
          onClose={() => setDeleteTargetId(null)}
          onConfirm={(password) => onDelete(deleteTargetId, password)}
        />
      )}
    </>
  );
}

export default GuestbookList;
