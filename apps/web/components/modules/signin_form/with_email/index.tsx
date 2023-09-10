import { useRouter } from 'next/navigation';
import { Button, Form, Input } from 'antd';
import { Title } from 'components/elements/text';
import { signInService } from 'utils/services/authService';

export default function SignInForm() {
  const router = useRouter();
  const [form] = Form.useForm();

  const signIn = async (value: any) => {
    try {
      const res = await signInService(value.email, value.password);
      if (res.status == 200) {
        router.push('/');
      }
    } catch (err) {
      console.log('err');
      console.log(err);
    }
  };

  return (
    <div>
      <Title level={2}>Sign in to Libis</Title>
      <Form layout={'vertical'} form={form} onFinish={signIn}>
        <Form.Item
          name="email"
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
          <Input.Password size="large" type="Password" minLength={6} />
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
