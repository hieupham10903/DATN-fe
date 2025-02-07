import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import UserHook from "./index.ts";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../picture/logo.png"; //kệ nó

const AuthForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { Login, Register, registerSuccess } = UserHook();
    const [loginType, setLoginType] = useState('login');

    const onLoginFinish = async (values) => {
        setLoading(true);
        try {
            await Login(values);
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
        registerSuccess && setLoginType('login')
    },[registerSuccess])

    return (
        <div className="form-container">
            <div className="logo-login-container">
                <img
                    src={logo}
                    alt="Logo"
                    style={{ width: 100, height: 100 }}
                />                
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
                    <div className="register-link">
                        <p>
                            Chưa có tài khoản?{" "}
                            <a onClick={() => setLoginType('register')}>Đăng ký ngay</a>
                        </p>
                    </div>
                </Tabs.TabPane>

                <Tabs.TabPane key="register" tab="Đăng ký">
                    <Form onFinish={onRegisterFinish} layout="vertical">
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
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Đăng ký
                        </Button>
                    </Form>
                    <div className="login-link">
                        <p>
                            Đã có tài khoản?{" "}
                            <a onClick={() => setLoginType('login')}>Đăng nhập ngay</a>
                        </p>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default AuthForm;
