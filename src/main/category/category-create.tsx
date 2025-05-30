import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { useEffect } from "react";
import CategoryHook from "./index.ts";

function CategoryCreate({ handleCloseModal, isReset }) {
  const [formModal] = Form.useForm();
  const { CreateCategory, updateSuccess } = CategoryHook();

  const onFinish = async (value) => {
    CreateCategory(value);
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
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Nhập tên danh mục" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="description" label="Ghi chú">
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

export default CategoryCreate;
