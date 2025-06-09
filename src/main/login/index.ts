import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../main/reducers";
import {
  chatBot,
  getUserInfo,
  login,
  logout,
  register,
  setAuth,
} from "./reducers.ts";

const UserHook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const registerSuccess = useSelector(
    (state: RootState) => state.user.registerSuccess
  );
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const SetAuth = () => {
    dispatch(setAuth(true));
  };

  const Logout = () => {
    dispatch(logout());
  };

  const Login = async (body: any) => {
    await dispatch(login(body));
  };

  const Register = async (body: any) => {
    await dispatch(register(body));
  };

  const ChatBotReply = async (body: any) => {
    const response = await dispatch(chatBot(body));
    return response;
  };

  const GetUserInfo = async (body: any) => {
    await dispatch(getUserInfo(body));
  };

  return {
    isAuthenticated,
    SetAuth,
    Logout,
    Login,
    Register,
    registerSuccess,
    ChatBotReply,
    GetUserInfo,
    userInfo,
  };
};
export default UserHook;
