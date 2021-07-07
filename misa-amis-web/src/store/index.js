import Vue from "vue";
import Vuex from "vuex";
import Enumeration from "../scripts/common/enumeration"

Vue.use(Vuex);

const storeData = {
  state: {
    //Trạng thái sidebar
    expandedSidebar: false,

    //Thực thể phục vụ cho hàm xóa
    entity: null,

    //Lưu loại form
    formMode: Enumeration.FormMode.Add
  },
  getters: {},
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.expandedSidebar = !state.expandedSidebar;
    },

    SET_ENTITY(state, value) {
      state.entity = JSON.parse(JSON.stringify(value));
    },

    SET_FORMMODE(state, value) {
      state.formMode = value;
    }
  },
};

const store = new Vuex.Store(storeData);

export default store;
