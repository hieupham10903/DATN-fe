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
import { DataSearchProduct, ObjectTypeProduct } from "../common/data-search.ts";
import ProductHook from "./index.ts";
import ProductCreate from "./product-create.tsx";
import ProductDetail from "./product-detail.tsx";
import ProductUpdate from "./product-update.tsx";

const ProductList = () => {
  const {
    GetDataSearch,
    listProduct,
    totalProduct,
    updateSuccess,
    ResetProductState,
    ListAllCategory,
    listCategory,
    ListAllWarehouse,
    listWarehouse,
    DeleteProduct,
  } = ProductHook();

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
    ListAllCategory({});
    ListAllWarehouse({});
  }, []);

  useEffect(() => {
    GetDataSearch(pagination);
  }, [pagination]);

  useEffect(() => {
    updateSuccess && GetDataSearch(pagination);
  }, [updateSuccess]);

  useEffect(() => {
    if (ObjectTypeProduct[searchField] === "select") {
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
        [ObjectTypeProduct[searchField] === "text" ? "contains" : "equals"]:
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
    ResetProductState();
  };

  const handleOpenUpdate = (record) => {
    setVisibleUpdate(true);
    setReset(!isReset);
    setRecord(record);
  };

  const handleCloseUpdate = () => {
    setVisibleUpdate(false);
    setReset(!isReset);
    ResetProductState();
  };

  const confirmDeleteProduct = (productId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        DeleteProduct(productId);
      },
    });
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
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
      align: "center",
      render: (categoryId: number) => {
        const category = listCategory.find((c) => c.id === categoryId);
        return category?.name || "Không rõ";
      },
    },
    {
      title: "Tên kho",
      dataIndex: "warehouseId",
      key: "warehouseId",
      align: "center",
      render: (warehouseId: number) => {
        const warehouse = listWarehouse.find((w) => w.id === warehouseId);
        return warehouse?.name || "Không rõ";
      },
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
            onClick={() => confirmDeleteProduct(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Thêm mới sản phẩm"
        onCancel={handleCloseCreate}
        width={1500}
        visible={visibleCreate}
        footer={null}
      >
        <ProductCreate handleCloseModal={handleCloseCreate} isReset={isReset} />
      </Modal>

      <Modal
        title="Chi tiết sản phẩm"
        onCancel={handleCloseDetail}
        width={1500}
        visible={visibleDetail}
        footer={null}
        destroyOnHidden
      >
        <ProductDetail
          productData={record}
          handleCloseModal={handleCloseDetail}
          isReset={isReset}
        />
      </Modal>

      <Modal
        title="Chỉnh sửa sản phẩm"
        onCancel={handleCloseUpdate}
        width={1500}
        visible={visibleUpdate}
        footer={null}
        destroyOnHidden
      >
        <ProductUpdate
          productData={record}
          handleCloseModal={handleCloseUpdate}
        />
      </Modal>

      <div>
        <h2>Danh sách sản phẩm</h2>

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
                  options={DataSearchProduct}
                />
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item>
                {ObjectTypeProduct[searchField] === "text" ? (
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
          dataSource={listProduct}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showSizeChanger: true,
            total: totalProduct,
          }}
          onChange={onChangePagination}
        />
      </div>
    </>
  );
};

export default ProductList;
