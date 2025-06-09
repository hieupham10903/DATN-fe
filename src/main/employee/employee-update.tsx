import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { gender, role } from "../common/constant.ts";
import EmployeeHook from "./index.ts";

function EmployeeUpdate({ handleCloseModal, record }) {
  const [formModal] = Form.useForm();

  const { GetDetailEmployee, employee, UpdateEmployee, updateSuccess } =
    EmployeeHook();

  useEffect(() => {
    GetDetailEmployee(record.id);
  }, [record]);

  useEffect(() => {
    if (employee) {
      const transformedEmployee = {
        ...employee,
        dob: employee.dob ? dayjs(employee.dob) : null,
      };
      formModal.setFieldsValue(transformedEmployee);
    }
  }, [employee]);

  const onFinish = (value) => {
    UpdateEmployee({
      ...value,
      id: employee.id,
    });
  };

  useEffect(() => {
    handleCloseModal();
  }, [updateSuccess]);

  return (
    <>
      <Form
        layout="vertical"
        form={formModal}
        onFinish={onFinish}
        name="control-hooks"
        initialValues={{}}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="code"
              label="Mã người dùng"
              rules={[{ required: true, message: "Nhập mã người dùng" }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên người dùng"
              rules={[{ required: true, message: "Nhập tên người dùng" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="dob" label="Ngày sinh">
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="gender" label="Giới tính">
              <Select
                options={Object.keys(gender).map((key) => ({
                  value: key,
                  label: gender[key],
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Chức vụ"
              rules={[{ required: true, message: "Nhập chức vụ" }]}
            >
              <Select
                options={Object.keys(role).map((key) => ({
                  value: key,
                  label: role[key],
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify={"start"}>
          <Col span={12}>
            <Form.Item name="username" label="Tài khoản">
              <Input disabled />
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
              htmlType="submit"
              type="primary"
              icon={<SettingOutlined />}
            >
              Xác nhận
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
}

export default EmployeeUpdate;
