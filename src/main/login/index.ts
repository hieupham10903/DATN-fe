import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import { setAuth, logout } from "./reducers.ts";

const UserHook = () => {
    const dispatch = useDispatch<AppDispatch>();

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    const SetAuth = () => {
        dispatch(setAuth(true));
    }

    const Logout = () => {
        dispatch(logout());
    }

    return {
        isAuthenticated,
        SetAuth,
        Logout
    }
};
export default UserHook;