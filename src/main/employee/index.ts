import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import { PaginationStateWithQuery } from "../common/common.ts";
import {
  createEmployee,
  deleteEmployee,
  getDetailEmployee,
  searchEmployee,
  updateEmployee,
} from "./reducers.ts";

const EmployeeHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listEmployee = useSelector(
    (state: RootState) => state.employee.listEmployee
  );
  const totalEmployee = useSelector(
    (state: RootState) => state.employee.totalEmployee
  );
  const updateSuccess = useSelector(
    (state: RootState) => state.employee.updateSuccess
  );
  const employee = useSelector((state: RootState) => state.employee.employee);

  const GetDataSearch = (paginationState) => {
    const handlePaginationState = {
      page: paginationState.current - 1,
      size: paginationState.pageSize,
      sort: paginationState.sort,
    };
    const searchField = paginationState.dataSearch;
    const query = PaginationStateWithQuery(handlePaginationState);
    dispatch(
      searchEmployee({
        query,
        bodyRep: {
          ...searchField,
        },
      })
    );
  };

  const CreateEmployee = (body: any) => {
    dispatch(createEmployee(body));
  };

  const UpdateEmployee = (body: any) => {
    dispatch(updateEmployee(body));
  };

  const DeleteEmployee = (id: string) => {
    dispatch(deleteEmployee(id));
  };

  const GetDetailEmployee = (id: string) => {
    dispatch(getDetailEmployee(id));
  };

  return {
    GetDataSearch,
    listEmployee,
    totalEmployee,
    CreateEmployee,
    updateSuccess,
    UpdateEmployee,
    DeleteEmployee,
    GetDetailEmployee,
    employee,
  };
};
export default EmployeeHook;
