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
import { useEffect, useState } from "react";
import ProductHook from "./index.ts";

function ProductUpdate({ productData, handleCloseModal }) {
  const [form] = Form.useForm();
  const { UpdateProductWithImage, updateSuccess } = ProductHook();

  const [fileListImageUrl, setFileListImageUrl] = useState([]);
  const [fileListImageDetail, setFileListImageDetail] = useState([]);

  const convertFileList = (paths) => {
    return (
      paths?.split(",").map((path, idx) => ({
        uid: `${idx}`,
        name: path.split("/").pop(),
        status: "done",
        url: `http://localhost:8888/api/get-image?imagePath=${encodeURIComponent(
          path
        )}`,
      })) || []
    );
  };

  useEffect(() => {
    setFileListImageUrl(convertFileList(productData.imageUrl));
    setFileListImageDetail(convertFileList(productData.imageDetail));
    form.setFieldsValue({
      ...productData,
    });
  }, [productData, form]);

  const fileListToString = (fileList) => {
    if (!fileList || fileList.length === 0) return "";
    return fileList.map((f) => `D:/DATN/Image/${f.name}`).join(",");
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      const payload = {
        ...values,
        id: productData.id,
        code: productData.code,
        imageUrl: fileListToString(fileListImageUrl),
        imageDetail: fileListToString(fileListImageDetail),
      };

      formData.append("product", JSON.stringify(payload));

      // Thêm file ảnh chính (nếu có)
      if (fileListImageUrl[0]?.originFileObj) {
        formData.append("imageUrl", fileListImageUrl[0].originFileObj);
      }

      // Thêm các file ảnh chi tiết (nếu có)
      fileListImageDetail.forEach((file) => {
        if (file.originFileObj) {
          formData.append("imageDetail", file.originFileObj);
        }
      });

      await UpdateProductWithImage(formData);
    } catch (err) {
      message.error("Lỗi cập nhật sản phẩm");
    }
  };

  useEffect(() => {
    if (updateSuccess) handleCloseModal();
  }, [updateSuccess, handleCloseModal]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Mã sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="stockQuantity" label="Số lượng trong kho">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="categoryId" label="Mã danh mục">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="warehouseId" label="Mã kho">
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
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="imageUrl" label="Ảnh chính">
            <Upload
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
              fileList={fileListImageUrl}
              onChange={({ fileList }) => setFileListImageUrl(fileList)}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="imageDetail" label="Ảnh chi tiết">
            <Upload
              beforeUpload={() => false}
              listType="picture"
              multiple
              maxCount={6}
              fileList={fileListImageDetail}
              onChange={({ fileList }) => setFileListImageDetail(fileList)}
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

export default ProductUpdate;
