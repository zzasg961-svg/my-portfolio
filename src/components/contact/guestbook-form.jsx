import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid,
  MenuItem,
  Rating,
  Stack,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AGE_GROUPS, REFERRAL_SOURCES } from './contact-data';

const MESSAGE_MAX = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM = {
  name: '',
  message: '',
  rating: 5,
  email: '',
  phone: '',
  sns: '',
  affiliation: '',
  age_group: '',
  referral: '',
};

/** 토스 스타일의 회색 채움 입력창 (테두리 없이 포커스 시에만 검정 테두리) */
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    bgcolor: 'var(--color-bg-raised)',
    color: 'var(--color-text-primary)',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'var(--color-border-default)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-text-primary)', borderWidth: 1 },
  },
  '& .MuiInputLabel-root': { color: 'var(--color-text-muted)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-text-primary)' },
  '& .MuiFormHelperText-root': { mx: 0.5 },
};

/**
 * 빈 문자열은 null로 바꿔서 DB에 깔끔하게 저장합니다.
 *
 * @param {object} form - 폼 상태
 * @returns {object} Supabase insert용 객체
 */
function toPayload(form) {
  return Object.fromEntries(
    Object.entries(form).map(([key, value]) => [
      key,
      typeof value === 'string' ? value.trim() || null : value,
    ]),
  );
}

/**
 * GuestbookForm 컴포넌트
 * 방명록 작성 폼입니다. 이름·메시지는 필수, 나머지는 접히는 "추가 정보"에서 선택 입력합니다.
 *
 * Props:
 * @param {function} onSubmit - 입력값을 받아 저장하고 성공 여부(boolean)를 돌려주는 함수 [Required]
 * @param {boolean} isDisabled - 폼 비활성화 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookForm onSubmit={ addEntry } isDisabled={ !isConfigured } />
 */
function GuestbookForm({ onSubmit, isDisabled = false }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isExtraOpen, setIsExtraOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const emailError = form.email.trim() !== '' && !EMAIL_PATTERN.test(form.email.trim());
  const canSubmit =
    !isDisabled && !isSubmitting && form.name.trim() && form.message.trim() && !emailError;

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    const isSuccess = await onSubmit(toPayload(form));
    setIsSubmitting(false);

    if (isSuccess) {
      setForm(INITIAL_FORM);
      setIsExtraOpen(false);
      setStatus({ type: 'success', text: '소중한 방명록 고마워요!' });
    } else {
      setStatus({ type: 'error', text: '저장에 실패했어요. 잠시 후 다시 시도해 주세요.' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <TextField
          label="이름"
          value={form.name}
          onChange={handleChange('name')}
          required
          fullWidth
          disabled={isDisabled}
          slotProps={{ htmlInput: { maxLength: 30 } }}
          sx={fieldSx}
        />
        <TextField
          label="남기실 메시지"
          value={form.message}
          onChange={handleChange('message')}
          required
          fullWidth
          multiline
          minRows={3}
          disabled={isDisabled}
          helperText={`${form.message.length} / ${MESSAGE_MAX}`}
          slotProps={{
            htmlInput: { maxLength: MESSAGE_MAX },
            formHelperText: { sx: { textAlign: 'right' } },
          }}
          sx={fieldSx}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            별점
          </Box>
          <Rating
            value={form.rating}
            onChange={(_, value) => setForm((prev) => ({ ...prev, rating: value }))}
            disabled={isDisabled}
            sx={{
              '& .MuiRating-iconFilled': { color: 'var(--color-text-primary)' },
              '& .MuiRating-iconEmpty': { color: 'var(--color-border-default)' },
            }}
          />
        </Box>

        <Button
          onClick={() => setIsExtraOpen((prev) => !prev)}
          disabled={isDisabled}
          endIcon={
            <ExpandMoreIcon
              sx={{ transition: 'transform 0.2s', transform: isExtraOpen ? 'rotate(180deg)' : 'none' }}
            />
          }
          sx={{
            alignSelf: 'flex-start',
            px: 1,
            color: 'var(--color-text-muted)',
            fontWeight: 600,
            '&:hover': { bgcolor: 'var(--color-hover-layer)' },
          }}
        >
          추가 정보 입력 (선택)
        </Button>

        <Collapse in={isExtraOpen} unmountOnExit>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="이메일"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                error={emailError}
                helperText={emailError ? '이메일 형식을 확인해 주세요.' : ' '}
                fullWidth
                sx={fieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="전화번호"
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                helperText=" "
                fullWidth
                slotProps={{ htmlInput: { maxLength: 20 } }}
                sx={fieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="SNS 계정"
                placeholder="@instagram"
                value={form.sns}
                onChange={handleChange('sns')}
                fullWidth
                slotProps={{ htmlInput: { maxLength: 100 } }}
                sx={fieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="소속 / 직업"
                value={form.affiliation}
                onChange={handleChange('affiliation')}
                fullWidth
                slotProps={{ htmlInput: { maxLength: 50 } }}
                sx={fieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                label="나이대"
                value={form.age_group}
                onChange={handleChange('age_group')}
                fullWidth
                sx={fieldSx}
              >
                <MenuItem value="">선택 안 함</MenuItem>
                {AGE_GROUPS.map((age) => (
                  <MenuItem key={age} value={age}>{age}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                label="어떻게 알게 되셨나요?"
                value={form.referral}
                onChange={handleChange('referral')}
                fullWidth
                sx={fieldSx}
              >
                <MenuItem value="">선택 안 함</MenuItem>
                {REFERRAL_SOURCES.map((source) => (
                  <MenuItem key={source} value={source}>{source}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Collapse>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 16 }} />
          이름과 연락처 정보는 공개되지 않고 안전하게 보관돼요.
        </Box>

        {status && (
          <Alert severity={status.type} onClose={() => setStatus(null)} sx={{ borderRadius: 3 }}>
            {status.text}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={!canSubmit}
          sx={{
            py: 1.5,
            borderRadius: 3,
            fontSize: '1rem',
            color: 'var(--color-bg-primary)',
            bgcolor: 'var(--color-text-primary)',
            '&:hover': { bgcolor: 'var(--color-text-secondary)' },
            '&.Mui-disabled': {
              color: 'var(--color-text-muted)',
              bgcolor: 'var(--color-bg-raised)',
            },
          }}
        >
          {isSubmitting ? '남기는 중...' : '방명록 남기기'}
        </Button>
      </Stack>
    </Box>
  );
}

export default GuestbookForm;
