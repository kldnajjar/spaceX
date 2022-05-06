import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

axios.interceptors.request.use(
  function (config) {
    config.timeout = 35000;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  let isNetworkError = false;

  if (
    error.message === "Network Error" ||
    error.message === "net::ERR_FAILED" ||
    error.message === "net::ERR_INTERNET_DISCONNECTED" ||
    error.message === "net::ERR_PROXY_CONNECTION_FAILED" ||
    error.message === "net::ERR_CONNECTION_RESET" ||
    error.message === "net::ERR_CONNECTION_CLOSE" ||
    error.message === "net::ERR_NAME_NOT_RESOLVED" ||
    error.message === "net::ERR_CONNECTION_TIMED_OUT"
  )
    isNetworkError = true;

  let isRequestTimedOut = false;
  if (error.code && error.code === "ECONNABORTED") isRequestTimedOut = true;

  if (isNetworkError) {
    toast.error("Netwoek please check the connection");
  } else if (isRequestTimedOut) {
    toast.error("The request has timed out, try again or send us feedback");
  } else if (!expectedError) {
    toast.error("An expected server error occurred");
  } else if (expectedError) {
    toast.error(error.response.data.message);
  }

  return Promise.reject(error);
});

const method = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  CancelToken: axios.CancelToken,
};

export default method;
