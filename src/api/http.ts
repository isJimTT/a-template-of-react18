import axios from "axios";
import { TlMessage } from "tl-frontend-components";
import QS from "qs";

TlMessage.config({
  maxCount: 1,
});

const hasKey = (o = {}, k = "") => {
  return Reflect.has(o, k);
};

const isObject = (o = {}) => {
  return Object.prototype.toString.call(o) === "[object Object]";
};

// 全局请求参数解析
// indices: false 数组解析a: [1, 2] => a=1&a=2
// encode: false 是否进行编码，不需要，否则会重复编码
axios.defaults.paramsSerializer = (param) => {
  return QS.stringify(param, { indices: false, encode: false });
};

const http = axios.create({
  baseURL: "/",
});

const httpPlat = axios.create({
  baseURL: "/plat",
});

const httpAsm = axios.create({
  baseURL: "/app/asm/v1",
});

const h = [http, httpPlat, httpAsm];

h.forEach((i) => {
  i.interceptors.request.use(
    async function (config) {
      config.headers["X-Auth"] = `Bearer ${localStorage.getItem("token")}`;
      if (config?.params && !config.params?.limit && config.params?.page) {
        config.params.limit = 10;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  i.interceptors.response.use(
    function (response) {
      const data = response?.data ?? {};
      if (
        !isObject(data) ||
        (hasKey(data, "code") && data?.code !== 0) ||
        (hasKey(data, "ok") && data?.ok === false)
      ) {
        TlMessage.error(data?.msg || data?.message || "出错了！");
      }
      return response;
    },
    function (error) {
      if (error.response) {
        const msg =
          error.response.data.msg || error.response.data.message || "出错了";
        switch (error.response.status) {
          case 401:
            TlMessage.error("权限验证失败，请重新登录！");
            document.location.pathname = "/login";
            break;
          case 500:
            TlMessage.error(`服务器内部错误！${msg}`);
            break;
          default:
            TlMessage.error(msg);
            break;
        }
      } else {
        switch (error.code) {
          case "ECONNABORTED":
            TlMessage.error("请求超时！");
            break;
          default:
            break;
        }
      }

      return Promise.reject(error);
    }
  );
});

export { http, httpPlat, httpAsm };
