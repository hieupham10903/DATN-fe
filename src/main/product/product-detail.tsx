import { CloseOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, Divider, Row, Space } from "antd";
import React, { useEffect } from "react";
import ProductHook from "./index.ts";

function ProductDetail({ productData, handleCloseModal, isReset }) {
  const { GetMainImage, GetDetailImages, mainImage, detailImages } =
    ProductHook();

  const imageDetails = productData.imageDetail
    ? productData.imageDetail.split(",")
    : [];

  useEffect(() => {
    if (productData?.imageUrl && !mainImage) {
      GetMainImage(productData.imageUrl);
    }
  }, [productData?.imageUrl, isReset]);

  useEffect(() => {
    if (imageDetails.length > 0 && detailImages.length === 0) {
      GetDetailImages(imageDetails);
    }
  }, [imageDetails, isReset]);

  return (
    <>
      <Descriptions
        title="Thông tin sản phẩm"
        bordered
        column={2}
        size="middle"
        style={{ marginBottom: 24 }}
      >
        <Descriptions.Item label="Mã sản phẩm">
          {productData.code}
        </Descriptions.Item>
        <Descriptions.Item label="Tên sản phẩm">
          {productData.name}
        </Descriptions.Item>
        <Descriptions.Item label="Giá">
          {productData.price} VND
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng trong kho">
          {productData.stockQuantity}
        </Descriptions.Item>
        <Descriptions.Item label="Mã danh mục">
          {productData.categoryId}
        </Descriptions.Item>
        <Descriptions.Item label="Mã kệ">
          {productData.shelfId}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả" span={2}>
          {productData.description || "Không có"}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">
        <PictureOutlined /> Ảnh sản phẩm
      </Divider>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <strong>Ảnh chính:</strong>
          <br />
          {mainImage ? (
            <img
              src={mainImage}
              alt="Ảnh chính"
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                marginTop: 8,
              }}
            />
          ) : (
            <span>Đang tải ảnh chính...</span>
          )}
        </Col>
        <Col span={12}>
          <strong>Ảnh chi tiết:</strong>
          <br />
          <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
            {detailImages.length > 0 ? (
              detailImages.map((image, idx) => (
                <Col span={8} key={idx}>
                  <img
                    src={image}
                    alt={`Ảnh chi tiết ${idx + 1}`}
                    style={{ width: "100%", height: 100, objectFit: "cover" }}
                  />
                </Col>
              ))
            ) : (
              <Col span={8}>
                <span>Không có ảnh chi tiết</span>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      <Row justify="end" style={{ marginTop: 24 }}>
        <Space>
          <Button
            className="ant-btn delete"
            icon={<CloseOutlined />}
            onClick={handleCloseModal}
          >
            Đóng
          </Button>
        </Space>
      </Row>
    </>
  );
}

export default ProductDetail;
