'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Text } from '@merch/shared';
import {
  CartIcon,
  LanguageIcon,
  ProfileIcon,
  SearchIcon,
} from 'components/elements/icons';
import ProfileMenu from 'components/modules/profile_menu';
import logo from 'public/logo.svg';

import styles from './header.module.scss';

export default function HeaderModule(): JSX.Element {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const onClose = () => {
    setOpenMenu(false);
  };
  return (
    <div className={styles.header}>
      <div className={styles.mainHeader}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo of libes ltd" width={32} height={32} />
          <Text className={styles.brandName}>Libes</Text>
        </div>
        <nav className={styles.navbar}>
          <Link
            className={`${styles.links} ${pathname == '/' && styles.active}`}
            href="/"
          >
            <Text className={styles.text}>Home</Text>
          </Link>
          <Link
            className={`${styles.links} ${
              pathname === '/gears' && styles.active
            }`}
            href="/gears"
          >
            <Text className={styles.text}>Gears</Text>
          </Link>
          <Link
            className={`${styles.links} ${
              pathname === '/clothings' && styles.active
            }`}
            href="/clothings"
          >
            <Text className={styles.text}>Clothings</Text>
          </Link>
          <Link
            className={`${styles.links} ${
              pathname === '/create' && styles.active
            }`}
            href="/create"
          >
            <Text className={styles.text}>Create</Text>
          </Link>
        </nav>
        <div className={styles.rightBar}>
          <Button type="text" icon={<SearchIcon />} />
          <Button type="text" icon={<CartIcon />} />
          <Button type="text" icon={<LanguageIcon />} />
          <ProfileMenu>
            <Button type="default" icon={<ProfileIcon />} />
          </ProfileMenu>
        </div>
      </div>
      <div className={styles.mobileHeader}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo of libes ltd" width={32} height={32} />
          <Text className={styles.brandName}>Libes</Text>
        </div>
        <Button
          size="large"
          type="text"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <MenuOutlined />
        </Button>
        <Drawer
          placement="right"
          closable={true}
          onClose={onClose}
          open={openMenu}
          closeIcon={<CloseOutlined />}
        >
          <Menu>
            <Menu.Item>dd</Menu.Item>
            <Menu.Item>dsd</Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </div>
  );
}
