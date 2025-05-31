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
import WarehouseHook from "./index.ts";
import WarehouseCreate from "./warehouse-create.tsx";
import WarehouseDetail from "./warehouse-detail.tsx";
import WarehouseUpdate from "./warehouse-update.tsx";

const WarehouseList = () => {
  const {
    GetDataSearch,
    listWarehouse,
    totalWarehouse,
    updateSuccess,
    DeleteWarehouse,
  } = WarehouseHook();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    sort: "name,asc",
    dataSearch: {},
  });

  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [options, setOptions] = useState([]);
  const [isReset, setReset] = useState(false);
  const [record, setRecord] = useState(undefined);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);

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
    setVisibleDetail(true);
    setReset(!isReset);
    setRecord(record);
  };

  const handleCloseDetail = () => {
    setVisibleDetail(false);
    setReset(!isReset);
  };

  const handleOpenUpdate = (record) => {
    setVisibleUpdate(true);
    setReset(!isReset);
    setRecord(record);
  };

  const handleCloseUpdate = () => {
    setVisibleUpdate(false);
    setReset(!isReset);
  };

  const handleDelete = (value) => {
    DeleteWarehouse(value.id);
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
      title: "Mã kho",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Tên kho",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "location",
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
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Thêm mới kho"
        onCancel={handleCloseCreate}
        width={1500}
        visible={visibleCreate}
        footer={null}
      >
        <WarehouseCreate
          handleCloseModal={handleCloseCreate}
          isReset={isReset}
        />
      </Modal>

      <Modal
        title="Chi tiết kho"
        onCancel={handleCloseDetail}
        width={1500}
        visible={visibleDetail}
        footer={null}
      >
        <WarehouseDetail
          warehouseData={record}
          handleCloseModal={handleCloseDetail}
        />
      </Modal>

      <Modal
        title="Chỉnh sửa kho"
        onCancel={handleCloseUpdate}
        width={1500}
        visible={visibleUpdate}
        footer={null}
      >
        <WarehouseUpdate
          warehouseData={record}
          handleCloseModal={handleCloseUpdate}
        />
      </Modal>

      <div>
        <h2>Danh sách kho</h2>

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
          dataSource={listWarehouse}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showSizeChanger: true,
            total: totalWarehouse,
          }}
          onChange={onChangePagination}
        />
      </div>
    </>
  );
};

export default WarehouseList;
