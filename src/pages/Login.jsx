import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Card, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(()=> {
    if (searchParams.get('verified')){
      message.success('Email verified successfully! You can now log in.');
    }
  }, [searchParams])

  const onFinish = async (values) => {
    try {
      await login(values);
      message.success('Login successful!');
      navigate('/'); // Redirect home
    } catch (error) {
      message.error('Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{backgroundColor: '#dedcff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
      <Card title="Login" style={{ width: 400}}>
        <Form
          name="login" onFinish={onFinish} autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your E-mail!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
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
            <Button block type="primary" htmlType="submit">Log in</Button>
            Don't have an account? <Link to="/auth/signup">Register here!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
