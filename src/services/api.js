import Axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error("VITE_API_URL is not defined");

const axiosApi = Axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error),
);

axiosApi.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    const message =
      error.response?.data?.message || error?.message || "Something went wrong";

    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("user");
    }

    return Promise.reject(message);
  },
);

export default axiosApi;
