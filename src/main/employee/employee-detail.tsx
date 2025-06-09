import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { gender, role } from "../common/constant.ts";
import EmployeeHook from "./index.ts";

function EmployeeDetail({ handleCloseModal, record }) {
  const [formModal] = Form.useForm();

  const { GetDetailEmployee, employee } = EmployeeHook();

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

  return (
    <>
      <Form
        layout="vertical"
        form={formModal}
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
              <Input disabled />
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
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input disabled />
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
                disabled
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
      </Form>
    </>
  );
}

export default EmployeeDetail;
