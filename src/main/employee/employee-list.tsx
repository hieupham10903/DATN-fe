import React, { useEffect } from 'react';
import { Table, Button, Form, Input } from 'antd';
import EmployeeHook from './index.ts';

const EmployeeList = () => {
    const {
        GetEmployees,
        employees
    } = EmployeeHook();

    useEffect(() => {
        GetEmployees();
    },[])

    const columns = [
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button className="ant-btn edit" onClick={() => console.log('Chỉnh sửa:', record)}>Chỉnh sửa</Button>
                    <Button className="ant-btn delete" onClick={() => console.log('Xóa:', record)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Danh sách nhân viên</h2>
            <Form layout="inline" style={{ marginBottom: 20 }}>
                <Form.Item label="Tìm kiếm nhân viên">
                    <Input.Search 
                        placeholder="Nhập tên nhân viên" 
                        enterButton="Tìm kiếm" 
                        onSearch={(value) => console.log('Tìm kiếm:', value)} 
                    />
                </Form.Item>
            </Form>
            
            <Table
                columns={columns}
                dataSource={employees}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default EmployeeList;
