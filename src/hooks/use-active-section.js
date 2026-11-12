import { useEffect, useState } from 'react';

/** 화면 위에서 이 비율만큼 내려온 지점을 '지금 보고 있는 위치'로 봅니다 */
const PROBE_RATIO = 0.35;

/**
 * 스크롤 위치에 따라 지금 보고 있는 섹션 id를 알려 주는 훅 (스크롤 스파이)
 * - 섹션 목록을 위에서부터 차례로 보며, 윗변이 기준선(화면 위에서 35% 지점)을 지난 마지막 섹션을 고릅니다.
 * - 페이지 맨 아래에 닿으면 마지막 섹션을 고릅니다. (마지막 섹션이 짧아도 선택되도록)
 * - 스크롤마다 한 프레임에 한 번만 계산하고, 섹션이 바뀔 때만 다시 그립니다.
 *
 * @param {string[]} sectionIds - 위에서부터 순서대로 나열한 섹션 id
 * @param {boolean} enabled - false면 계산하지 않고 빈 값('')을 돌려줍니다 (예: 홈이 아닌 페이지) [Optional, 기본값: true]
 * @returns {string} 지금 보고 있는 섹션 id (없으면 '')
 *
 * Example usage:
 * const activeId = useActiveSection(['hero', 'about', 'skills', 'projects', 'contact'], isHome);
 */
export function useActiveSection(sectionIds, enabled = true) {
  const [activeId, setActiveId] = useState('');
  const idsKey = sectionIds.join(',');

  useEffect(() => {
    if (!enabled) return undefined;
    const ids = idsKey.split(',');
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const probe = window.innerHeight * PROBE_RATIO;
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = '';
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= probe) current = id;
      });
      if (isAtBottom && document.getElementById(ids[ids.length - 1])) current = ids[ids.length - 1];
      setActiveId(current || ids[0]);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    // 페이지가 그려진 직후 한 번 계산하고, 스크롤·크기 변경 때마다 다시 계산합니다
    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [idsKey, enabled]);

  return enabled ? activeId : '';
}
