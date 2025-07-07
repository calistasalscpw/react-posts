import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons"; // Add MailOutlined
import { Button, Form, Input, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const onFinish = async (values) => {
        try {
            await signup(values);
            message.success('Signup successful! Please log in.');
            navigate('/auth/login');
        } catch (error) {
            message.error('Signup failed. Please try again.');
        }
    };

  return (
      <div style={{backgroundColor: '#dedcff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
            <Card title="Sign Up" style={{ width: 400 }}>
                <Form name="signup" onFinish={onFinish} autoComplete="off">
                    <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="email" rules={[{ required: true, type: 'email', message: "Please input a valid E-mail!" }]}>
                        <Input prefix={<MailOutlined />} placeholder="E-mail" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">Sign Up</Button>
                        Already have an account? <a href="/auth/login">Login here!</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
  );
};

export default Signup;
