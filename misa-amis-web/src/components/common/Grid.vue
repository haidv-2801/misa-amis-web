<template>
  <div class="grid">
    <!-- Bảng dữ liệu -->
    <div class="main__grid">
      <table>
        <thead>
          <tr>
            <!-- checkbox -->
            <td class="tickbox-40" style="z-index: 1;">
              <div
                @click="toggleCheckAll(0)"
                :class="{ 'icon-checkbox-active': checked == 0 }"
                class="tick-box icon-18 icon"
              ></div>
            </td>
            <!-- Các cột còn lại -->
            <td
              v-for="(item, index) in data.column"
              :key="index"
              :class="{
                'align-right': item.dataType == Resource.DataTypeColumn.Number,
                'align-center': item.dataType == Resource.DataTypeColumn.Date,
              }"
            >
              {{ item.displayName }}
            </td>

            <!-- Cột chức năng -->
            <td class="utility align-center" style="z-index: 1;">
              Chức năng
            </td>
          </tr>
        </thead>
        <!-- vc -->
        <tbody>
          <tr
            v-for="(item, index) in data.data"
            :key="index"
            :class="{
              active: multiSelectList.includes(index),
              hover: itemHover == index,
            }"
            @click="selectRow(index)"
            @mouseover="itemHover = index"
          >
            <!-- checkbox -->
            <td
              :class="{
                active: multiSelectList.includes(index),
                hover: itemHover == index,
              }"
              class="tickbox-40 tickbox-background"
              @click="selectRow(index)"
            >
              <div
                @click="toggleCheckAll(index + 1)"
                :class="{
                  'icon-checkbox-active': checked == 0 || checked == index + 1,
                }"
                class="tick-box icon-18 icon"
              ></div>
            </td>

            <!-- Các cột còn lại -->
            <td
              v-for="(column, index) in data.column"
              :key="index"
              :class="{
                'align-right':
                  column.dataType == Resource.DataTypeColumn.Number,
                'align-center': column.dataType == Resource.DataTypeColumn.Date,
              }"
              :title="item[column.fieldName]"
            >
              {{
                formatValue(
                  item[column.fieldName],
                  column.dataType,
                  column.displayType
                )
              }}
            </td>

            <!-- Chức năng -->
            <td
              :class="{
                active: multiSelectList.includes(index),
                hover: itemHover == index,
              }"
              class="utility tickbox-background"
            >
              <div class="utility-text">
                <span>Sửa</span>
              </div>
              <div class="u-option-wrap">
                <div class="utility-icon">
                  <div class="icon icon-16 icon-arrowdown-blue"></div>
                </div>
                <!-- utility options -->
                <div class="u-options">
                  <div class="u-option-item">Nhân bản</div>
                  <div class="u-option-item">Xóa</div>
                  <div class="u-option-item">Ngừng sử dụng</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Phân trang -->
    <Paging
      :data="gridData.pagination"
      @changePageNumber="changePageNumber"
      @changePageSize="changePageSize"
    />
  </div>
</template>

<script>
import Resource from "../../scripts/common/resource.js";
import Enumeration from "../../scripts/common/enumeration.js";
import CommonFn from "../../scripts/common/common.js";
import Paging from "../../components/common/Paging.vue";

export default {
  name: "Grid",
  props: {
    gridData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Paging,
  },
  data() {
    return {
      // Tạo bản sao được truyền từ ngoài  vào
      data: JSON.parse(JSON.stringify(this.gridData)),

      //Sử dụng các tiện ích tự viết
      CommonFn: CommonFn,
      Enumeration: Enumeration,
      Resource: Resource,

      //Lưu những dòng được chọn
      multiSelectList: [],

      //Vị trí ô checkbox được check (0-checked tất cả)
      checked: -1,

      //Vị trí index được hover
      itemHover: -1,
    };
  },
  created() {
    this.data = this.gridData;
  },
  methods: {
    /**
     * Thực hiện chọn dòng trong bảng
     * DVHAI 05/07/2021
     */
    selectRow(index) {
      this.multiSelectList = [index];
    },

    /**
     * Chọn nhiều dòng bằng cách dữ ctrl+click
     * DVHAI 05/07/2021
     */
    multiSelectRow(index) {
      if (!this.multiSelectList.includes(index))
        this.multiSelectList.push(index);
      else {
        if (this.multiSelectList.length > 1) {
          let realIndex = this.multiSelectList.indexOf(index);
          this.multiSelectList.splice(realIndex, 1);
        }
      }
    },

    /**
     * Lấy những dòng được chọn
     * DVHAI 05/07/2021
     */
    getSelectedRow() {
      return this.multiSelectList;
    },

    /**
     * Định dạng lại dữ liệu trước khi hiển thị ra bảng
     * DVHAI 05/07/2021
     */
    formatValue(data, dataType, dataDisplayType) {
      let formattedData = data;

      if (dataType) {
        switch (dataType) {
          case this.Resource.DataTypeColumn.Number:
            if (dataDisplayType == "Money")
              formattedData = this.CommonFn.formatMoney(formattedData);
            break;
          case this.Resource.DataTypeColumn.Date:
            formattedData = this.CommonFn.formatDate(formattedData);
            break;
          case this.Resource.DataTypeColumn.Enum:
            if (dataDisplayType == "Gender")
              formattedData = this.CommonFn.getValueEnum(
                formattedData,
                dataDisplayType
              );

            if (dataDisplayType == "WorkStatus")
              formattedData = this.CommonFn.getValueEnum(
                formattedData,
                dataDisplayType
              );

            break;
        }
      }
      return formattedData;
    },

    /**
     * Chọn dòng trong bảng
     * DVHAI 05/07/2021
     */
    rowClick(index) {
      this.multiSelectList = [];
      this.curRowClicked = index;
    },

    /**
     * Mở form nếu là form sửa thì đẩy dữ liệu lên
     * DVHAI 05/07/2021
     */
    openFormDetail(item) {
      this.$emit("openFormDetail", item);
    },

    /**
     * Thay đổi trang hiện tại
     * DVHAI 05/07/2021
     */
    changePageNumber(value) {
      this.$emit("changePageNumber", value);
    },

    /**
     * Thay đổi số bản ghi trong 1 trang
     * DVHAI 05/07/2021
     */
    changePageSize(value) {
      this.$emit("changePageSize", value);
    },

    /**
     *Thực hiện check tất cả các dòng(bỏ check) nếu hàm được gọi
     * DVHAI 05/07/2021
     */
    toggleCheckAll(index) {
      if (this.checked == index) {
        this.checked = -1;
      } else {
        this.checked = index;
      }
    },
  },
  watch: {},
};
</script>

<style scoped>
.active {
  background-color: #f8f8f8 !important;
}

.hover {
  background-color: #f3f8f8 !important;
}

.main__grid {
  position: relative;
  overflow: auto;
  width: 100%;
  height: calc(100vh - 249px);
}

.align-right {
  text-align: right;
}

.align-center {
  text-align: center;
}

table tbody td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  height: 47px;
  padding: 5px 10px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
}

table tbody td:not(td.tickbox-40, td.utility) {
  cursor: default;
  min-width: 125px;
}

table tbody td:last-child:not(td.utility) {
  border-right: none;
  border-top: none;
}

/* i */
table {
  width: 100%;
  border-spacing: 0;
  /* border-collapse: collapse; */
}

table tr {
  /* border-bottom: 1px solid #c7c7c7; */
}

table tbody tr {
  cursor: pointer;
  height: 47px;
}

table thead tr {
  background-color: var(--color-main-background);
}

table thead td {
  cursor: pointer;
  height: 34px;
  line-height: 34px;
  position: sticky;
  position: -webkit-sticky;
  text-transform: uppercase;
  background-color: #eceef1;
  top: 0;
  font-size: 12px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
  white-space: nowrap;
  padding: 0 10px;
  text-align: left;
  max-width: 250px;
  font-weight: 700;
  font-family: NotosanBold;
}

.utility {
  position: sticky;
  position: -webkit-sticky;
  right: 0;
  width: 120px;
  z-index: 0;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid #c7c7c7;
  border-left: 1px dotted #c7c7c7;
}

th.utility {
  text-align: center;
}

.utility-text {
  width: 25px;
  display: flex;
  flex-basis: 45px;
  justify-content: center;
}

.utility-text span:active {
  border: 1px solid rgb(0, 117, 192);
}

.utility-icon {
  justify-content: center;
  display: flex;
  height: 16px;
  width: 26px;
}

.utility-icon:active {
  border: 1px solid rgb(0, 117, 192);
}

tbody td.utility {
  display: flex;
  justify-content: center;
  align-items: center;
}

.utility:not(thead td) {
  color: rgb(0, 117, 192);
  font-family: NotosanSemibold;
  font-weight: 600;
  text-align: center;
}

.grid {
  padding: 0px 28px 0px 16px;
}

.icon-checkbox-active {
  background-position: -1224px -361px;
}

.icon-18 {
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
}

.icon-16 {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}

.icon-arrowdown-blue {
  background-position: -896px -359px;
}

.tickbox-40 {
  position: sticky;
  position: -webkit-sticky;
  left: 0;
  width: 40px;
  z-index: 0;
}

.tickbox-background {
  background-color: #fff;
}

.tick-box {
  background-color: #fff;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid rgb(175, 175, 175);
}

/* utility */
.u-option-wrap {
  position: relative;
  display: inline-block;
}

.u-options {
  position: absolute;
  padding: 2px 1px;
  border-radius: 2px;
  border: 1px solid #babec5;
  width: 104px;
  left: -64px;
  top: 20px;
  /* display: none; */
}

.u-option-item {
  padding: 5px 10px;
  white-space: nowrap;
  transition: all 0.2s ease;
  z-index: 1000;
  text-align: left;
  width: 100%;
  min-width: 100px;
  font-weight: 400 !important;
}
</style>
