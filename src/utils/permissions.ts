import store from "../store/index";

enum Type {
  "pages" = "pages",
  "actions" = "actions",
  "datas" = "datas"
}
export default function(auth: string | boolean | Array<string>, type: Type) {
  const permissions = store.state.permissions;
  if (!permissions) return false;
  const collection: any[] = permissions[type];
  if (type === "pages") {
    if (Array.isArray(auth)) {
      return !!collection.find(item => auth.includes(item.page));
    } else if (typeof auth === "string") {
      return !!collection.find(item => item.page === auth);
    }
  } else if (type === "actions" || type === "datas") {
    return !!collection.find(item => item.code === auth);
  }
}
