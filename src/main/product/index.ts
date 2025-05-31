import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import { PaginationStateWithQuery } from "../common/common.ts";
import {
  createProduct,
  getImage,
  getMultipleImages,
  listAllCategory,
  listAllWarehouse,
  resetState,
  searchProduct,
  updateProductWithImage,
  uploadImage,
} from "./reducers.ts";

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
  };
};
export default ProductHook;
