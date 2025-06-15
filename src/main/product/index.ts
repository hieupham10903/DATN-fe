import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import { PaginationStateWithQuery } from "../common/common.ts";
import {
  createProduct,
  getAllProductInfo,
  getImage,
  getListAllPayment,
  getListStatisticByCategory,
  getListStatisticPayment,
  getMultipleImages,
  listAllCategory,
  listAllWarehouse,
  resetState,
  searchProduct,
  updateProductWithImage,
  uploadImage,
} from "./reducers.ts";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ProductHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listProduct = useSelector(
    (state: RootState) => state.product.listProduct
  );
  const totalProduct = useSelector(
    (state: RootState) => state.product.totalProduct
  );
  const updateSuccess = useSelector(
    (state: RootState) => state.product.updateSuccess
  );

  const imageUploadUrl = useSelector(
    (state: RootState) => state.product.imageUploadUrl
  );

  const mainImage = useSelector((state: RootState) => state.product.mainImage);
  const detailImages = useSelector(
    (state: RootState) => state.product.detailImages
  );

  const listCategory = useSelector(
    (state: RootState) => state.product.listCategory
  );

  const listWarehouse = useSelector(
    (state: RootState) => state.product.listWarehouse
  );

  const listStatisticByCategory = useSelector(
    (state: RootState) => state.product.listStatisticByCategory
  );

  const listStatisticPayment = useSelector(
    (state: RootState) => state.product.listStatisticPayment
  );

  const listAllProduct = useSelector(
    (state: RootState) => state.product.listAllProduct
  );

  const listAllPayment = useSelector(
    (state: RootState) => state.product.listAllPayment
  );

  const GetDataSearch = (paginationState) => {
    const handlePaginationState = {
      page: paginationState.current - 1,
      size: paginationState.pageSize,
      sort: paginationState.sort,
    };
    const searchField = paginationState.dataSearch;
    const query = PaginationStateWithQuery(handlePaginationState);
    dispatch(
      searchProduct({
        query,
        bodyRep: {
          ...searchField,
        },
      })
    );
  };

  const CreateProduct = (body: any) => {
    dispatch(createProduct(body));
  };

  const UploadImage = (formData: FormData) => {
    return dispatch(uploadImage(formData));
  };

  const GetMainImage = (imagePath: string) => {
    dispatch(getImage(imagePath));
  };

  const GetDetailImages = (paths: string[]) => {
    dispatch(getMultipleImages(paths));
  };

  const ResetProductState = () => {
    dispatch(resetState());
  };

  const UpdateProductWithImage = (formData: FormData) => {
    dispatch(updateProductWithImage(formData));
  };

  const ListAllCategory = (body: any) => {
    dispatch(listAllCategory(body));
  };

  const ListAllWarehouse = (body: any) => {
    dispatch(listAllWarehouse(body));
  };

  const GetListStatisticByCategory = () => {
    dispatch(getListStatisticByCategory());
  };

  const GetListStatisticPayment = (body: any) => {
    dispatch(getListStatisticPayment(body));
  };

  const GetAllProductInfo = () => {
    dispatch(getAllProductInfo());
  };

  const GetListAllPayment = (body: any) => {
    return dispatch(getListAllPayment(body));
  };

  const exportProductToExcel = async (products) => {
    // Tạo workbook và worksheet mới
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách sản phẩm");

    // Định nghĩa cột
    worksheet.columns = [
      { key: "stt", width: 10 },
      { key: "code", width: 15 },
      { key: "name", width: 25 },
      { key: "price", width: 15 },
      { key: "categoryName", width: 20 },
      { key: "warehouseName", width: 20 },
      { key: "stockQuantity", width: 15 },
    ];

    // Thêm tiêu đề "BÁO CÁO SẢN PHẨM"
    worksheet.mergeCells("A1:G1");
    const titleRow = worksheet.getCell("A1");
    titleRow.value = "BÁO CÁO SẢN PHẨM";
    titleRow.font = { name: "Arial", size: 14, bold: true };
    titleRow.alignment = { horizontal: "center", vertical: "middle" };
    titleRow.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
      left: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "thin", color: { argb: "FF000000" } },
    };
    worksheet.getRow(1).height = 30;

    // Thêm hàng trống
    worksheet.addRow([""]);
    worksheet.getRow(2).height = 10;

    // Thêm tiêu đề cột
    const headers = [
      "STT",
      "Mã",
      "Tên",
      "Giá",
      "Danh mục",
      "Kho hàng",
      "Tồn kho",
    ];
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.font = { name: "Arial", size: 11, bold: true };
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
      };
    });
    worksheet.getRow(3).height = 20;

    // Thêm dữ liệu
    products.forEach((item, index) => {
      const row = worksheet.addRow({
        stt: index + 1,
        code: item.code,
        name: item.name,
        price: item.price,
        categoryName: item.categoryName,
        warehouseName: item.warehouseName,
        stockQuantity: item.stockQuantity,
      });
      row.eachCell((cell) => {
        cell.font = { name: "Arial", size: 11 };
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
        cell.border = {
          top: { style: "thin", color: { argb: "FF000000" } },
          bottom: { style: "thin", color: { argb: "FF000000" } },
          left: { style: "thin", color: { argb: "FF000000" } },
          right: { style: "thin", color: { argb: "FF000000" } },
        };
      });
    });

    // Xuất file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "BaoCaoSanPham.xlsx");
  };

  const exportRevenueToExcel = async (revenues) => {
    // Tạo workbook và worksheet mới
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách doanh thu");

    // Định nghĩa cột
    worksheet.columns = [
      { key: "stt", width: 10 },
      { key: "id", width: 35 },
      { key: "userName", width: 25 },
      { key: "paymentDate", width: 20 },
      { key: "method", width: 20 },
      { key: "amount", width: 15 },
      { key: "status", width: 15 },
    ];

    // Thêm tiêu đề "BÁO CÁO DOANH THU"
    worksheet.mergeCells("A1:G1");
    const titleRow = worksheet.getCell("A1");
    titleRow.value = "BÁO CÁO DOANH THU";
    titleRow.font = { name: "Arial", size: 14, bold: true };
    titleRow.alignment = { horizontal: "center", vertical: "middle" };
    titleRow.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
      left: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "thin", color: { argb: "FF000000" } },
    };
    worksheet.getRow(1).height = 30;

    // Thêm hàng trống
    worksheet.addRow([""]);
    worksheet.getRow(2).height = 10;

    // Thêm tiêu đề cột
    const headers = [
      "STT",
      "Mã",
      "Tên người dùng",
      "Ngày thanh toán",
      "Phương thức",
      "Tổng tiền",
      "Trạng thái",
    ];
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.font = { name: "Arial", size: 11, bold: true };
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
      };
    });
    worksheet.getRow(3).height = 20;

    // Hàm ánh xạ trạng thái và phương thức
    const mapStatus = (status) => {
      switch (status) {
        case "paid":
          return "Đã thanh toán";
        case "pending":
          return "Chờ thanh toán";
        default:
          return status;
      }
    };

    const mapMethod = (method) => {
      switch (method) {
        case "bank_transfer":
          return "Chuyển qua ngân hàng";
        case "credit_card":
          return "Thẻ credit";
        case "paypal":
          return "Paypal";
        default:
          return method;
      }
    };

    // Thêm dữ liệu
    revenues.forEach((item, index) => {
      const row = worksheet.addRow({
        stt: index + 1,
        id: item.id,
        userName: item.userName,
        paymentDate: new Date(item.paymentDate).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        method: mapMethod(item.method),
        amount: item.amount,
        status: mapStatus(item.status),
      });
      row.eachCell((cell) => {
        cell.font = { name: "Arial", size: 11 };
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
        cell.border = {
          top: { style: "thin", color: { argb: "FF000000" } },
          bottom: { style: "thin", color: { argb: "FF000000" } },
          left: { style: "thin", color: { argb: "FF000000" } },
          right: { style: "thin", color: { argb: "FF000000" } },
        };
      });
    });

    // Xuất file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "BaoCaoDoanhThu.xlsx");
  };

  return {
    GetDataSearch,
    listProduct,
    totalProduct,
    CreateProduct,
    updateSuccess,
    UploadImage,
    imageUploadUrl,
    GetMainImage,
    GetDetailImages,
    mainImage,
    detailImages,
    ResetProductState,
    UpdateProductWithImage,
    ListAllCategory,
    listCategory,
    ListAllWarehouse,
    listWarehouse,
    GetListStatisticByCategory,
    listStatisticByCategory,
    GetListStatisticPayment,
    listStatisticPayment,
    GetAllProductInfo,
    listAllProduct,
    GetListAllPayment,
    listAllPayment,
    exportProductToExcel,
    exportRevenueToExcel,
  };
};
export default ProductHook;
