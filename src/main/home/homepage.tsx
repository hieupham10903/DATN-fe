"use client";

import {
  BarChartOutlined,
  DollarOutlined,
  LoadingOutlined,
  PieChartOutlined,
  ShoppingOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Col,
  Layout,
  Row,
  Space,
  Spin,
  Statistic,
  Tag,
  Typography,
} from "antd";
import Card from "antd/es/card/Card";

import { useEffect, useState } from "react";
import ProductHook from "../product/index.ts";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const COLORS = [
  "#1890ff",
  "#52c41a",
  "#faad14",
  "#f5222d",
  "#722ed1",
  "#13c2c2",
];

// Biểu đồ tròn đơn giản
const SimplePieChartComponent = ({ data }: { data: any[] }) => {
  const total = data.reduce((sum, item) => sum + item.quantity, 0);

  // Tính toán góc cho từng phần
  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const percentage = (item.quantity / total) * 100;
    const angle = (item.quantity / total) * 360;
    const segment = {
      ...item,
      percentage: percentage.toFixed(1),
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      color: COLORS[index % COLORS.length],
    };
    currentAngle += angle;
    return segment;
  });

  // Tạo conic-gradient string
  const gradientSegments = segments
    .map((segment, index) => {
      const nextStart =
        index < segments.length - 1 ? segments[index + 1].startAngle : 360;
      return `${segment.color} ${segment.startAngle}deg ${segment.endAngle}deg`;
    })
    .join(", ");

  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      {/* Biểu đồ tròn */}
      <div style={{ position: "relative", marginBottom: "30px" }}>
        <div
          style={{
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: `conic-gradient(${gradientSegments})`,
            position: "relative",
            boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
          }}
        />
        {/* Vòng tròn trắng ở giữa để tạo hiệu ứng donut */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80px",
            height: "80px",
            backgroundColor: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{ fontSize: "20px", fontWeight: "bold", color: "#1890ff" }}
          >
            {total}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>Tổng SP</div>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: "100%",
        }}
      >
        {segments.map((segment, index) => (
          <div
            key={segment.categoryId}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 10px",
              backgroundColor: "rgba(248, 249, 250, 0.8)",
              borderRadius: "6px",
              border: `1px solid ${segment.color}30`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: segment.color,
                  borderRadius: "2px",
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                {segment.categoryName}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "13px", color: "#666" }}>
                {segment.quantity} SP
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: segment.color,
                }}
              >
                {segment.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Biểu đồ cột doanh thu
const RevenueBarChartComponent = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
        <BarChartOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
        <div>Không có dữ liệu doanh thu</div>
      </div>
    );
  }

  const maxAmount = Math.max(...data.map((item) => item.totalAmount));
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split("-");
    return `${monthNum}/${year}`;
  };

  return (
    <div style={{ padding: "16px", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
          height: "350px",
          width: "100%",
          marginBottom: "16px",
          padding: "0 10px",
        }}
      >
        {data.map((item, index) => {
          const height = (item.totalAmount / maxAmount) * 300;
          const color = COLORS[index % COLORS.length];

          return (
            <div
              key={item.month}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: `${100 / data.length}%`,
                maxWidth: "120px",
              }}
            >
              {/* Số tiền */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "8px",
                  color,
                  fontSize: "14px",
                  fontWeight: "bold",
                  minHeight: "32px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {formatCurrency(item.totalAmount)}
              </div>
              {/* Cột */}
              <div
                style={{
                  width: "50px",
                  height: `${Math.max(height, 20)}px`,
                  background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
                  borderRadius: "8px 8px 4px 4px",
                  boxShadow: `0 4px 12px ${color}40`,
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Hiệu ứng sáng */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    height: "30%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              </div>
              {/* Tháng */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "8px",
                  fontSize: "13px",
                  color: "#666",
                  fontWeight: "500",
                }}
              >
                {formatMonth(item.month)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Thống kê tổng quan doanh thu */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          padding: "16px",
          color: "white",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>
                Tổng doanh thu
              </div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                {formatCurrency(
                  data.reduce((sum, item) => sum + item.totalAmount, 0)
                )}
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>
                Trung bình/tháng
              </div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                {formatCurrency(
                  data.reduce((sum, item) => sum + item.totalAmount, 0) /
                    data.length
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const HomePage = () => {
  const {
    GetListStatisticByCategory,
    listStatisticByCategory,
    GetListStatisticPayment,
    listStatisticPayment,
  } = ProductHook();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await GetListStatisticByCategory();
        await GetListStatisticPayment({
          startDate: "2025-02-01",
          endDate: "2025-06-01",
        });
      } catch (err) {
        setError("Không thể tải dữ liệu thống kê. Vui lòng thử lại.");
        console.error("Error fetching statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hiển thị loading
  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
            <PieChartOutlined style={{ marginRight: 12 }} />
            Trang quản trị - Thống kê & Báo cáo
          </Title>
        </Header>
        <Content
          style={{
            padding: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <Spin
              size="large"
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 48, color: "#1890ff" }}
                  spin
                />
              }
            />
            <div style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
              Đang tải dữ liệu thống kê...
            </div>
          </div>
        </Content>
      </Layout>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
            <PieChartOutlined style={{ marginRight: 12 }} />
            Trang quản trị - Thống kê & Báo cáo
          </Title>
        </Header>
        <Content style={{ padding: "24px" }}>
          <Alert
            message="Lỗi tải dữ liệu"
            description={error}
            type="error"
            showIcon
            style={{ borderRadius: "12px" }}
            action={
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Thử lại
              </button>
            }
          />
        </Content>
      </Layout>
    );
  }

  // Kiểm tra dữ liệu có tồn tại không
  if (!listStatisticByCategory || listStatisticByCategory.length === 0) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
            <PieChartOutlined style={{ marginRight: 12 }} />
            Trang quản trị - Thống kê & Báo cáo
          </Title>
        </Header>
        <Content style={{ padding: "24px" }}>
          <Alert
            message="Không có dữ liệu"
            description="Hiện tại chưa có dữ liệu thống kê để hiển thị."
            type="info"
            showIcon
            style={{ borderRadius: "12px" }}
          />
        </Content>
      </Layout>
    );
  }

  // Tính toán thống kê
  const totalProducts = listStatisticByCategory.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalCategories = listStatisticByCategory.length;
  const topCategory = listStatisticByCategory.reduce(
    (prev, current) => (prev.quantity > current.quantity ? prev : current),
    listStatisticByCategory[0] || {}
  );

  // Tính toán doanh thu
  const totalRevenue =
    listStatisticPayment?.reduce((sum, item) => sum + item.totalAmount, 0) || 0;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = listStatisticByCategory.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
    percentage: ((item.quantity / totalProducts) * 100).toFixed(1),
  }));

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
          <PieChartOutlined style={{ marginRight: 12 }} />
          Trang quản trị - Thống kê & Báo cáo
        </Title>
      </Header>

      <Content style={{ padding: "24px", width: "100%", margin: "0" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Thống kê tổng quan */}
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  height: "160px",
                  borderRadius: "12px",
                  background: "#fff",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  padding: "24px",
                }}
              >
                <Statistic
                  title="Tổng số sản phẩm"
                  value={totalProducts}
                  prefix={<ShoppingOutlined style={{ color: "#1890ff" }} />}
                  valueStyle={{
                    color: "#1890ff",
                    fontSize: "32px",
                    fontWeight: "bold",
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  height: "160px",
                  borderRadius: "12px",
                  background: "#fff",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  padding: "24px",
                }}
              >
                <Statistic
                  title="Tổng doanh thu"
                  value={formatCurrency(totalRevenue)}
                  prefix={<DollarOutlined style={{ color: "#52c41a" }} />}
                  valueStyle={{
                    color: "#52c41a",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  height: "160px",
                  borderRadius: "12px",
                  background: "#fff",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  padding: "24px",
                }}
              >
                <Statistic
                  title="Danh mục hàng đầu"
                  value={topCategory?.categoryName || "N/A"}
                  prefix={<TrophyOutlined style={{ color: "#faad14" }} />}
                  valueStyle={{
                    color: "#faad14",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  height: "160px",
                  borderRadius: "12px",
                  background: "#fff",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  padding: "24px",
                }}
              >
                <Statistic
                  title="Số danh mục"
                  value={totalCategories}
                  prefix={<PieChartOutlined style={{ color: "#f5222d" }} />}
                  valueStyle={{
                    color: "#f5222d",
                    fontSize: "32px",
                    fontWeight: "bold",
                  }}
                />
              </Card>
            </Col>
          </Row>

          {/* Biểu đồ - Row 1 */}
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <Card
                title="Phân bố sản phẩm theo danh mục"
                bordered={false}
                style={{
                  height: "600px",
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
                headStyle={{
                  borderBottom: "1px solid #f0f0f0",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <SimplePieChartComponent data={chartData} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title="Top 3 danh mục có nhiều sản phẩm nhất"
                bordered={false}
                style={{
                  height: "600px",
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
                headStyle={{
                  borderBottom: "1px solid #f0f0f0",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <Space
                  direction="vertical"
                  style={{ width: "100%", padding: "16px" }}
                  size="medium"
                >
                  {chartData
                    .sort((a, b) => b.quantity - a.quantity)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div
                        key={item.categoryId}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "16px",
                          background: `linear-gradient(135deg, ${COLORS[index]}10 0%, ${COLORS[index]}05 100%)`,
                          borderRadius: "12px",
                          border: `2px solid ${COLORS[index]}20`,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }}
                      >
                        <Space size="large">
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${COLORS[index]} 0%, ${COLORS[index]}80 100%)`,
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "16px",
                              fontWeight: "bold",
                              boxShadow: `0 4px 8px ${COLORS[index]}40`,
                            }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <Text
                              strong
                              style={{ fontSize: "16px", display: "block" }}
                            >
                              {item.categoryName}
                            </Text>
                            <Text type="secondary" style={{ fontSize: "13px" }}>
                              Danh mục sản phẩm
                            </Text>
                          </div>
                        </Space>
                        <div style={{ textAlign: "right" }}>
                          <Tag
                            color={COLORS[index]}
                            style={{
                              fontSize: "14px",
                              padding: "6px 10px",
                              borderRadius: "8px",
                              fontWeight: "bold",
                            }}
                          >
                            {item.quantity} sản phẩm
                          </Tag>
                          <div
                            style={{
                              marginTop: "4px",
                              fontSize: "13px",
                              color: "#666",
                            }}
                          >
                            {item.percentage}% tổng số
                          </div>
                        </div>
                      </div>
                    ))}
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Biểu đồ doanh thu - Row 2 full width */}
          <Row gutter={[32, 32]}>
            <Col xs={24}>
              <Card
                title="Biểu đồ doanh thu theo tháng"
                style={{ height: "500px", borderRadius: "12px" }}
              >
                <RevenueBarChartComponent data={listStatisticPayment || []} />
              </Card>
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};

export default HomePage;
