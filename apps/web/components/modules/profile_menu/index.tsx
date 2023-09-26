import { Button, Divider, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useAuth } from 'utils/contexts/auth';
import { signOutService } from 'utils/services/authService';
import {
  CreateIcon,
  HelpIcon,
  OrderIcon,
  ProfileIcon,
} from 'components/elements/icons';

import styles from './profile_menu.module.scss';

type Props = {
  children: React.ReactNode;
};

const loggedUserItems = (signOut: any): MenuProps['items'] => {
  return [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="signin">
          Profile
        </a>
      ),
      icon: <ProfileIcon />,
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href="https://www.aliyun.com">
          Orders
        </a>
      ),
      icon: <OrderIcon />,
    },
    {
      key: '3',
      label: (
        <a rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Create{' '}
        </a>
      ),
      icon: <CreateIcon />,
    },
    {
      key: '4',
      label: <Divider className={styles.divider} />,
    },
    {
      key: '5',
      label: (
        <Button type="primary" className={styles.buttons} onClick={signOut}>
          Sign out{' '}
        </Button>
      ),
    },
  ];
};

const unLoggedUserItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer" href="https://www.antgroup.com">
        Create{' '}
      </a>
    ),
    icon: <CreateIcon />,
  },
  {
    key: '2',
    label: <Divider className={styles.divider} />,
  },
  {
    key: '3',
    label: (
      <a rel="noopener noreferrer" href="https://www.antgroup.com">
        Help Center{' '}
      </a>
    ),
    icon: <HelpIcon />,
  },

  {
    key: '4',
    label: <Divider className={styles.divider} />,
  },
  {
    key: '5',
    label: (
      <a rel="noopener noreferrer" href="/signup">
        <Button className={styles.buttons}>Sign up</Button>
      </a>
    ),
  },
  {
    key: '6',
    label: (
      <Button type="primary" className={styles.buttons}>
        {' '}
        <a rel="noopener noreferrer" href="/signin">
          Sign in{' '}
        </a>
      </Button>
    ),
  },
];

export default function ProfileMenu({ children }: Props): JSX.Element {
  const { userLoggedIn, setUserLoggedIn } = useAuth();

  async function signOut() {
    try {
      const res = await signOutService();
      if (res.status == 200) {
        setUserLoggedIn(false);
      }
    } catch (err) {
      console.log('err');
      console.log(err);
    }
  }

  return (
    <Dropdown
      menu={
        userLoggedIn
          ? { items: loggedUserItems(signOut) }
          : { items: unLoggedUserItems }
      }
      overlayClassName={styles.dropdown}
    >
      {children}
    </Dropdown>
  );
}
