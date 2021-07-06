import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storeData = {
  state: {
    expandedSidebar: false,
  },
  getters: {},
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.expandedSidebar = !state.expandedSidebar;
    },
  },
};

const store = new Vuex.Store(storeData);

export default store;
