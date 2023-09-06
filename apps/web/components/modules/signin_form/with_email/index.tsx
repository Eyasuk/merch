import { Button, Form, Input } from 'antd';
import { Title } from 'components/elements/text';

export default function SignInForm() {
  const [form] = Form.useForm();
  return (
    <div>
      <Title level={2}>Sign in to Libis</Title>
      <Form layout={'vertical'} form={form}>
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
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
