import queryString from "query-string";
import { AxiosInstance } from "axios";

const api = function(axios: AxiosInstance) {
  return {
    // 发送验证码接口
    // Doc: https://yapi.neoclub.cn/project/95/interface/api/6939
    getSmsCode: (data: any) =>
      axios.get(`v1/bff/backend/getSmsCode?${queryString.stringify(data)}`),
    // 登录接口
    // Doc: https://yapi.neoclub.cn/project/95/interface/api/6947
    postLogin: (data: any) => axios.post("v1/bff/backend/login", data),
    // 登出
    logout: (data: any) => axios.post("v1/bff/backend/logout", data),
    // 获得权限组
    // Doc: https://yapi.neoclub.cn/project/435/interface/api/11482
    getPermission() {
      return axios.get(`/v2/bff/backend/permission/permissions`);
    }
  };
};
export default api;
