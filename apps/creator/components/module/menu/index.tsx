'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import styles from './menu.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/', <MailOutlined />),
  getItem('Admins', '/admin', <MailOutlined />, [
    getItem(<Link href="/admin">Add</Link>, '1'),
    getItem('Remove', '2'),
    getItem('List', '3'),
  ]),
  getItem('Products', '/products', <AppstoreOutlined />, [
    getItem('Add', '5'),
    getItem('Remove', '6'),
  ]),
  getItem(<Link href="/advert"> Advert</Link>, '/advert', <SettingOutlined />),
  getItem('Orders', '/order', <SettingOutlined />, [
    getItem('Option 12', '12'),
  ]),
  getItem('Shops', '/shops', <SettingOutlined />, [
    getItem('Option 9', '16'),
    getItem('Option 10', '17'),
    getItem('Option 11', '18'),
    getItem('Option 12', '19'),
  ]),
];

const rootSubmenuKeys = [
  '/',
  '/admin',
  '/products',
  '/advert',
  '/order',
  '/shops',
];

export default function MenuBar(): JSX.Element {
  const currentPath = usePathname();

  const [openKeys, setOpenKeys] = useState([currentPath]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={items}
      className={styles.menu}
      selectedKeys={[currentPath]}
    />
  );
}
