import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import { setAuth, logout, login } from "./reducers.ts";

const UserHook = () => {
    const dispatch = useDispatch<AppDispatch>();

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    const SetAuth = () => {
        dispatch(setAuth(true));
    }

    const Logout = () => {
        dispatch(logout());
    }

    const Login = async (body : any) => {
        await dispatch(login(body));
    };

    const Register = async (body : any) => {
        await dispatch(login(body));
    };

    return {
        isAuthenticated,
        SetAuth,
        Logout,
        Login,
        Register
    }
};
export default UserHook;