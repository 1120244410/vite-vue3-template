export declare type MenuItem = {
  title: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
  auth: string | Array<string>;
  params?: string[];
};

export const menus: MenuItem[] = [
  {
    title: "测试",
    icon: "el-icon-cpu",
    path: "/test",
    children: [],
    params: [],
    auth: "basis_transaction_hub"
  }
];
