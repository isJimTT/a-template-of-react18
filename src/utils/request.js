import axios from "axios";
import { getToken, removeToken } from "./auth";
import { message } from "antd";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 6000,
});

// 请求前拦截
service.interceptors.request.use((config) => {
  const Authorization = getToken() || "";
  if (config && config.headers && Authorization) {
    config.headers.Authorization = Authorization;
  }
  return config;
});

const request = async (config) => {
  try {
    const response = await service.request(config);
    const { code, msg } = response.data;
    if (code !== 1000) {
      switch (code) {
        case 401:
          redirectLogin();
          break;
        case 402:
          message.error(msg);
          break;
        case 403:
          message.error(msg);
          break;
        case 405:
          message.error(msg);
          break;
        default:
          message.error("系统未知错误");
      }
      return {
        code: -1,
        msg: "error",
        data: null,
      };
    }
    return response.data;
  } catch (err) {
    switch (err) {
    }
    if (!window.navigator.onLine) {
      errorInfoRet("请检查网络连接");
    }
    return {
      code: -1,
      msg: "error",
      data: null,
    };
  }
};

const redirectLogin = () => {
  message.warning("用户登录已过期, 即将跳转到登录页面重新登录");
  removeToken();
  window.location.href = "/login";
};

const errorInfoRet = (msg) => {
  message.error(msg);
  return {
    code: -1,
    msg,
    data: null,
  };
};
export default request;
