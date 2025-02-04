import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../../main/reducers"; 
import { getEmployees } from "./reducers.ts";

const EmployeeHook = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const employees = useSelector((state: RootState) => state.employee.employees);
    const loading = useSelector((state: RootState) => state.employee.loading);
    const error = useSelector((state: RootState) => state.employee.error);

    const GetEmployees = () => {
        dispatch(getEmployees())
    }

    return {
        GetEmployees,
        employees
    }
};
export default EmployeeHook;
