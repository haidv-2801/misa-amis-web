<template>
  <div class="grid">
    <!-- Bảng dữ liệu -->
    <div class="main__grid">
      <table>
        <thead>
          <tr>
            <th>
              <div
                @click="toggleCheckAll(0)"
                :class="{ 'icon-checkbox-active': checked == 0 }"
                class="tick-box icon-16 icon"
              ></div>
            </th>
            <th
              v-for="(item, index) in data.column"
              :key="index"
              :class="{
                'align-right': item.dataType == Resource.DataTypeColumn.Number,
                'align-center': item.dataType == Resource.DataTypeColumn.Date,
              }"
            >
              {{ item.displayName }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in data.data"
            :key="index"
            :class="{ active: multiSelectList.includes(index) }"
            @click.exact="selectRow(index)"
            @click.ctrl="multiSelectRow(index)"
          >
            <td>
              <div
                @click="toggleCheckAll(index + 1)"
                :class="{
                  'icon-checkbox-active': checked == 0 || checked == index + 1,
                }"
                class="tick-box icon-16 icon"
              ></div>
            </td>
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
      multiSelectList: [0],

      //Vị trí ô checkbox được check (0-checked tất cả)
      checked: -1,
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
  background-color: #f8f8f8;
}

.main__grid {
  position: relative;
  overflow: auto;
  width: 100%;
  height: calc(100vh - 269px);
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
  min-width: 125px;
  max-width: 250px;

  height: 47px;
  padding: 5px 10px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
}
/* i */
table {
  width: 100%;
  border-spacing: 0;
}

table tbody tr {
  cursor: pointer;
  height: 47px;
}

table tbody tr:hover {
  background: #f3f8f8 !important;
}

table thead tr {
  background-color: var(--color-main-background);
}

table th {
  height: 34px;
  line-height: 34px;
  text-transform: uppercase;
  position: sticky;
  background-color: #eceef1;
  top: 0;
  font-size: 12px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
  white-space: nowrap;
  padding: 0 10px;
  text-align: left;
  max-width: 250px;
}

.grid {
  padding: 0 16px;
}

.icon-checkbox-active {
  background-position: -1224px -360px;
}

.icon-16 {
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
}

.tick-box {
  background-color: #fff;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid rgb(175, 175, 175);
}
</style>
