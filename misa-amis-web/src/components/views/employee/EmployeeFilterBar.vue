<template>
  <!-- filterbar -->
  <div class="main__filter">
    <div class="filter__left"></div>
    <div class="filter__right">
      <div class="search-gr">
        <input
          tabindex="2"
          class="search-box focus left__item"
          type="text"
          placeholder="Tìm theo mã, tên hoặc số điện thoại nhân viên"
          v-debounce:400ms="filterTable"
          v-model="filterData"
        />
     
        <div class="icon icon-search icon-search-custom"></div>
      </div>
      <div
        @click="refreshGrid()"
        class="filterbar-icon icon icon-refresh"
        tabindex="3"
        title="Làm mới"
      ></div>

      <div
        @click="exportExcel()"
        class="filterbar-icon icon icon-excel"
        tabindex="3"
        title="Xuất khẩu"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterBar",
  components: {
  },
  data() {
    return {
      dropdownDepartment: {
        data: {
          placeHolder: "Chọn/Nhập phòng ban",
          items: [
            "Phòng nhân sự",
            "Phòng kế toán",
            "Phòng kinh doanh",
            "Phòng sản xuất",
          ],
        },
        style: {
          width: "calc(var(--size-width-M) * 3)",
          height: "40px",
        },
      },

      dropdownPosition: {
        data: {
          placeHolder: "Chọn/Nhập vị trí",
          items: ["Giám đốc", "Fresher Web", "DepOops", "BA"],
        },
        style: {
          width: "calc(var(--size-width-M) * 3)",
          height: "40px",
        },
      },

      filterData: "",
      visibleClearIcon: false,
    };
  },

  methods: {
    /**
     * Làm mới bảng
     * DVHAI 05/07/2021
     */
    refreshGrid() {
      this.$emit("refreshGrid");
    },

    /**
     * Gọi hàm lọc dữ liệu
     * DVHAI 05/07/2021
     */
    filterTable() {
      this.$emit("filterTable");
    },

    /**
     * Xóa trắng 
     * DVHAI 05/07/2021
     */
    async resetText() {
      this.filterData = "";
      await this.$emit("changeValueFilterString", this.filterData);
      await this.refreshGrid();
    },
  },

  computed: {},

  watch: {
    /**
     * Show and hide clear icon
     * DVHAI 05/07/2021
     */
    filterData() {
      if (this.filterData.length > 0) {
        this.visibleClearIcon = true;
      } else {
        this.visibleClearIcon = false;
      }

      this.$emit("changeValueFilterString", this.filterData);
    },
  },
};
</script>

<style scoped>
/* placeholder italic */
::-webkit-input-placeholder {
  font-style: italic;
}
:-moz-placeholder {
  font-style: italic;
}
::-moz-placeholder {
  font-style: italic;
}
:-ms-input-placeholder {
  font-style: italic;
}
.paddingleft-10 {
  margin-left: 10px;
}

.focus:focus-visible {
  border: 1px solid var(--color-great);
}

/* icon clear */
.box__icon {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(233, 235, 238);
  position: absolute;
  top: 6px;
  right: 29px;
}

.icon-textclear {
  cursor: pointer;
}

.icon-textclear:hover {
  background-color: rgb(233, 235, 238, 0.5);
}

.search-gr {
  margin-right: 5px;
  position: relative;
}

/* filter css */
.main__filter {
  padding: 16px 21px 10px 16px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter__left {
  display: flex;
}

.search-box {
  width: 240px;
  height: 32px;
  min-width: 125px;
  border-radius: 2px;
}

.filter__right input {
  border: 1px solid #babec5;
  outline: none;
  padding-left: 0.85em;
  padding-right: 2.75rem;
}

.filter__left input[type="dropdown"] {
  width: 100%;
  cursor: pointer;
}

.filter__right {
  display: flex;
  align-items: center;
}

.filter__right input::placeholder {
  font-family: NotosanItalic;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}

.filterbar-icon {
  margin: 0px 6px;
  cursor: pointer;
}

.icon-refresh {
  background-position: -423px -201px;
}

.icon-refresh:hover {
  background-position: -1097px -88px;
}

.icon-refresh-active {
  background-position: -1097px -88px;
}

.icon-excel {
  background-position: -704px -200px;
}

.icon-excel:hover {
  background-position: -704px -256px;
}

.icon-excel-active {
  background-position: -704px -256px;
}

.icon-search-custom {
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 4px;
}

.icon-search {
  background-position: -989px -357px;
}
</style>
