import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, TableColumnsType } from 'antd';
import EmployeeHook from './index.ts';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const EmployeeList = () => {
    const {
        GetDataSearch,
        listEmployee,
        totalEmployee
    } = EmployeeHook();

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        sort: 'name,asc',
        dataSearch: {}
    });

    const onChangePagination = paginationChange => {
        const { current, pageSize } = paginationChange;
        setPagination(prev => ({
            ...prev,
            current,
            pageSize
        }));
    };
    
    useEffect(() => {
        GetDataSearch(pagination);
    },[pagination.current, pagination.pageSize])

    const columns: TableColumnsType = [
        {
            title: 'STT',
            key: 'index',
            align: 'center',
            render(_, record, index) {
                const indexRecord = (pagination.pageSize * (pagination.current - 1)) + (index + 1);
                return indexRecord;
            }
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <Button 
                        shape="circle" 
                        icon={<EyeOutlined />} 
                        className="ant-btn detail" 
                        onClick={() => console.log('Chi tiết:', record)}
                    />
                    <Button 
                        shape="circle" 
                        icon={<EditOutlined />} 
                        className="ant-btn edit" 
                        onClick={() => console.log('Chỉnh sửa:', record)}
                    />
                    <Button 
                        shape="circle" 
                        icon={<DeleteOutlined />} 
                        className="ant-btn delete" 
                        onClick={() => console.log('Xóa:', record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2>Danh sách nhân viên</h2>
            <Form layout="inline" style={{ marginBottom: 20 }}>
                <Form.Item label="Tìm kiếm nhân viên">
                    <Input
                        placeholder="Nhập tên nhân viên" 
                        enterButton="Tìm kiếm" 
                    />
                </Form.Item>
            </Form>
            
            <Table
                columns={columns}
                dataSource={listEmployee}
                rowKey="id"
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    total: totalEmployee
                }}
                onChange={onChangePagination}
            />
        </div>
    );
};

export default EmployeeList;
