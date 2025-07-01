import { CloseOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, Divider, Row, Space } from "antd";
import { useEffect } from "react";
import ProductHook from "./index.ts";

function ProductDetail({ productData, handleCloseModal, isReset }) {
  const {
    GetMainImage,
    GetDetailImages,
    mainImage,
    detailImages,
    listCategory,
    listWarehouse,
    ResetProductState,
  } = ProductHook();

  const imageDetails = productData.imageDetail
    ? productData.imageDetail.split(",")
    : [];

  useEffect(() => {
    ResetProductState();

    const timeout = setTimeout(() => {
      if (productData?.imageUrl) {
        GetMainImage(productData.imageUrl);
      }

      if (productData?.imageDetail) {
        const details = productData.imageDetail.split(",");
        if (details.length > 0) {
          GetDetailImages(details);
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [productData, isReset]);

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
        <Descriptions.Item label="Danh mục">
          {listCategory.find((c) => c.id === productData.categoryId)?.name ||
            "Không rõ"}
        </Descriptions.Item>
        <Descriptions.Item label="Kho">
          {listWarehouse.find((w) => w.id === productData.warehouseId)?.name ||
            "Không rõ"}
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
