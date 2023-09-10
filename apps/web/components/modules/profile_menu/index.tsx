import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useAuth } from 'utils/contexts/auth';

type Props = {
  children: React.ReactNode;
};

const loggedUserItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer" href="signin">
        {' '}
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a rel="noopener noreferrer" href="https://www.luohanacademy.com">
        logout
      </a>
    ),
  },
];

const unLoggedUserItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer" href="https://www.antgroup.com">
        login{' '}
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a rel="noopener noreferrer" href="/signup">
        signup
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a rel="noopener noreferrer" href="/signin">
        signin
      </a>
    ),
  },
];

export default function ProfileMenu({ children }: Props): JSX.Element {
  const { userLoggedIn } = useAuth();
  return (
    <Dropdown
      menu={
        userLoggedIn ? { items: loggedUserItems } : { items: unLoggedUserItems }
      }
    >
      {children}
    </Dropdown>
  );
}
