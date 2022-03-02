import { createStore } from "vuex";

interface StateType {
  user: any;
  permissions: {
    modules: { module: string; name: string }[];
    pages: { module: string; page: string; name: string }[];
    actions: { page: string; code: string; name: string }[];
    datas: { action: string; code: string; name: string }[];
  };
}

const option = {
  state() {
    const state: StateType = {
      user: {},
      permissions: {
        actions: [],
        datas: [],
        modules: [],
        pages: []
      }
    };
    return state;
  },
  mutations: {
    setPermissions(state: StateType, n: any) {
      state.permissions = n;
    },
    setUser(state: StateType, n: any) {
      state.user = n;
    }
  }
};

export default createStore(option);
