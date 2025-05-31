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
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { useEffect, useState } from "react";
import ProductHook from "./index.ts";

function ProductUpdate({ productData, handleCloseModal }) {
  const [form] = Form.useForm();
  const { UpdateProductWithImage, updateSuccess, listCategory, listWarehouse } =
    ProductHook();

  const [fileListImageUrl, setFileListImageUrl] = useState([]);
  const [fileListImageDetail, setFileListImageDetail] = useState([]);

  const convertFileList = (paths) => {
    return (
      paths?.split(",").map((path, idx) => ({
        uid: `uploaded-${idx}`,
        name: path.split("/").pop(),
        status: "done",
        url: `http://localhost:8888/api/get-image?imagePath=${encodeURIComponent(
          path
        )}`,
      })) || []
    );
  };

  useEffect(() => {
    if (productData) {
      setFileListImageUrl(convertFileList(productData.imageUrl));
      setFileListImageDetail(convertFileList(productData.imageDetail));
      form.setFieldsValue({ ...productData });
    }
  }, [productData]);

  const fileListToString = (fileList) => {
    if (!fileList?.length) return "";
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

      if (fileListImageUrl[0]?.originFileObj) {
        formData.append("imageUrl", fileListImageUrl[0].originFileObj);
      }

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
  }, [updateSuccess]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Mã sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập mã sản phẩm" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="stockQuantity"
            label="Số lượng trong kho"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true, message: "Chọn danh mục" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              options={listCategory.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="warehouseId"
            label="Kho"
            rules={[{ required: true, message: "Chọn kho" }]}
          >
            <Select
              placeholder="Chọn kho"
              options={listWarehouse.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
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
