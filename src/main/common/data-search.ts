export const DataSearchEmployee = [
  {
    value: "name",
    label: "Tên người dùng",
  },
  {
    value: "role",
    label: "Chức vụ",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "gender",
    label: "Giới tính",
  },
];

export const ObjectTypeEmployee = {
  name: "text",
  role: "select",
  email: "text",
  gender: "select",
};

export const DataSearchPayment = [
  {
    value: "orderId",
    label: "Tên người dùng",
  },
  {
    value: "paymentDate",
    label: "Ngày thanh toán",
  },
  {
    value: "amount",
    label: "Tổng tiền",
  },
  {
    value: "method",
    label: "Phương thức",
  },
  {
    value: "status",
    label: "Trạng thái",
  },
];

export const ObjectTypePayment = {
  orderId: "select",
  paymentDate: "rangeDate",
  amount: "number",
  method: "select",
  status: "select",
};

export const methodOptions = [
  { value: "credit_card", label: "Credit Card" },
  { value: "paypal", label: "Paypal" },
  { value: "bank_transfer", label: "Chuyển khoản" },
  { value: "offline", label: "Thanh toán trực tiếp" },
];

export const statusOptions = [
  { value: "pending", label: "Chờ xử lý" },
  { value: "paid", label: "Đã trả" },
  { value: "failed", label: "Thất bại" },
];
