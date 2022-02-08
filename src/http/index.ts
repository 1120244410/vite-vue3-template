import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import createCommon from "./common";
import createTransaction from "./transaction";
import createOrder from "./order";
import createSetup from "./setup";
import createAppManage from "./app-manage";
import createApiManage from "./api-manage";
import createApiDoc from "./api-doc";
import createCurl from "./curl";
import createApiSyncCheck from "./api-sync-check";

const router = useRouter();
const getUser = function() {
  const storageName: any = import.meta.env.VITE_STORAGE_USER;
  const user = localStorage.getItem(storageName);
  if (typeof user === "string") {
    return JSON.parse(user);
  }
  return null;
};
const API_URL = import.meta.env.VITE_API_URL;
const http = axios.create({
  baseURL: typeof API_URL === "string" ? API_URL : void 0,
  timeout: 5000
});

http.interceptors.request.use(request => {
  const { method } = request;
  switch (method) {
    case "get":
    case "delete":
      if (!request.params) {
        request.params = request.data;
      }
      break;
    default:
      break;
  }
  const user = getUser();
  const token = user ? user.token : "";
  request.headers = {
    "content-Type": "application/json",
    Authorization: `token ${token}`,
    "x-request-id": uuidv4()
      .replace(/-/g, "")
      .slice(0, 16),
    "x-timestamp": Date.now()
  };

  return request;
});

http.interceptors.response.use(
  response => {
    const data = response.data;
    switch (data.code) {
      case 0:
      case 200:
        return response.data;
      case 401:
        router.push("/");
        return Promise.reject(response.data);
      default:
        ElMessage.error(data.message);
        return Promise.reject(response.data);
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const api = {
  common: createCommon(http),
  transaction: createTransaction(http),
  order: createOrder(http),
  setup: createSetup(http),
  appManage: createAppManage(http),
  apiManage: createApiManage(http),
  apiDoc: createApiDoc(http),
  curl: createCurl(http),
  apiSyncCheck: createApiSyncCheck(http)
};

export default api;
