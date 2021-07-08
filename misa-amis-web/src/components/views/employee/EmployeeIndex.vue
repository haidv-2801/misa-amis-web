<template>
  <div class="main">
    <!-- confirm popup -->
    <DialogConfirmDel
      :data="entity"
      ref="confirmDialogDel"
      @deleteRecord="deleteRecord"
    />

    <DialogConfirmStopTyping
      :data="entity"
      ref="confirmDialogStop"
      @closeForm="closeFormEmployeeDetail"
    />

    <!-- form employee -->
    <EmployeeDetail
      @openDialogConfirmStoptyping="openDialogConfirmStoptyping"
      @refreshGrid="refreshGrid"
      ref="formEmployeeDetail"
    />

    <!-- toolbar -->
    <EmployeeToolBar @openFormEmployeeDetail="openFormEmployeeDetail" />

    <div class="body-index">
      <!-- filterbar -->
      <EmployeeFilterBar
        @changeValueFilterString="changeValueFilterString"
        @filterTable="filterTable"
        @refreshGrid="refreshGrid"
      />

      <!-- grid -->
      <Grid
        ref="Grid"
        :gridData="gridDataTable"
        @openFormDetail="openFormEmployeeDetail"
        @changePageSize="changePageSize"
        @changePageNumber="changePageNumber"
        @openConfirmDelete="openConfirmDelete"
      />
    </div>
  </div>
</template>

<script>
import EmployeeDetail from "./EmployeeDetail.vue";
import EmployeeToolBar from "./EmployeeToolBar.vue";
import EmployeeFilterBar from "./EmployeeFilterBar.vue";
import Grid from "../../common/Grid.vue";
import DialogConfirmDel from "../../common/vdialog/DialogConfirmDel.vue";
import DialogConfirmStopTyping from "../../common/vdialog/DialogConfirmStopTyping.vue";
import EmployeeAPI from "../../../api/coponents/EmployeeAPI";
// import employee from "../../../store/employeeData";

export default {
  name: "EmployeeIndex",
  components: {
    EmployeeDetail,
    EmployeeToolBar,
    EmployeeFilterBar,
    Grid,
    DialogConfirmDel,
    DialogConfirmStopTyping,
  },
  data() {
    return {
      //use for form detail
      isDisplayedEmployeeDetail: false,

      //use form cofirm log
      entity: {
        entityName: "Nhân Viên",
      },

      //use for grid
      gridDataTable: {
        column: [
          {
            fieldName: "employeeCode",
            displayName: "Mã nhân viên",
            dataType: "",
            displayType: "",
          },
          {
            fieldName: "employeeName",
            displayName: "Tên nhân viên",
            dataType: "",
            displayType: "",
          },
          {
            fieldName: "gender",
            displayName: "Giới tính",
            dataType: "Enum",
            displayType: "Gender",
          },
          {
            fieldName: "dateOfBirth",
            displayName: "Ngày sinh",
            dataType: "Date",
            displayType: "",
          },
          {
            fieldName: "identityNumber",
            displayName: "Số cmnd",
            dataType: "",
            displayType: "",
          },
          {
            fieldName: "employeePosition",
            displayName: "Chức danh",
            dataType: "",
            displayType: "",
          },
          {
            fieldName: "departmentName",
            displayName: "Tên đơn vị",
            dataType: "",
            displayType: "",
          },
          {
            fieldName: "bankAccountNumber",
            displayName: "Số tài khoản",
            dataType: "",
            displayType: "",
          },
          {
            fieldName: "bankName",
            displayName: "Tên ngân hàng",
            dataType: "",
            displayType: "",
          },
          {
            fieldName: "bankBranchName",
            displayName: "Chi nhánh tk ngân hàng",
            dataType: "",
            displayType: "",
          },
        ],
        data: [],
        pagination: {
          pageSize: 7,
          pageNumber: 1,
          totalPage: null,
          totalRecord: null,
          maximumPage: 4,
        },
      },

      //use for filterbar
      filterString: "",
    };
  },
  created() {
    /**
     * Lấy dữ liệu từ sever
     * DVHAI 07/07/2021
     */
    // this.filterTable();

    this.getDataGrid();
  },

  watch: {},

  methods: {
    /**
     * Thay đổi pagenumber
     * DVHAI 07/07/2021
     */
    changePageNumber(value) {
      this.gridDataTable.pagination.pageNumber = value;

      this.refreshGrid();
    },

    /**
     * Thay đổi pagesize
     * DVHAI 07/07/2021
     */
    changePageSize(value) {
      this.gridDataTable.pagination.pageSize = value;

      this.resetPageNumber(1);

      this.refreshGrid();
    },

    /**
     * Đặt lại pagenumber
     * DVHAI 07/07/2021
     */
    resetPageNumber(pageNumber) {
      this.gridDataTable.pagination.pageNumber = pageNumber;
    },

    /**
     * Thay đổi giá trị lọc
     * DVHAI 07/07/2021
     */
    changeValueFilterString(value) {
      this.filterString = value;
    },

    /**
     * Cấu hình dữ liệu phân trang
     * DVHAI 21/06/2021
     */
    configDataPaging() {},

    /**
     * Lấy data từ sever
     * DVHAI 13/06/2021
     */
    getDataGrid() {
      this.$bus.emit("displayLoader");
      EmployeeAPI.getAll()
        .then((response) => {
          this.gridDataTable.data = response.data;
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
          this.$bus.emit("openToast", {
            type: "toast--error",
            text: "Lỗi. Vui lòng liên hệ MISA",
          });
        })
        .finally(() => {
          this.$bus.emit("displayLoader");
        });
    },

    /**
     * Lọc
     * DVHAI 21/06/2021
     */
    filterTable() {
      // if (this.filterString.toString().length <= 0) {
      //   //get all
      //   this.filterString = "n";
      // }
      // //params: pagesize, pagenumber, filterString
      // this.$bus.emit("displayLoader");
      // EmployeeAPI.filter(
      //   this.gridDataTable.pagination.pageSize,
      //   this.gridDataTable.pagination.pageNumber - 1,
      //   this.filterString
      // )
      //   .then((response) => {
      //
      //     this.gridDataTable.pagination.totalRecord = response.data.TotalRecord;
      //     this.gridDataTable.pagination.totalPage = response.data.TotalPage;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.$bus.emit("openToast", {
      //       type: "toast--error",
      //       text: "Lỗi. Vui lòng liên hệ MISA",
      //     });
      //   })
      //   .finally(() => {
      //     this.$bus.emit("displayLoader");
      //   });
    },

    /**
     * Mở form chi tiết
     * DVHAI 07/07/2021
     */
    openFormEmployeeDetail(item) {
      //invoke openform method
      this.$refs.formEmployeeDetail.openForm(item);
    },

    /**
     * Đóng form chi tiết
     * DVHAI 07/07/2021
     */
    closeFormEmployeeDetail() {
      this.$refs.formEmployeeDetail.closeForm();
    },

    /**
     * Làm mới bảng
     * DVHAI 07/07/2021
     */
    refreshGrid() {
      this.getDataGrid();
      // this.filterTable();
    },

    /**
     * Mở popup xác nhận xóa
     * DVHAI 07/07/2021
     */
    openConfirmDelete() {
      this.$refs.confirmDialogDel.openPopup();
    },

    /**
     * Xóa bản ghi
     * DVHAI 07/07/2021
     */
    deleteRecord() {
      let entity = this.$store.state.entity;
      if (entity != null) {
        let id = entity.employeeId;
        EmployeeAPI.delete(id)
          .then((response) => {
            console.log(response);
            this.$bus.emit("openToast", {
              type: "toast--success",
              text: "Xóa thành công Nhân Viên",
            });

            //Gán lại thực thể trong store bằng null
            this.$store.commit("SET_ENTITY", null);

            this.refreshGrid();
          })
          .catch((error) => {
            console.log(error);
            this.$bus.emit("openToast", {
              type: "toast--error",
              text: "Lỗi. Vui lòng liên hệ MISA",
            });
          });
      }
    },

    /**
     * Mở form cảnh báo thay đổi dữ liệu
     * DVHAI 07/07/2021
     */
    openDialogConfirmStoptyping() {
      this.$refs.confirmDialogStop.openPopup();
    },
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/main.css");
</style>
