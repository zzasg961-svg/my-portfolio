import { useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

/**
 * GuestbookDeleteDialog 컴포넌트
 * 작성 시 입력한 비밀번호를 확인한 뒤 방명록을 삭제합니다.
 *
 * Props:
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 닫기 시 실행 [Required]
 * @param {function} onConfirm - (password) => Promise<boolean> 삭제 성공 여부를 돌려주는 함수 [Required]
 *
 * Example usage:
 * <GuestbookDeleteDialog isOpen={isOpen} onClose={handleClose} onConfirm={(pw) => deleteEntry(id, pw)} />
 */
function GuestbookDeleteDialog({ isOpen, onClose, onConfirm }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    if (isDeleting) return;
    setPassword('');
    setError('');
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password || isDeleting) return;

    setIsDeleting(true);
    const isSuccess = await onConfirm(password);
    setIsDeleting(false);

    if (isSuccess) {
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('비밀번호가 일치하지 않아요.');
    }
  };

  return (
    <Dialog
      open={ isOpen }
      onClose={ handleClose }
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
          sx: { borderRadius: 3, bgcolor: 'var(--color-bg-primary)' },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, color: 'var(--color-text-primary)' }}>방명록 삭제</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          type="password"
          label="작성 시 입력한 비밀번호"
          value={ password }
          onChange={ (event) => {
            setPassword(event.target.value);
            setError('');
          } }
          fullWidth
          margin="dense"
          slotProps={{ htmlInput: { maxLength: 20 } }}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 1.5, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={ handleClose } color="inherit" disabled={ isDeleting }>
          취소
        </Button>
        <Button type="submit" variant="contained" color="error" disableElevation disabled={ !password || isDeleting }>
          {isDeleting ? '삭제 중...' : '삭제'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GuestbookDeleteDialog;
