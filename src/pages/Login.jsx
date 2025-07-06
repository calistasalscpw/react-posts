import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Card } from "antd";

const Login = ({ onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onFormSubmit(values);
    form.resetFields();
  };

  return (
    <div style={{backgroundColor: '#dedcff', alignContent: 'center', height: '100vh'}}>
      <Card title="Login" style={{ width: 400, margin: "auto" }}>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              {/* <a href="">Forgot password</a> */}
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            don't have an account? <a href="">Register here!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
