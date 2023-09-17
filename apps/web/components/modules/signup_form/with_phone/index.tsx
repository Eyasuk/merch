import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CountryCode,
  parsePhoneNumber,
  getCountries,
  isValidNumberForRegion,
} from 'libphonenumber-js';
import { Button, Form, Input, Select } from 'antd';
import { Title, Paragraph } from 'components/elements/text';
import { signupWithPhoneService } from 'utils/services/authService';
import { useAuth } from 'utils/contexts/auth';

import styles from '../form.module.scss';

export default function SignInForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const { setUserLoggedIn } = useAuth();
  const [countryCode, setCountryCode] = useState<CountryCode>('ET');
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const signUp = async (value: any) => {
    try {
      const res = await signupWithPhoneService(
        phoneNumber ?? '',
        value.name,
        value.password
      );
      if (res.status == 200) {
        setUserLoggedIn(true);
        router.push('/');
      }
    } catch (err) {
      console.log('err');
      console.log(err);
    }
  };

  const validatePhone = (_: any, value: string) => {
    if (!value || !isValidNumberForRegion(value, countryCode)) {
      return Promise.reject('Enter valid phone number');
    }
    let parsed = parsePhoneNumber(value, countryCode);
    setPhoneNumber(parsed.number);

    return Promise.resolve();
  };

  const countryOptions: { value: string; label: React.ReactElement }[] =
    getCountries().map((code: any) => {
      return {
        value: code,
        label: (
          <span className="phone-icon-container">
            {' '}
            <img
              src={`world_flag/${code.toLowerCase()}.png`}
              className="country-flag-icon"
              width="16px"
            />{' '}
            {code}
          </span>
        ),
      };
    });

  const validatePassword = (_: any, value: string) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject('Passwords do not match');
    }

    return Promise.resolve();
  };

  function selectCountry(code: any) {
    setCountryCode(code);
    form.validateFields(['phone']);
  }

  return (
    <div>
      <Title level={2}>Sign up to Libis</Title>
      <Form layout={'vertical'} form={form} onFinish={signUp}>
        <Form.Item
          className={styles.input}
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Enter a name' }]}
        >
          <Input size="large" type="Name" />
        </Form.Item>
        <Form.Item
          className={styles.input}
          name="phone"
          label="Phone No"
          rules={[
            { required: true, message: 'Enter a phone' },
            {
              validator: validatePhone,
            },
            {
              validateTrigger: countryCode,
            },
          ]}
        >
          <Input
            addonBefore={
              <Select
                options={countryOptions}
                onSelect={selectCountry}
                value={countryCode}
              />
            }
          />
        </Form.Item>
        <Form.Item
          className={styles.input}
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Enter a password' }]}
        >
          <Input.Password
            size="large"
            placeholder="6+ characters"
            type="Password"
            minLength={6}
          />
        </Form.Item>
        <Form.Item
          className={styles.input}
          name="rePassword"
          label="ReType Password"
          rules={[
            { required: true, message: 'Enter a password' },
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item className={styles.input}>
          <Paragraph type="secondary">
            By creating an account on libes you are agreeing to Libes's Terms of
            Service, Privacy Policy
          </Paragraph>
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
