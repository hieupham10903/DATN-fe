import { Col, Form, Input, Row } from "antd";
import { useEffect } from "react";

function WarehouseDetail({ warehouseData, handleCloseModal }) {
  const [formModal] = Form.useForm();

  useEffect(() => {
    if (warehouseData) {
      formModal.setFieldsValue(warehouseData);
    }
  }, [warehouseData]);

  return (
    <Form layout="vertical" form={formModal}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Mã kho"
            rules={[{ required: true, message: "Nhập mã kho" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên kho"
            rules={[{ required: true, message: "Nhập tên kho" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="location" label="Địa chỉ">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default WarehouseDetail;
