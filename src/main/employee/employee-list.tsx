import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  TableColumnsType,
} from "antd";
import { useEffect, useState } from "react";
import { gender, role } from "../common/constant.ts";
import {
  DataSearchEmployee,
  ObjectTypeEmployee,
} from "../common/data-search.ts";
import EmployeeCreate from "./employee-create.tsx";
import EmployeeDetail from "./employee-detail.tsx";
import EmployeeUpdate from "./employee-update.tsx";
import EmployeeHook from "./index.ts";

const EmployeeList = () => {
  const {
    GetDataSearch,
    listEmployee,
    totalEmployee,
    updateSuccess,
    DeleteEmployee,
  } = EmployeeHook();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    sort: "code,asc",
    dataSearch: {},
  });

  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [options, setOptions] = useState([]);
  const [isReset, setReset] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [record, setRecord] = useState(undefined);

  const onChangePagination = (paginationChange) => {
    const { current, pageSize } = paginationChange;
    setPagination((prev) => ({
      ...prev,
      current,
      pageSize,
    }));
  };

  useEffect(() => {
    GetDataSearch(pagination);
  }, [pagination]);

  useEffect(() => {
    updateSuccess && GetDataSearch(pagination);
  }, [updateSuccess]);

  useEffect(() => {
    if (ObjectTypeEmployee[searchField] === "select") {
      if (searchField === "gender") {
        setOptions(
          Object.keys(gender).map((key) => ({
            value: key,
            label: gender[key],
          }))
        );
      } else if (searchField === "role") {
        setOptions(
          Object.keys(role).map((key) => ({
            value: key,
            label: role[key],
          }))
        );
      }
    } else {
      setOptions([]);
    }
  }, [searchField]);

  const handleChangeSearch = (value) => {
    setSearchField(value);
    setSearchText("");
  };

  const handleSearch = () => {
    const searchCriteria = {
      [searchField]: {
        [ObjectTypeEmployee[searchField] === "text" ? "contains" : "equals"]:
          searchText,
      },
    };

    setPagination((prev) => ({
      ...prev,
      current: 1,
      dataSearch: searchCriteria,
    }));
  };

  const handleOpenCreate = () => {
    setVisibleCreate(true);
    setReset(!isReset);
  };

  const handleCloseCreate = () => {
    setVisibleCreate(false);
    setReset(!isReset);
  };

  const handleOpenDetail = (record) => {
    setRecord(record);
    setVisibleDetail(true);
  };

  const handleCloseDetail = (record) => {
    setRecord(record);
    setVisibleDetail(false);
  };

  const handleOpenUpdate = (record) => {
    setRecord(record);
    setVisibleUpdate(true);
  };

  const handleCloseUpdate = (record) => {
    setRecord(record);
    setVisibleUpdate(false);
  };

  const columns: TableColumnsType = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render(_, record, index) {
        const indexRecord =
          pagination.pageSize * (pagination.current - 1) + (index + 1);
        return indexRecord;
      },
    },
    {
      title: "Mã người dùng",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      align: "center",
      render(position) {
        return position ? role[position] : "";
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            className="ant-btn detail"
            onClick={() => handleOpenDetail(record)}
          />
          <Button
            shape="circle"
            icon={<EditOutlined />}
            className="ant-btn edit"
            onClick={() => handleOpenUpdate(record)}
          />
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            className="ant-btn delete"
            onClick={() => DeleteEmployee(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        onCancel={handleCloseCreate}
        width={1500}
        visible={visibleCreate}
        footer={null}
      >
        <EmployeeCreate
          handleCloseModal={handleCloseCreate}
          isReset={isReset}
        />
      </Modal>

      <Modal
        title="Chi tiết người dùng"
        onCancel={handleCloseDetail}
        width={1500}
        visible={visibleDetail}
        footer={null}
      >
        <EmployeeDetail handleCloseModal={handleCloseDetail} record={record} />
      </Modal>

      <Modal
        title="Chỉnh sửa người dùng"
        onCancel={handleCloseUpdate}
        width={1500}
        visible={visibleUpdate}
        footer={null}
      >
        <EmployeeUpdate handleCloseModal={handleCloseUpdate} record={record} />
      </Modal>

      <div>
        <h2>Danh sách người dùng</h2>

        <Form layout="inline" style={{ marginBottom: 20 }}>
          <Row
            gutter={16}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Col>
              <Form.Item>
                <Select
                  value={searchField}
                  onChange={(value) => handleChangeSearch(value)}
                  style={{ width: "150" }}
                  options={DataSearchEmployee}
                />
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item>
                {ObjectTypeEmployee[searchField] === "text" ? (
                  <Input
                    placeholder="Nhập từ khóa tìm kiếm"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                ) : (
                  <Select
                    value={searchText}
                    onChange={(value) => setSearchText(value)}
                    style={{ width: "100%" }}
                    options={options}
                  />
                )}
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

          <Row
            gutter={16}
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Col>
              <Button
                type="primary"
                className="ant-btn new"
                icon={<PlusOutlined />}
                onClick={handleOpenCreate}
                style={{ whiteSpace: "nowrap" }}
              >
                Thêm mới
              </Button>
            </Col>
          </Row>
        </Form>

        <Table
          columns={columns}
          dataSource={listEmployee}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showSizeChanger: true,
            total: totalEmployee,
          }}
          onChange={onChangePagination}
        />
      </div>
    </>
  );
};

export default EmployeeList;
