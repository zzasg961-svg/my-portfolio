import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

/**
 * 연락처 정보
 * TODO: 실제 이메일·전화번호·지역으로 바꿔 주세요.
 */
export const CONTACT_ITEMS = [
  {
    icon: EmailOutlinedIcon,
    label: 'Email',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
  },
  {
    icon: PhoneIphoneOutlinedIcon,
    label: 'Phone',
    value: '010-0000-0000',
    href: 'tel:010-0000-0000',
  },
  {
    icon: LocationOnOutlinedIcon,
    label: 'Location',
    value: 'Seoul, Korea',
  },
];

/**
 * SNS 링크
 * TODO: Instagram·LinkedIn 주소를 실제 계정으로 바꿔 주세요.
 */
export const SOCIAL_LINKS = [
  { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com/zzasg961-svg' },
  { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

/** 방명록 선택 항목: 나이대 */
export const AGE_GROUPS = ['10대', '20대', '30대', '40대', '50대 이상'];

/** 방명록 선택 항목: 알게 된 경로 */
export const REFERRAL_SOURCES = ['검색', 'GitHub', 'SNS', '지인 소개', '기타'];
