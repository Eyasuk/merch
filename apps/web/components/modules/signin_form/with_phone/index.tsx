import { useEffect, useState } from 'react';
import {
  CountryCode,
  formatIncompletePhoneNumber as formatPhoneNumber,
  parsePhoneNumber,
  getCountries,
  getCountryCallingCode,
} from 'libphonenumber-js';

import { Button, Checkbox, Form, Input, Select } from 'antd';
import { Title } from 'components/elements/text';

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
      <Form layout={'vertical'}>
        <Form.Item label="Name">
          <Input size="large" type="Name" />
        </Form.Item>
        <Form.Item label="Phone No">
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
        <Form.Item label="Password">
          <Input.Password
            size="large"
            placeholder="6+ characters"
            type="Password"
          />
        </Form.Item>
        <Form.Item label="ReType Password">
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item>
          <Checkbox>
            I agree with Libes's Terms of Service, Privacy Policy
          </Checkbox>
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
