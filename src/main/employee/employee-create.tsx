import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { gender, role } from '../common/constant.ts';
import EmployeeHook from './index.ts';

function EmployeeCreate({ handleCloseModal, isReset }) {
    const [formModal] = Form.useForm();

    const {
        CreateEmployee,
        updateSuccess
    } = EmployeeHook();

    const onFinish = (value) => {
        CreateEmployee(value);
    }

    useEffect(() => {
        handleCloseModal()
    },[updateSuccess])

    return (
        <>
            <Form layout="vertical" form={formModal} onFinish={onFinish} name="control-hooks"
                initialValues={{
                }}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="code"
                            label='Mã nhân viên'
                            rules={[
                                { required: true, message: 'Nhập mã nhân viên' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label='Tên nhân viên'
                            rules={[
                                { required: true, message: 'Nhập tên nhân viên' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="dob"
                            label='Ngày sinh'
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format='DD/MM/YYYY'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="gender"
                            label='Giới tính'
                        >
                            <Select
                                options={Object.keys(gender).map(key => ({
                                    value: key,
                                    label: gender[key]
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label='Email'
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="role"
                            label='Chức vụ'
                            rules={[
                                { required: true, message: 'Nhập chức vụ' },
                            ]}
                        >
                            <Select
                                options={Object.keys(role).map(key => ({
                                    value: key,
                                    label: role[key]
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">
                    <Space>
                        <Button
                            className="ant-btn delete"
                            icon={<CloseOutlined />}
                            onClick={handleCloseModal}
                        >
                            Đóng
                        </Button>
                        <Button
                            className="ant-btn new"
                            htmlType='submit'
                            type='primary'
                            icon={<SettingOutlined />}
                        >
                            Xác nhận
                        </Button>
                    </Space>

                </Row>
            </Form>
        </>
    );
};

export default EmployeeCreate;
