import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../picture/logo.png"; //kệ nó
import UserHook from "./index.ts";

const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    Login,
    Register,
    isAuthenticated,
    registerSuccess,
    GetUserInfo,
    userInfo,
  } = UserHook();
  const [loginType, setLoginType] = useState("login");

  const onLoginFinish = async (values) => {
    setLoading(true);
    try {
      await Login(values);
      await GetUserInfo(values);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const onRegisterFinish = async (values) => {
    setLoading(true);
    try {
      await Register(values);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    registerSuccess && setLoginType("login");
  }, [registerSuccess]);

  return (
    <div className="form-container">
      <div className="logo-login-container">
        <img src={logo} alt="Logo" style={{ width: 100, height: 100 }} />
        <h2>Đăng nhập</h2>
      </div>
      <Tabs activeKey={loginType} onChange={setLoginType} centered>
        <Tabs.TabPane key="login" tab="Đăng nhập">
          <Form onFinish={onLoginFinish} layout="vertical">
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng nhập
            </Button>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AuthForm;
