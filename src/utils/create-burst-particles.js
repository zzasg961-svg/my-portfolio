/** 무채색 컨셉에 맞춘 파티클 색상 (다크모드에서도 자동 전환) */
const PARTICLE_COLORS = [
  'var(--color-text-primary)',
  'var(--color-text-primary)',
  'var(--color-text-secondary)',
  'var(--color-text-muted)',
];

/**
 * 폭죽 파티클 데이터를 만듭니다. 원 둘레로 고르게 퍼지되, 각도·거리에 약간의 랜덤을 섞습니다.
 *
 * @param {number} count - 파티클 개수
 * @returns {Array<{id: number, x: number, y: number, size: number, color: string, isStar: boolean, delay: number}>}
 */
export function createBurstParticles(count = 28) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const distance = 48 + Math.random() * 60;

    return {
      id: index,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 5 + Math.random() * 6,
      color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
      isStar: index % 3 === 0,
      delay: Math.random() * 80,
    };
  });
}
