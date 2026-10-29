/**
 * ISO 날짜 문자열을 "2026. 10. 29. 오후 3:20" 형태로 바꿉니다.
 *
 * @param {string} isoString - Supabase의 created_at 값
 * @returns {string} 한국어 날짜·시간 문자열
 */
export function formatDate(isoString) {
  return new Date(isoString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
