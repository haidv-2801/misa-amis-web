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
    formMode: Enumeration.FormMode.Add,

    //Màn hình loading
    loaderEngine: false,

    //Nếu true cho phép validate
    hasValidate: false
  },
  getters: {},
  mutations: {
    //Set trạng thái sidebar (true-rộng, false-hẹp)
    TOGGLE_SIDEBAR(state) {
      state.expandedSidebar = !state.expandedSidebar;
    },

    //Set thực thể để xóa
    SET_ENTITY(state, value) {
      state.entity = JSON.parse(JSON.stringify(value));
    },

    //Set loại form
    SET_FORMMODE(state, value) {
      state.formMode = value;
    },

    //Set trạng thái loading
    SET_LOADER(state, value) {
      state.loaderEngine = value;
    },

     //Set trạng thái loading
    SET_HASVALIDATE(state, value) {
      state.hasValidate = value;
    },
  },
};

const store = new Vuex.Store(storeData);

export default store;
