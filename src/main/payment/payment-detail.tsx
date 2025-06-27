import { Col, DatePicker, Form, Input, Row, Table } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import CategoryHook from "./index.ts";

function PaymentDetail({ handleCloseModal, record }) {
  const [formModal] = Form.useForm();
  const { GetDetailPayemnt, payment } = CategoryHook();

  const methodMap = {
    credit_card: "Credit Card",
    paypal: "Paypal",
    bank_transfer: "Chuyển khoản",
    offline: "Thanh toán trực tiếp",
  };

  const statusMap = {
    pending: "Chờ xử lý",
    paid: "Đã trả",
    failed: "Thất bại",
  };

  useEffect(() => {
    GetDetailPayemnt(record.id);
  }, [record]);

  useEffect(() => {
    if (payment) {
      formModal.setFieldsValue({
        orderId: payment.orderId,
        amount: payment.amount,
        method: methodMap[payment.method] || payment.method,
        status: statusMap[payment.status] || payment.status,
        userName: payment.userName,
        paymentDate: payment.paymentDate ? dayjs(payment.paymentDate) : null,
      });
    }
  }, [payment]);

  const orderItemColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString()} đ`,
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
  ];

  return (
    <>
      <Form
        layout="vertical"
        form={formModal}
        name="payment-detail-form"
        initialValues={{}}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="orderId" label="Mã đơn hàng">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="userName" label="Tên người dùng">
              <Input disabled placeholder="Không có" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="amount" label="Số tiền">
              <Input disabled suffix="đ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="method" label="Phương thức thanh toán">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="status" label="Trạng thái thanh toán">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="paymentDate" label="Ngày thanh toán">
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY HH:mm:ss"
                disabled
                showTime
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <h3 style={{ marginTop: 24 }}>Danh sách sản phẩm</h3>
      <Table
        dataSource={payment?.orderItems || []}
        columns={orderItemColumns}
        rowKey="id"
        pagination={false}
      />
    </>
  );
}

export default PaymentDetail;
