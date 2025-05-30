import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
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

    console.log("responseData", responseData);

    return Promise.reject(error);
  }
);

export default axiosClient;
