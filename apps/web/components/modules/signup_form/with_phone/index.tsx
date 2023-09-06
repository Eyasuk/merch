import { useEffect, useState } from 'react';
import {
  CountryCode,
  formatIncompletePhoneNumber as formatPhoneNumber,
  parsePhoneNumber,
  getCountries,
  getCountryCallingCode,
} from 'libphonenumber-js';
import { Button, Form, Input, Select } from 'antd';
import { Title, Paragraph } from 'components/elements/text';

import styles from '../form.module.scss';

export default function SignInForm() {
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState<CountryCode>('ET');

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

  function numberInputChanged(phone: string) {
    let parsed = parsePhoneNumber(phone, countryCode);
    console.log(parsed);
    console.log(getCountryCallingCode('ET'));
    return parsed;
  }

  function selectCountry(code: any) {
    setCountryCode(code);
  }

  return (
    <div>
      <Title level={2}>Sign up to Libis</Title>
      <Form layout={'vertical'} form={form}>
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
          rules={[{ required: true, message: 'Enter a phone' }]}
        >
          <Input
            onChange={(e) => numberInputChanged(e.target.value)}
            // value={value}
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
          <Paragraph type="secondary" ellipsis>
            By creating an account on libes you are agreeing to Libes's Terms of
            Service, Privacy Policy
          </Paragraph>
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large">
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
