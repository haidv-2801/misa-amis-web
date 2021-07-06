<template>
  <div class="header">
    <div class="header__region">
      <div
        v-if="isCollapsedSidebar == false"
        @click="changeSidebarState()"
        class="region__icon--toggle icon-toggle"
      ></div>
      <div class="region__dropdown">
        <div class="dropdown__title">
          CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
        </div>
        <div class="region__icon--toggle icon-arrow-down"></div>
      </div>
    </div>

    <!-- header right -->
    <div class="header__right">
      <!-- icon bell -->
      <div class="icon icon-bell"></div>
      <div class="icon icon-user"></div>
      <div title="Người dùng" class="right__item header_username">
        Đỗ Văn Hải
      </div>
      <!-- icon arrow down -->
      <div class="icon icon-chervon-down"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    /**
     * Hàm thay đổi trạng thái của sidebar
     * DVHAI 05/07/2021
     */
    changeSidebarState() {
      this.$store.commit("TOGGLE_SIDEBAR");
    },
  },
  computed: {
    /**
     * Lấy trạng thái sidebar từ store
     * DVHAI 06/07/2021
     */
    isCollapsedSidebar() {
      return this.$store.state.expandedSidebar;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/header.css");
</style>
