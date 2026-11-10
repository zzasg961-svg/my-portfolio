import { useState } from 'react';
import { ABOUT_ME_DATA } from '../components/about/about-me-data';

/**
 * About Me 데이터를 useState로 관리하는 훅
 * Home 탭과 About Me 탭이 같은 데이터를 쓰도록 한 곳에서 관리합니다.
 *
 * @returns {{ basicInfo: object, sections: object[], homeSections: object[] }}
 *
 * Example usage:
 * const { basicInfo, sections, homeSections } = useAboutMe();
 */
export function useAboutMe() {
  const [aboutMe] = useState(ABOUT_ME_DATA);

  /** showInHome이 true인 섹션만 Home 탭에 보여줍니다 */
  const homeSections = aboutMe.sections.filter((section) => section.showInHome);

  return { basicInfo: aboutMe.basicInfo, sections: aboutMe.sections, homeSections };
}
