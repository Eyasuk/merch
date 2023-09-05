'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button, Divider } from 'antd';
import { BackIcon } from 'components/elements/icons';
import { Text, Title } from 'components/elements/text';
import {
  SignInWithEmail,
  SignInWithPhone,
} from 'components/modules/signin_form';
import logo from 'public/logo.svg';

import styles from './signup.module.scss';

export default function SignUp() {
  const [openForm, setOpenForm] = useState<
    'choose' | 'withEmail' | 'withPhone'
  >('choose');

  return (
    <div className={styles.signupBody}>
      <div className={styles.advert}>s</div>

      <div className={styles.signupMethods}>
        {openForm == 'choose' ? (
          <>
            <Image src={logo} alt="logo of libes ltd" width={50} height={50} />
            <Title level={3}>Login to Libes</Title>
            <Button
              className={styles.button}
              size="large"
              onClick={() => setOpenForm('withEmail')}
            >
              Continue with Email{' '}
            </Button>
            <Button
              className={styles.button}
              size="large"
              onClick={() => setOpenForm('withPhone')}
            >
              Continue with Phone{' '}
            </Button>
            <div className={styles.divider}>
              <Divider />
            </div>
            <Button className={styles.button} type="primary" size="large">
              Signin with Google{' '}
            </Button>
            <div className={styles.bottom}>
              <Text>
                Create new account? <a href="signup"> Sign up</a>
              </Text>
            </div>
          </>
        ) : (
          <>
            <Button
              className={styles.backButton}
              icon={<BackIcon />}
              onClick={() => {
                setOpenForm('choose');
              }}
              shape="circle"
            />
            <div>
              {' '}
              {openForm == 'withEmail' ? (
                <SignInWithEmail />
              ) : (
                <SignInWithPhone />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
