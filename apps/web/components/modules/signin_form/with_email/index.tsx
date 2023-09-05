import { Button, Checkbox, Form, Input } from 'antd';
import { Title } from 'components/elements/text';

export default function SignInForm() {
  const [form] = Form.useForm();
  return (
    <div>
      <Title level={2}>Sign up to Libis</Title>
      <Form layout={'vertical'}>
        <Form.Item label="Email">
          <Input size="large" type="email" />
        </Form.Item>
        <Form.Item label="Password">
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
