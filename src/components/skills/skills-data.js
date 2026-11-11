/**
 * 스킬 데이터
 * 숙련도 막대(%) 대신 "이 기술로 어려움 없이 할 수 있는 것(Can Do)"으로 표현합니다.
 * 아이콘은 id 기준으로 skill-icon.jsx에서 그립니다.
 */
export const SKILL_GROUPS = [
  {
    id: 'design',
    label: 'DESIGN',
    skills: [
      {
        id: 'figma',
        name: 'Figma',
        canDo: [
          '오토레이아웃·컴포넌트·Variants로 디자인 시스템 구축',
          '실제 흐름을 확인할 수 있는 인터랙티브 프로토타입 제작',
          '개발자가 바로 쓸 수 있는 간격·색상·상태 스펙 정리',
        ],
      },
      {
        id: 'photoshop',
        name: 'Photoshop',
        canDo: ['이미지 보정과 합성', '웹에 맞는 크기·용량으로 비주얼 제작', '배너·썸네일 등 그래픽 작업'],
      },
      {
        id: 'illustrator',
        name: 'Illustrator',
        canDo: ['아이콘·로고·벡터 그래픽 제작', '웹에서 바로 쓰는 SVG로 내보내기', '일관된 선 두께와 그리드의 아이콘 세트'],
      },
    ],
  },
  {
    id: 'code',
    label: 'CODE',
    skills: [
      {
        id: 'html',
        name: 'HTML',
        canDo: ['의미에 맞는 태그로 문서 구조 설계', '스크린 리더·키보드 사용자를 고려한 마크업', '검색에 잘 노출되는 메타 정보 작성'],
      },
      {
        id: 'css',
        name: 'CSS',
        canDo: ['Flex·Grid로 반응형 레이아웃 구현', 'CSS 변수로 디자인 토큰과 테마 관리', '과하지 않은 트랜지션과 애니메이션'],
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        canDo: ['DOM 조작과 스크롤·클릭 인터랙션 구현', '데이터를 불러와 화면에 그리기', 'React 컴포넌트로 재사용 가능한 UI 만들기'],
      },
    ],
  },
];
