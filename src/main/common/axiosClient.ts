import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "/",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseData = error?.response?.data;
    const message =
      responseData?.message ||
      responseData?.error ||
      error?.message ||
      "Đã xảy ra lỗi khi gọi API";

    toast.error(message, {
      autoClose: 3000,
    });

    return Promise.reject(error);
  }
);

export default axiosClient;
