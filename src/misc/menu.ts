import { Cpu } from "@element-plus/icons-vue";
export declare type MenuItem = {
  title: string;
  icon?: any;
  path: string;
  children?: MenuItem[];
  auth: string | Array<string>;
  params?: string[];
};

export const menus: MenuItem[] = [
  {
    title: "模版",
    icon: Cpu,
    path: "/test",
    children: [],
    auth: "basis_transaction_hub"
  }
];
