/**
 * 레이아웃 공통 값
 * 상단 바(Navbar) 높이(px) — 모바일은 메뉴가 두 줄이라 더 높습니다.
 * 화면에 고정되는 섹션(Skill Tree·Projects)과 Hero 높이 계산이 이 값을 함께 씁니다.
 * 상단 바 크기를 바꾸면 이 값도 같이 바꿔 주세요.
 */
export const NAV_HEIGHT = { xs: 86, sm: 72 };

/** 상단 바 아래 남은 화면 높이 (고정 섹션의 높이) */
export const VIEWPORT_BELOW_NAV = {
  xs: `calc(100svh - ${NAV_HEIGHT.xs}px)`,
  sm: `calc(100svh - ${NAV_HEIGHT.sm}px)`,
};

/**
 * Hero 반응형 기준 (요청 기준: 모바일 ~767px / 태블릿 768~1199px / 데스크톱 1200px~)
 * - QUERY: useMediaQuery에 넣는 조건식
 * - MEDIA: sx 안에서 쓰는 '@media ...' 키
 * - landscapeCompact: 휴대폰을 가로로 눕힌 낮은 화면 (높이 560px 이하)
 */
export const HERO_QUERY = {
  mobile: '(max-width: 767.98px)',
  tablet: '(min-width: 768px) and (max-width: 1199.98px)',
  desktop: '(min-width: 1200px)',
  landscape: '(orientation: landscape)',
  landscapeCompact: '(orientation: landscape) and (max-height: 560px)',
};

export const HERO_MEDIA = Object.fromEntries(
  Object.entries(HERO_QUERY).map(([key, query]) => [key, `@media ${query}`]),
);

/** Hero 3D 오브제가 실제로 차지하는 크기(px) — 모바일·태블릿에서 남은 공간에 맞출 때 기준 */
export const HERO_OBJECT_SIZE = { width: 600, height: 500 };
