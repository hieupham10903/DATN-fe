import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import { PaginationStateWithQuery } from "../common/common.ts";
import {
  createCategory,
  deleteCategory,
  resetState,
  searchCategory,
  updateCategory,
} from "./reducers.ts";

const CategoryHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listCategory = useSelector(
    (state: RootState) => state.category.listCategory
  );
  const totalCategory = useSelector(
    (state: RootState) => state.category.totalCategory
  );
  const updateSuccess = useSelector(
    (state: RootState) => state.category.updateSuccess
  );

  const category = useSelector((state: RootState) => state.category.category);

  const GetDataSearch = (paginationState) => {
    const handlePaginationState = {
      page: paginationState.current - 1,
      size: paginationState.pageSize,
      sort: paginationState.sort,
    };
    const searchField = paginationState.dataSearch;
    const query = PaginationStateWithQuery(handlePaginationState);
    dispatch(
      searchCategory({
        query,
        bodyRep: {
          ...searchField,
        },
      })
    );
  };

  const CreateCategory = (body: any) => {
    dispatch(createCategory(body));
  };

  const ResetState = () => {
    dispatch(resetState());
  };

  const UpdateCategory = (body: any) => {
    dispatch(updateCategory(body));
  };

  const DeleteCategory = (id: string) => {
    dispatch(deleteCategory(id));
  };

  return {
    GetDataSearch,
    listCategory,
    totalCategory,
    CreateCategory,
    updateSuccess,
    category,
    ResetState,
    UpdateCategory,
    DeleteCategory,
  };
};
export default CategoryHook;
