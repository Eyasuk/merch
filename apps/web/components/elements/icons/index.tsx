import {
  LeftOutlined,
  GlobalOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SkinOutlined,
  QuestionOutlined,
  BarsOutlined,
  RightOutlined,
} from '@ant-design/icons';

export function BackIcon({ ...props }: any) {
  return <LeftOutlined {...props} />;
}

export function ForwardIcon({ ...props }: any) {
  return <RightOutlined {...props} />;
}

export function CartIcon({ ...props }: any) {
  return <ShoppingCartOutlined {...props} />;
}

export function SearchIcon({ ...props }: any) {
  return <SearchOutlined {...props} />;
}

export function LanguageIcon({ ...props }: any) {
  return <GlobalOutlined {...props} />;
}

export function ProfileIcon({ ...props }: any) {
  return <UserOutlined {...props} />;
}

export function CreateIcon({ ...props }: any) {
  return <SkinOutlined {...props} />;
}

export function HelpIcon({ ...props }: any) {
  return <QuestionOutlined {...props} />;
}

export function OrderIcon({ ...props }: any) {
  return <BarsOutlined {...props} />;
}
