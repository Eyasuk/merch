'use client';
import { Button, Divider, Typography } from 'antd';
import { useState } from 'react';

import styles from './signup.module.scss';

const { Title, Text } = Typography;

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
            <Title level={3}>Sign up to Libes</Title>
            <Button className={styles.button} size="large">
              Continue with Email{' '}
            </Button>
            <Button className={styles.button} size="large">
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
                Already have an account? <a> Sign in</a>
              </Text>
            </div>
          </>
        ) : openForm == 'withEmail' ? (
          <div></div>
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
}
