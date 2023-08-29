'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Typography } from 'antd';
import logo from 'public/logo.svg';
import {
  CartIcon,
  LanguageIcon,
  ProfileIcon,
  SearchIcon,
} from 'components/elements/icons';

import styles from './header.module.scss';

const { Text } = Typography;

export default function HeaderModule(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
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
        <Button type="text" icon={<ProfileIcon />} />
      </div>
    </div>
  );
}
