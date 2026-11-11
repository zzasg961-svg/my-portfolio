/**
 * 첫 방문 인트로 화면 설정
 * 같은 탭(세션)에서는 한 번만 보여주고, 움직임 줄이기 설정 사용자에게는 보여주지 않습니다.
 * 페이지를 처음 불러올 때 한 번만 계산해서 인트로와 Hero가 같은 값을 공유합니다.
 */
const STORAGE_KEY = 'intro-seen';

/** 인트로 전체 길이(ms): 숫자 카운트 + 막이 올라가는 시간 */
export const INTRO_DURATION_MS = 1700;

function computeShouldShowIntro() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return false;
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* 저장소를 못 쓰는 환경에서는 매번 보여줍니다 */
  }
  return true;
}

export const SHOULD_SHOW_INTRO = computeShouldShowIntro();
