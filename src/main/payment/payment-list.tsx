import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  TableColumnsType,
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import {
  DataSearchPayment,
  ObjectTypePayment,
  methodOptions,
  statusOptions,
} from "../common/data-search.ts";
import EmployeeHook from "../employee/index.ts";
import CategoryHook from "./index.ts";
dayjs.extend(utc);

const PaymentList = () => {
  const { GetDataSearch, listPayment, totalPayment } = CategoryHook();
  const { GetAllUser, listAllUser } = EmployeeHook();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    sort: "",
    dataSearch: {},
  });

  const onChangePagination = (paginationChange) => {
    const { current, pageSize } = paginationChange;
    setPagination((prev) => ({
      ...prev,
      current,
      pageSize,
    }));
  };

  const [searchField, setSearchField] = useState("orderId");
  const [searchText, setSearchText] = useState<any>("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    GetDataSearch(pagination);
  }, [pagination]);

  useEffect(() => {
    GetAllUser();
  }, []);

  useEffect(() => {
    if (searchField === "orderId") {
      setOptions(
        listAllUser
          .filter((user) => user.orderId !== null && user.role === "GUEST")
          .map((user) => ({
            value: user.orderId,
            label: user.name,
          }))
      );
    } else if (searchField === "method") {
      setOptions(methodOptions);
    } else if (searchField === "status") {
      setOptions(statusOptions);
    } else {
      setOptions([]);
    }
  }, [searchField, listAllUser]);

  const handleChangeSearch = (value: string) => {
    setSearchField(value);
    setSearchText("");
  };

  const handleSearch = () => {
    const fieldType = ObjectTypePayment[searchField];

    let searchCriteria: any = {};
    if (fieldType === "text") {
      searchCriteria[searchField] = { contains: searchText };
    } else if (fieldType === "select") {
      searchCriteria[searchField] = { equals: searchText };
    } else if (fieldType === "rangeDate") {
      if (fieldType === "rangeDate") {
        if (searchText && searchText.length === 2) {
          searchCriteria[searchField] = {
            greaterThanOrEqual: searchText[0]
              .startOf("day")
              .format("YYYY-MM-DDTHH:mm:ss"),
            lessThanOrEqual: searchText[1]
              .endOf("day")
              .format("YYYY-MM-DDTHH:mm:ss"),
          };
        }
      }
    } else if (fieldType === "number") {
      const [min, max] = searchText;
      searchCriteria[searchField] = {
        greaterThanOrEqual: min,
        lessThanOrEqual: max,
      };
    }

    setPagination((prev) => ({
      ...prev,
      current: 1,
      dataSearch: searchCriteria,
    }));
  };

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

  const columns: TableColumnsType = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render(_, __, index) {
        const indexRecord =
          pagination.pageSize * (pagination.current - 1) + (index + 1);
        return indexRecord;
      },
    },
    {
      title: "Người mua",
      key: "userName",
      align: "center",
      render: (_: any, record: any) => {
        const matchedUser = listAllUser.find(
          (user) => user.orderId === record.orderId
        );
        return matchedUser ? matchedUser.name : "Không xác định";
      },
    },
    {
      title: "Ngày mua",
      dataIndex: "paymentDate",
      key: "paymentDate",
      align: "center",
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Cách thức",
      dataIndex: "method",
      key: "method",
      align: "center",
      render: (value) => methodMap[value] || value,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (value) => statusMap[value] || value,
    },
  ];

  return (
    <div>
      <h2>Danh sách danh mục đơn hàng</h2>

      <Form layout="inline" style={{ marginBottom: 20 }}>
        <Row gutter={16} style={{ width: "100%", marginBottom: 10 }}>
          <Col>
            <Form.Item>
              <Select
                value={searchField}
                onChange={handleChangeSearch}
                style={{ width: 180 }}
                options={DataSearchPayment}
              />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item>
              {ObjectTypePayment[searchField] === "text" ? (
                <Input
                  placeholder="Nhập từ khóa"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              ) : ObjectTypePayment[searchField] === "select" ? (
                <Select
                  value={searchText}
                  onChange={(value) => setSearchText(value)}
                  style={{ width: "100%" }}
                  options={options}
                />
              ) : ObjectTypePayment[searchField] === "rangeDate" ? (
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  value={searchText}
                  onChange={(value) => setSearchText(value)}
                  format="DD/MM/YYYY"
                />
              ) : ObjectTypePayment[searchField] === "number" ? (
                <Row gutter={8}>
                  <Col span={12}>
                    <InputNumber
                      placeholder="Từ"
                      style={{ width: "100%" }}
                      value={searchText?.[0]}
                      onChange={(value) =>
                        setSearchText([value, searchText?.[1] ?? null])
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <InputNumber
                      placeholder="Đến"
                      style={{ width: "100%" }}
                      value={searchText?.[1]}
                      onChange={(value) =>
                        setSearchText([searchText?.[0] ?? null, value])
                      }
                    />
                  </Col>
                </Row>
              ) : null}
            </Form.Item>
          </Col>

          <Col>
            <Button
              className="ant-btn search"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              style={{ whiteSpace: "nowrap" }}
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>

      <Table
        columns={columns}
        dataSource={listPayment}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          total: totalPayment,
        }}
        onChange={onChangePagination}
      />
    </div>
  );
};

export default PaymentList;
