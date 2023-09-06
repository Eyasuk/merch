import { Button, Form, Input } from 'antd';
import { Title, Paragraph } from 'components/elements/text';

import styles from '../form.module.scss';

export default function SignInForm() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validatePassword = (_: any, value: string) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject('Passwords do not match');
    }

    return Promise.resolve();
  };

  return (
    <div className={styles.form}>
      <Title level={2}>Sign up to Libis</Title>
      <Form
        layout={'vertical'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          name="Name"
          label="Name"
          rules={[{ required: true, message: 'Enter a name' }]}
        >
          <Input size="large" type="Name" />
        </Form.Item>
        <Form.Item
          name="Email"
          label="Email"
          rules={[{ required: true, message: 'Enter a email' }]}
        >
          <Input size="large" type="email" />
        </Form.Item>
        <Form.Item
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
          name="rePassword"
          label="ReType Password"
          rules={[
            { required: true, message: 'Enter a password' },
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password size="large" minLength={6} />
        </Form.Item>
        <div className={styles.privacy}>
          <Paragraph type="secondary">
            By creating an account on libes you are agreeing to Libes's Terms of
            Service and Privacy Policy
          </Paragraph>
        </div>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
