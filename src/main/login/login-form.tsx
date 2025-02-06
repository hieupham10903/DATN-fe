import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import UserHook from "./index.ts";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        SetAuth
    } = UserHook();

    const onFinish = (values) => {
        setLoading(true);

        // Giả lập đăng nhập (Bạn có thể thay bằng API thật)
        setTimeout(() => {
            SetAuth();
            localStorage.setItem("isAuthenticated", "true");
            navigate("/");
        }, 1000);
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item label="Tài khoản" name="username" rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Đăng nhập</Button>
            </Form>
        </div>
    );
};

export default Login;
