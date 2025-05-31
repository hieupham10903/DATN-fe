import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { useEffect } from "react";
import WarehouseHook from "./index.ts";

function WarehouseCreate({ handleCloseModal, isReset }) {
  const [formModal] = Form.useForm();
  const { CreateWarehouse, updateSuccess } = WarehouseHook();

  const onFinish = async (value) => {
    CreateWarehouse(value);
  };

  useEffect(() => {
    if (updateSuccess) {
      handleCloseModal();
    }
  }, [updateSuccess]);

  return (
    <Form layout="vertical" form={formModal} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Mã kho"
            rules={[{ required: true, message: "Nhập mã kho" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên kho"
            rules={[{ required: true, message: "Nhập tên kho" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="location" label="Địa chỉ">
            <Input />
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
  );
}

export default WarehouseCreate;
