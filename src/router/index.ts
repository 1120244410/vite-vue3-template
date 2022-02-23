import { menus, MenuItem } from "../misc/menu";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const componentPath = import.meta.glob("../views/*.vue");
const componentPath2 = import.meta.glob("../views/*/*.vue");
const children: RouteRecordRaw[] = [];

for (const menu of menus) {
  const item: RouteRecordRaw = {
    path: `${menu.path}${
      menu.params && menu.params.length
        ? menu.params.map(el => `/:${el}`).join("")
        : ""
    }`,
    name: menu.path.replace("/", "_"),
    meta: {
      title: menu.title
    },
    component: componentPath[`../views${menu.path}.vue`],
    children: menu.children
      ? menu.children.map((child: MenuItem) => {
          return {
            path: child.path,
            name: child.path.replace("/", "_"),
            meta: {
              title: child.title
            },
            component: componentPath2[`../views${child.path}.vue`]
          };
        })
      : []
  };
  children.push(item);
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/login",
      name: "_login",
      component: () => import("@/views/login.vue")
    },
    {
      path: "/home",
      name: "_home",
      meta: {
        title: ""
      },
      component: () => import("@/views/home.vue"),
      children
    }
  ]
});

export default router;
