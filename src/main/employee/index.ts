import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import { searchEmployee } from "./reducers.ts";
import { PaginationStateWithQuery } from "../common/common.ts";

const EmployeeHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listEmployee = useSelector((state: RootState) => state.employee.listEmployee);
  const totalEmployee = useSelector((state: RootState) => state.employee.totalEmployee);
  const loading = useSelector((state: RootState) => state.employee.loading);
  const error = useSelector((state: RootState) => state.employee.error);

  const GetDataSearch = (paginationState) => {
    const handlePaginationState = {
      page: paginationState.current - 1,
      size: paginationState.pageSize,
      sort: paginationState.sort
    };
    const searchField = paginationState.dataSearch;
    const query = PaginationStateWithQuery(handlePaginationState);
    dispatch(
      searchEmployee({
        query,
        bodyRep: {
          ...searchField
        }
      })
    );
  };

  return {
    GetDataSearch,
    listEmployee,
    totalEmployee
  }
};
export default EmployeeHook;
