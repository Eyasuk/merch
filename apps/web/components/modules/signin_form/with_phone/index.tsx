import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Select } from 'antd';
import {
  CountryCode,
  formatIncompletePhoneNumber as formatPhoneNumber,
  parsePhoneNumber,
  getCountries,
  isValidNumberForRegion,
} from 'libphonenumber-js';
import { Title } from 'components/elements/text';
import { useAuth } from 'utils/contexts/auth';
import { signInService } from 'utils/services/authService';

export default function SignInForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { setUserLoggedIn } = useAuth();

  const [countryCode, setCountryCode] = useState<CountryCode>('ET');
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const signIn = async (value: any) => {
    try {
      const res = await signInService(phoneNumber ?? '', value.password);
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

  function selectCountry(code: any) {
    setCountryCode(code);
    form.validateFields(['phone']);
  }

  return (
    <div>
      <Title level={2}>Sign in to Libis</Title>
      <Form layout={'vertical'} form={form} onFinish={signIn}>
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
          <Button type="primary" size="large" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
