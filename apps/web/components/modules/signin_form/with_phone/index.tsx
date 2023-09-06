import { useState } from 'react';
import {
  CountryCode,
  formatIncompletePhoneNumber as formatPhoneNumber,
  parsePhoneNumber,
  getCountries,
  isValidNumberForRegion,
} from 'libphonenumber-js';

import { Button, Form, Input, Select } from 'antd';
import { Title } from 'components/elements/text';

export default function SignInForm() {
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState<CountryCode>('ET');
  const [phoneNumber, setPhoneNumber] = useState<string>();

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

  function selectCountry(code: any) {
    setCountryCode(code);
    form.validateFields(['phone']);
  }

  return (
    <div>
      <Title level={2}>Sign up to Libis</Title>
      <Form layout={'vertical'} form={form}>
        <Form.Item
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
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Enter a password' }]}
        >
          <Input.Password size="large" type="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
