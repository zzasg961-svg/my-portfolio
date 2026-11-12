/**
 * 가로 슬라이드 카드 공통 크기
 * - 모바일: 화면 너비의 84%, 4:3 가로형 (높이는 너비에 맞춰 자동)
 * - 태블릿 이상: 고정 영역의 남은 높이를 꽉 채우고, 16:9 비율로 너비가 정해짐
 */
export const SLIDE_SIZE_SX = {
  flex: '0 0 auto',
  width: { xs: '84vw', md: 'auto' },
  height: { xs: 'auto', md: '100%' },
  aspectRatio: { xs: '4 / 3', md: '16 / 9' },
  maxWidth: { md: 1120 },
};
