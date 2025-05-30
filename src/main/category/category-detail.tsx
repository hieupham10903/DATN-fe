import { Col, Form, Input, Row } from "antd";
import { useEffect } from "react";

function CategoryDetail({ categoryData, handleCloseModal }) {
  const [formModal] = Form.useForm();

  useEffect(() => {
    if (categoryData) {
      formModal.setFieldsValue(categoryData);
    }
  }, [categoryData]);

  return (
    <Form layout="vertical" form={formModal}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Nhập tên danh mục" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="description" label="Ghi chú">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default CategoryDetail;
