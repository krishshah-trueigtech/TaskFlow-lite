import Axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const axiosApi = Axios.create({
  baseURL: API_URL,
});

export let lastFailedRequest = null;

axiosApi.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    lastFailedRequest = error.config;

    const message =
      error.response?.data?.message || error?.message || "Something went wrong";

    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
    }

    const enhancedError = new Error(message);
    enhancedError.isRetryable = true;

    return Promise.reject(enhancedError);
  },
);

export const retryLastRequest = () => {
  if (!lastFailedRequest) return Promise.reject("No failed request to retry");
  return axiosApi(lastFailedRequest);
};

export default axiosApi;
