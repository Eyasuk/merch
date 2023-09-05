import { Button, Checkbox, Form, Input } from 'antd';
import { Title } from 'components/elements/text';

export default function SignInForm() {
  const [form] = Form.useForm();
  return (
    <div>
      <Title level={2}>Sign up to Libis</Title>
      <Form layout={'vertical'}>
        <Form.Item label="Name">
          <Input size="large" type="Name" />
        </Form.Item>
        <Form.Item label="Email">
          <Input size="large" type="email" />
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
