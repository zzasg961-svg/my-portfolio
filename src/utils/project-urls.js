/** thum.io 실시간 썸네일 API 기본 주소 */
const THUMBNAIL_API = 'https://image.thum.io/get/';

/**
 * 배포 URL로 thum.io 썸네일 URL을 만듭니다.
 * DB의 thumbnail_url이 비어 있을 때 대체값으로 사용합니다.
 *
 * @param {string} detailUrl - 배포된 사이트 URL
 * @returns {string} 썸네일 이미지 URL
 */
export function getThumbnailUrl(detailUrl) {
  return detailUrl ? `${THUMBNAIL_API}${detailUrl}` : '';
}

/**
 * GitHub Pages 주소(https://{user}.github.io/{repo})에서 저장소 주소를 만듭니다.
 * 형식이 다르면 빈 문자열을 반환합니다.
 *
 * @param {string} detailUrl - 배포된 사이트 URL
 * @returns {string} GitHub 저장소 URL
 */
export function getGithubRepoUrl(detailUrl) {
  const match = /^https?:\/\/([^.]+)\.github\.io\/([^/?#]+)/.exec(detailUrl || '');
  return match ? `https://github.com/${match[1]}/${match[2]}` : '';
}
