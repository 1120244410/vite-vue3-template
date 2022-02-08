export declare type MenuItem = {
  title: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
  auth: string | Array<string>;
};

export const menus: MenuItem[] = [
  {
    title: "事务中心",
    icon: "el-icon-cpu",
    path: "/transaction",
    children: [],
    auth: "basis_transaction_hub"
  },
  {
    title: "订单中心",
    icon: "el-icon-tickets",
    path: "/order",
    children: [],
    auth: "basis_order_hub"
  },
  {
    title: "应用管理",
    icon: "el-icon-edit",
    path: "/app-manage",
    children: [],
    auth: "basis_application_hub"
  },
  {
    title: "api管理",
    icon: "el-icon-link",
    path: "/api-manage",
    children: [],
    auth: "basis_api_hub"
  },
  {
    title: "api-tag管理",
    icon: "el-icon-collection-tag",
    path: "/api-tag",
    children: [],
    auth: "basis_tag_hub"
  },
  {
    title: "api配置文档",
    icon: "el-icon-copy-document",
    path: "/api-doc",
    children: [],
    auth: "basis_document_hub"
  },
  {
    title: "api同步审核",
    icon: "el-icon-copy-document",
    path: "/api-sync-check",
    children: [],
    auth: "basis_api_hub"
  },
  {
    title: "web-cURL",
    icon: "el-icon-postcard",
    path: "/curl",
    children: [],
    auth: "basis_document_hub"
  }
];
