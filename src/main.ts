import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css";
import { api } from "./http/index";
import Element from "element-plus";
import Store from "./store";
import UTable from "./common/UTable.vue";
import p from "./utils/permissions";

const app = createApp(App);
app.config.globalProperties.$api = api;
app.config.globalProperties.$p = p;
app.use(router);
app.use(Element);
app.use(Store);
app.component("UTable", UTable).mount("#app");
