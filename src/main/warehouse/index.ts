import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import { PaginationStateWithQuery } from "../common/common.ts";
import {
  createWarehouse,
  deleteWarehouse,
  resetState,
  searchWarehouse,
  updateWarehouse,
} from "./reducers.ts";

const WarehouseHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listWarehouse = useSelector(
    (state: RootState) => state.warehouse.listWarehouse
  );
  const totalWarehouse = useSelector(
    (state: RootState) => state.warehouse.totalWarehouse
  );
  const updateSuccess = useSelector(
    (state: RootState) => state.warehouse.updateSuccess
  );

  const warehouse = useSelector(
    (state: RootState) => state.warehouse.warehouse
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
      searchWarehouse({
        query,
        bodyRep: {
          ...searchField,
        },
      })
    );
  };

  const CreateWarehouse = (body: any) => {
    dispatch(createWarehouse(body));
  };

  const ResetState = () => {
    dispatch(resetState());
  };

  const UpdateWarehouse = (body: any) => {
    dispatch(updateWarehouse(body));
  };

  const DeleteWarehouse = (id: string) => {
    dispatch(deleteWarehouse(id));
  };

  return {
    GetDataSearch,
    listWarehouse,
    totalWarehouse,
    CreateWarehouse,
    updateSuccess,
    warehouse,
    ResetState,
    UpdateWarehouse,
    DeleteWarehouse,
  };
};
export default WarehouseHook;
