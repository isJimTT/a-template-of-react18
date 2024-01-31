import Cookies from "js-cookie";

// 设置token
export const setToken = (token) => {
  Cookies.set("Authorization", token);
};

// 获取token
export const getToken = () => {
  return Cookies.get("Authorization");
};

// 清除token
export const removeToken = () => {
  Cookies.remove("Authorization");
};
