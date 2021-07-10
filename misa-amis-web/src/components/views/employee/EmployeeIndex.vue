<template>
  <div class="main">
    <!-- confirm popup -->
    <DialogConfirmDel
      :data="entity"
      ref="confirmDialogDel"
      @deleteRecord="deleteRecord"
    />
    <!-- warning popup -->
    <DialogWarning ref="formWarning" />

    <!-- Error popup -->
    <DialogError ref="formError" />

    <DialogConfirmStopTyping
      :data="entity"
      ref="confirmDialogStop"
      @closeForm="closeFormEmployeeDetail"
    />

    <!-- form employee -->
    <EmployeeDetail
      @openDialogConfirmStoptyping="openDialogConfirmStoptyping"
      @openFormError="openFormError"
      @openFormWarning="openFormWarning"
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
import DialogWarning from "../../common/vdialog/DialogWarning.vue";
import DialogError from "../../common/vdialog/DialogError.vue";
import DialogConfirmStopTyping from "../../common/vdialog/DialogConfirmStopTyping.vue";
import EmployeeAPI from "../../../api/coponents/EmployeeAPI";

export default {
  name: "EmployeeIndex",
  components: {
    EmployeeDetail,
    EmployeeToolBar,
    EmployeeFilterBar,
    Grid,
    DialogConfirmDel,
    DialogConfirmStopTyping,
    DialogWarning,
    DialogError,
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
          pageSize: 10,
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

     this.refreshGrid();

    /**
     * Lấy dữ liệu từ sever
     * DVHAI 07/07/2021
     */
    // this.getDataGrid();
  },

  watch: {},

  methods: {
    /**
     * Thay mở form lỗi
     * DVHAI 07/07/2021
     */
    openFormError(data) {
      this.$refs.formError.openPopup(data);
    },

    /**
     * Thay mở form cảnh báo
     * DVHAI 07/07/2021
     */
    openFormWarning(data) {
      this.$refs.formWarning.openPopup(data);
    },
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
      this.$store.commit("SET_LOADER", true);
      EmployeeAPI.getAll()
        .then((response) => {
          this.gridDataTable.data = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$bus.emit("openToast", {
            type: "toast--error",
            text: "Lỗi. Vui lòng liên hệ MISA",
          });
        })
        .finally(() => {
          this.$store.commit("SET_LOADER", false);
        });

      EmployeeAPI.getEmployeesFilterPaging(
        this.gridDataTable.pagination.pageSize,
        this.gridDataTable.pagination.pageNumber
      );
    },

    /**
     * Lọc
     * DVHAI 21/06/2021
     */
    filterTable() {
      //params: pagesize, pagenumber, filterString
      //Lấy danh sách lọc + phân trang
      EmployeeAPI.getEmployeesFilterPaging(
        this.gridDataTable.pagination.pageSize,
        this.gridDataTable.pagination.pageNumber,
        this.filterString
      )
        .then((response) => {
          this.gridDataTable.data = response.data.data.data;
          this.gridDataTable.pagination.totalRecord = response.data.data.totalRecord;
          this.gridDataTable.pagination.totalPage = response.data.data.totalPage;
        })
        .catch((error) => {
          console.log(error);
          this.$bus.emit("openToast", {
            type: "toast--error",
            text: "Lỗi. Vui lòng liên hệ MISA",
          });
        })
        .finally(() => {
          this.$store.commit("SET_LOADER", false);
        });
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
        // this.getDataGrid();
      this.filterTable();
    },

    /**
     * Mở popup xác nhận xóa
     * DVHAI 07/07/2021
     */
    openConfirmDelete(item) {
      this.$refs.confirmDialogDel.openPopup(item.employeeCode);
    },

    /**
     * Xóa bản ghi
     * DVHAI 07/07/2021
     */
    deleteRecord() {
      //Lấy thực thể cần xóa từ store
      let entity = this.$store.state.entity;

      //Nếu khác null chứng tỏ tồn tại cần xóa
      if (entity != null) {
        let id = entity.employeeId;
        this.$store.commit("SET_LOADER", true);
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

  computed: {
    pageSize() {
      return this.$store.state.pageSize;
    },

    pageNumber() {
      return this.$store.state.pageNumber;
    },

    filterValue() {
      return this.$store.state.filterValue;
    },
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/main.css");
</style>
