/**
 * About Me 데이터
 * - basicInfo: 홈 화면 About Me 섹션의 기본 정보입니다.
 * - sections: showInHome이 true인 섹션만 홈 화면에 표시됩니다.
 *
 * 프로필 사진을 넣으려면 public 폴더에 이미지를 넣고 photo 값을 바꿔 주세요.
 * 예) public/profile.jpg → photo: `${import.meta.env.BASE_URL}profile.jpg`
 */
export const ABOUT_ME_DATA = {
  basicInfo: {
    name: '임유섭',
    role: '개발을 이해하는 웹디자이너',
    education: '한국해양대학교 기계공학과',
    major: '기계시스템전공',
    experience: '신입',
    photo: `${import.meta.env.BASE_URL}profile.jpg`,
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content:
        '디자인을 공부하며 화면 속 균형과 여백, 색의 조화를 배웠습니다. 그런데 제가 만든 디자인은 늘 이미지 안에 멈춰 있었어요.\n\n' +
        '내가 그린 화면을 실제로 움직이게 만들고 싶다는 마음으로 개발을 시작했고, 지금은 디자인과 코드를 함께 다루며 아이디어를 직접 구현하고 있습니다.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content:
        '"한 번 잘 만들고, 여러 번 쓴다." 반복되는 디자인은 컴포넌트로, 반복되는 로직은 함수로 정리해 효율적이고 재사용 가능한 코드를 작성합니다.\n\n' +
        '수정은 한 곳에서, 효과는 모든 곳에서. 잘 정리된 코드는 저뿐만 아니라 함께 일하는 동료의 시간까지 아껴 준다고 믿습니다.',
      showInHome: true,
    },
  ],
};
