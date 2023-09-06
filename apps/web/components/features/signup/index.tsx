'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button, Divider } from 'antd';
import { BackIcon } from 'components/elements/icons';
import { Text, Title } from 'components/elements/text';
import {
  SignupWithEmail,
  SignupWithPhone,
} from 'components/modules/signup_form';
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
            <Title level={3}>Sign up to Libes</Title>
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
              Signup with Google{' '}
            </Button>
            <div className={styles.bottom}>
              <Text type="secondary">
                By creating an account you agree with our Terms of Service and
                Privacy Policy
              </Text>
              <Text>
                Already have an account? <a href="signin"> Sign in</a>
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
            <div className={styles.form}>
              {openForm == 'withEmail' ? (
                <SignupWithEmail />
              ) : (
                <SignupWithPhone />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
