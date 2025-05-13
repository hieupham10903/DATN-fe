import {
  CloseOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Upload,
  message,
} from "antd";
import React, { useEffect } from "react";
import ProductHook from "./index.ts";

function ProductCreate({ handleCloseModal, isReset }) {
  const [formModal] = Form.useForm();
  const { CreateProduct, updateSuccess, UploadImage, imageUploadUrl } =
    ProductHook();

  const onFinish = async (value) => {
    try {
      const formData = new FormData();

      formData.append("code", value.code);
      formData.append("imageUrl", value.imageUrl?.fileList[0]?.originFileObj);

      const imageDetailPaths =
        value.imageDetail?.fileList?.map((file) => file.originFileObj) || [];
      imageDetailPaths.forEach((file) => {
        formData.append("imageDetail", file);
      });

      formModal.setFieldsValue({ __tempPayload: value });

      await UploadImage(formData);
    } catch (error) {
      message.error("Lỗi upload ảnh");
    }
  };

  useEffect(() => {
    if (imageUploadUrl) {
      const tempPayload = formModal.getFieldValue("__tempPayload");
      if (tempPayload) {
        const payload = {
          ...tempPayload,
          imageUrl: imageUploadUrl.imageUrlPath,
          imageDetail: imageUploadUrl.imageDetailPath,
        };
        CreateProduct(payload);
        formModal.resetFields(["__tempPayload"]);
      }
    }
  }, [imageUploadUrl]);

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
            label="Mã sản phẩm"
            rules={[{ required: true, message: "Nhập mã sản phẩm" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="stockQuantity" label="Số lượng trong kho">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="categoryId" label="Mã danh mục">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="shelfId" label="Mã kệ">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="imageUrl" label="Ảnh chính">
            <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="imageDetail" label="Ảnh chi tiết">
            <Upload
              beforeUpload={() => false}
              multiple
              listType="picture"
              maxCount={6}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
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

export default ProductCreate;
