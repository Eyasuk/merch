import {
  LeftOutlined,
  GlobalOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

export function BackIcon({ ...props }: any) {
  return <LeftOutlined {...props} />;
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
  return <UserOutlined />;
}
