import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
const resolveENV = (mode, env) => loadEnv(mode, process.cwd())[env];

export default ({ mode }) => {
  return {
    base: resolveENV(mode, "VITE_BASE_URL"),
    // 使vite支持vue
    plugins: [vue()],
    // 别名配置
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") }
    }
  };
};
