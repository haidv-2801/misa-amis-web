<template>
  <transition name="slide">
    <div ref="formGroup" v-if="isOpen" class="popup__form">
      <div class="form__head">
        <div class="head__left">
          <div class="head__title">Thông tin nhân viên</div>
          <div class="checkbox-option">
            <div class="tick-box icon-18 icon-src"></div>
            <span class="checkbox-text">Là khách hàng</span>
          </div>
          <div class="checkbox-option">
            <div class="tick-box icon-18 icon-src"></div>
            <span class="checkbox-text">Là nhà cung cấp</span>
          </div>
        </div>

        <div class="head__right">
          <div class="icon-src icon-24 icon-help mg-r-6-px"></div>
          <div @click="closeForm()" class="icon-src icon-24 icon-close"></div>
        </div>
      </div>
      <div class="form__body">
        <div class="body__top">
          <div class="body__topleft">
            <div class="body-row">
              <InputLabel
                id="first-focus"
                class="mg-r-6-px"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                @checkUnique="checkUnique"
                :model="employeeModel.employeeCode"
                :data="employeeCodeInput"
                :ref="employeeCodeInput.inputId"
                :styleObject="{ width: '155px' }"
                :key="key"
              />

              <InputLabel
                class="flex-1"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.employeeName"
                :data="employeeNameInput"
                :styleObject="{}"
              />
            </div>

            <div class="body-row">
              <div class="row__item flex-1">
                <label for="">Đơn vị <span class="color-red">*</span> </label>
                <div 
                Mustvalidate="true">
                  <DropdownMaster
                    @changeValueInput="changeValueInput"
                    :data="dropdownDepartment"
                    :model="employeeModel.departmentName"
                    tabindex="0"
                  />
                </div>
              </div>
            </div>

            <div class="body-row">
              <InputLabel
                class="flex-1"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.employeePosition"
                :data="employeePositionInput"
                :styleObject="{ width: '100%' }"
              />
            </div>
          </div>
          <div class="body__topright">
            <div class="body-row">
              <InputLabel
                class="mg-r-6-px"
                @changeValueInput="changeValueInput"
                :model="employeeModel.dateOfBirth"
                :data="dateOfBirthInput"
              />

              <!-- Giới tính -->
              <div class="row__item flex-1 padding-left-10">
                <label for="">Giới tính</label>
                <RadioButtonMaster
                  @changeValueInput="changeValueInput"
                  :model="employeeModel.gender"
                  :data="radioButtonGender"
                />
              </div>
              <!-- end -->
            </div>

            <div class="body-row">
              <InputLabel
                class="flex-1 mg-r-6-px"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.identityNumber"
                :data="identityNumberInput"
              />

              <InputLabel
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.identityDate"
                :data="identityDateInput"
              />
            </div>

            <div class="body-row">
              <InputLabel
                class="flex-1"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.identityPlace"
                :data="identityPlaceInput"
              />
            </div>
          </div>
        </div>
        <div class="body__bottom">
          <div class="body-row">
            <InputLabel
              class="width-100pt"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.address"
              :data="addressInput"
              :ref="addressInput.inputId"
              :styleObject="{ width: '100%' }"
            />
          </div>
          <div class="body-row">
            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.phoneNumber"
              :data="phoneNumberInput"
              :ref="phoneNumberInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.telephoneNumber"
              :data="telephoneNumberInput"
              :ref="telephoneNumberInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.email"
              :data="emailInput"
              :ref="emailInput.inputId"
              :styleObject="{ width: '197px' }"
            />
          </div>

          <div class="body-row">
            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.bankAccountNumber"
              :data="bankAccountNumberInput"
              :ref="bankAccountNumberInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.bankName"
              :data="bankNameInput"
              :ref="bankNameInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.bankBranchName"
              :data="bankBranchNameInput"
              :ref="bankBranchNameInput.inputId"
              :styleObject="{ width: '197px' }"
            />
          </div>
        </div>
        <div class="separate"></div>
      </div>
      <div class="form__bottom">
        <div class="group__button--left">
          <button
            @click="closeForm()"
            class="btn bgcolor-fff btn-cancel btn-size-default btn-border-default btn-h-36"
          >
            Hủy
          </button>
        </div>
        <div class="group__button--rigth">
          <button
            @click="saveAndClose()"
            class="btn bgcolor-fff btn-size-default btn-border-default btn-h-36 btn-save"
          >
            Cất
          </button>
          <button
            @click="saveAndClear()"
            class="btn btn-save-add btn-h-36 btn-green"
          >
            Cất và thêm
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import InputLabel from "../../common/vinput/InputLabel.vue";
import DropdownMaster from "../../common/vcombobox/DropdownMaster";
import EmployeeAPI from "../../../api/coponents/EmployeeAPI";
import DepartmentAPI from "../../../api/coponents/DepartmentAPI";
import RadioButtonMaster from "../../common/vradiobutton/RadioButtonMaster.vue";
import Enumeration from "../../../scripts/common/enumeration";
function initState() {
  return {
    //Model của nhân viên
    employeeModel: {},

    //Danh sách các lỗi để thông báo
    validateResult: [],

    //Phục vụ cho refresh một số component
    key: 0,

    //Dữ liệu sao chép từ employee model để so sánh thay đổi
    employeeOrigin: null,

    //trạng thái của form
    isOpen: false,

    // data form
    dropdownDepartment: {
      data: {
        inputId: "departmentId",
        placeHolder: "",
        labelText: "Vị trí",
        key: [],
        value: [],
      },
      validation: ["required"],
      style: {
        width: "100%",
        height: "32px",
      },
    },

    dropdownPosition: {
      data: {
        inputId: "EmployeePosition",
        placeHolder: "",
        items: ["Giám đốc", "Fresher Web", "DepOops", "BA"],
        // dataType: "Enum",
        // enumName: "Gender",
      },
      style: {
        width: "100%",
        height: "32",
      },
    },

    radioButtonGender: {
      data: {
        inputId: "gender",
        placeHolder: "",
        items: ["Nam", "Nữ", "Khác"],
        dataType: "Enum",
        enumName: "Gender",
      },
      style: {
        width: "100%",
        height: "32px",
      },
    },

    //input
    employeeCodeInput: {
      inputId: "employeeCode",
      labelText: "Mã",
      isRequired: true,
      inputType: "text",
      validation: ["required", "maxLength:20"],
      mask: "",
      isUnique: true,
    },

    employeeNameInput: {
      inputId: "employeeName",
      labelText: "Tên",
      isRequired: true,
      inputType: "text",
      validation: ["required"],
      mask: "",
    },

    addressInput: {
      inputId: "address",
      labelText: "Địa chỉ",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    dateOfBirthInput: {
      inputId: "dateOfBirth",
      labelText: "Ngày sinh",
      inputType: "date",
      dataType: "Date",
      validation: [],
      mask: "",
    },

    identityNumberInput: {
      inputId: "identityNumber",
      labelText: "Số CMND",
      isRequired: false,
      inputType: "text",
      validation: ["number", "minLength:10", "maxLength:15"],
      mask: "",
    },

    identityDateInput: {
      inputId: "identityDate",
      labelText: "Ngày cấp",
      inputType: "date",
      dataType: "Date",
      validation: [],
      mask: "",
    },

    identityPlaceInput: {
      inputId: "identityPlace",
      labelText: "Nơi cấp",
      inputType: "text",
      validation: [],
      mask: "",
    },

    employeePositionInput: {
      inputId: "employeePosition",
      labelText: "Chức danh",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    emailInput: {
      inputId: "email",
      labelText: "Email",
      isRequired: false,
      inputType: "text",
      validation: ["email"],
      mask: "",
      dataType: "Email",
    },

    phoneNumberInput: {
      inputId: "phoneNumber",
      labelText: "Điện thoại di động",
      isRequired: false,
      inputType: "text",
      validation: ["number", "minLength:8", "maxLength:15"],
      mask: "",
    },

    telephoneNumberInput: {
      inputId: "telephoneNumber",
      labelText: "Điện thoại cố định",
      isRequired: false,
      inputType: "text",
      validation: ["number", "minLength:8", "maxLength:15"],
      mask: "",
    },

    bankAccountNumberInput: {
      inputId: "bankAccountNumber",
      labelText: "Tài khoản ngân hàng",
      isRequired: false,
      inputType: "text",
      validation: ["number"],
      mask: "",
    },

    bankNameInput: {
      inputId: "bankName",
      labelText: "Tên ngân hàng",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    bankBranchNameInput: {
      inputId: "bankBranchName",
      labelText: "Chi nhánh",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },
  };
}

export default {
  name: "EmployeeDetail",
  components: {
    InputLabel,
    DropdownMaster,
    RadioButtonMaster,
  },
  props: {},
  data() {
    return initState();
  },
  created() {
    //Lắng nghe sự kiện xem tất cả các trường validate thế nào
    this.$bus.on("validateResult", (value) => {
      this.validateResult.push(value);
    });
  },
  methods: {
    /**
     * Cất và làm sạch
     * DVHAI 08/07/2021
     */
    async saveAndClear() {
      await this.save();
      if (this.validateResult.length == 0) {
        this.employeeModel = {};
        this.employeeModel.employeeCode = await this.getNewEmployeeCode();
      }
    },

    /**
     * Láy tất cả phòng ban
     * DVHAI 08/07/2021
     */
    getAllDepartments() {
      DepartmentAPI.getAll()
        .then((response) => {
          this.dropdownDepartment.data.key = response.data.map(
            (x) => x.departmentId
          );
          this.dropdownDepartment.data.value = response.data.map(
            (x) => x.departmentName
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Open DialogConfirmStoptyping
     * DVHAI 08/07/2021
     */
    openDialogConfirmStoptyping() {
      this.$emit("openDialogConfirmStoptyping");
    },

    /**
     * Reset all fields
     * DVHAI 08/07/2021
     */
    resetWindow() {
      Object.assign(this.$data, initState());
    },

    /**
     * Close form
     * DVHAI 08/07/2021
     */
    closeForm() {
      this.isOpen = false;
      this.invokeOverlay();
    },

    /**
     * Invoke overlay
     * DVHAI 08/07/2021
     */
    invokeOverlay() {
      this.$bus.emit("invokeOverlay");
    },

    /**
     * Open form
     * DVHAI 08/07/2021
     */
    async openForm(item) {
      let cloneItem = null;
      if (item) cloneItem = JSON.parse(JSON.stringify(item));

      //Làm mới dữ liệu
      this.resetWindow();

      //Lấy dữ liệu phòng ban
      this.getAllDepartments();

      //Mở overlay
      this.invokeOverlay();

      this.isOpen = true;

      if (this.formMode == Enumeration.FormMode.Edit) {
        await this.bindDataForm(cloneItem);
      } else if (this.formMode == Enumeration.FormMode.Add) {
        this.employeeModel.employeeCode = await this.getNewEmployeeCode();
        this.key += 1;
      } else if (this.formMode == Enumeration.FormMode.Duplicate) {
        await this.bindDataForm(cloneItem);
        this.employeeModel.employeeCode = await this.getNewEmployeeCode();
      } else {
        //
      }

      //Tự động focus ô đầu
      this.focusField();

      //Tạo bản sao dữ liệu để so sánh thay đổi
      this.employeeOrigin = await JSON.parse(
        JSON.stringify(this.employeeModel)
      );
    },

    /**
     * Focus ô đầu tiên
     * DVHAI 10/07/2021
     */
    focusField() {
      setTimeout(() => {
        document
          .getElementById("first-focus")
          .querySelector("input")
          .focus();
      }, 0);
    },

    /**
     * Lấy mã nhân viên mới
     * DVHAI 08/07/2021
     */
    async getNewEmployeeCode() {
      let employeeCode = "";

      await EmployeeAPI.getNextEmployeeCode()
        .then((response) => {
          employeeCode = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$bus.emit("openToast", {
            type: "toast--info",
            text: "Không thể tạo mã",
          });
        });

      return employeeCode;
    },

    /**
     * Dẩy dữ liệu lên form
     * DVHAI 08/07/2021
     */
    async bindDataForm(item) {
      //Get record by id
      this.employeeModel = await this.getEmployeeById(item.employeeId);
    },

    /**
     * Get record by id
     * DVHAI 08/07/2021
     */
    async getEmployeeById(id) {
      let emp = null;
      this.$store.commit("SET_LOADER", true);
      await EmployeeAPI.getById(id)
        .then((response) => {
          emp = response.data;
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

      return emp;
    },

    /**
     * Lưu dữ liệu
     * DVHAI 08/07/2021
     */
    async saveAndClose() {
      await this.save();

      //Nếu không có lỗi thì đóng form
      if (this.validateResult.length == 0) this.closeForm();
    },

    /**
     * Lưu dữ liệu
     * DVHAI 08/07/2021
     */
    async save() {
      //validate tất cả các trường
      await this.validateAll();

      //Nếu không có lỗi
      if (this.validateResult.length == 0) {
        //Là form thêm hoặc tạo bản sao
        if (
          this.formMode == Enumeration.FormMode.Add ||
          this.formMode == Enumeration.FormMode.Duplicate
        ) {
          this.$store.commit("SET_LOADER", true);
          await EmployeeAPI.insert(this.employeeModel)
            .then((response) => {
              console.log(response);
              this.refreshGrid();
              this.$bus.emit("openToast", {
                type: "toast--success",
                text: "Thêm nhân viên thành công",
              });
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
              this.$store.commit("SET_HASVALIDATE", false);
            });
        } else if (this.formMode == Enumeration.FormMode.Edit) {
          //Là form sửa
          this.$store.commit("SET_LOADER", true);
          EmployeeAPI.update(this.employeeModel.employeeId, this.employeeModel)
            .then((response) => {
              console.log(response);
              this.refreshGrid();
              this.$bus.emit("openToast", {
                type: "toast--success",
                text: "Sửa nhân viên thành công",
              });
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
              this.$store.commit("SET_HASVALIDATE", false);
            });
        }
      } else {
        let err = this.validateResult[0];
        if (err.errCode == Enumeration.ErrorCode.Empty) {
          this.openFormError(err);
        } else {
          this.openFormWarning(err);
        }
      }
    },

    /**
     * Mở form lỗi
     * DVHAI 08/07/2021
     */
    openFormError(data) {
      this.$emit("openFormError", data);
    },

    /**
     * Mở form cảnh báo
     * DVHAI 08/07/2021
     */
    openFormWarning(data) {
      this.$emit("openFormWarning", data);
    },

    /**
     * Làm mới dữ liệu
     * DVHAI 08/07/2021
     */
    refreshGrid() {
      this.$emit("refreshGrid");
    },

    /**
     * Thay đổi dữ liệu model được gọi bởi các thành phần con
     * DVHAI 08/07/2021
     */
    changeValueInput(key, value) {
      // console.log("Key" + key, "Value" + value);
      this.$set(this.employeeModel, key, value);
    },

    /**
     * Kiểm tra tất cả các input
     * DVHAI 08/07/2021
     */
    async validateAll() {
      this.$store.commit("SET_HASVALIDATE", true);
      this.validateResult = [];
      var elValidate = this.$refs.formGroup.querySelectorAll("[MustValidate]");

      for (const el of elValidate) {
        el.querySelector(".focus").focus();
        el.querySelector(".focus").blur();
      }

      if (this.validateResult.length == 0)
        await this.checkUnique(this.employeeModel);
    },

    /**
     * Kiểm tra giá trị duy nhất
     * DVHAI 08/07/2021
     */
    async checkUnique(value) {
      // debugger// eslint-disable-next-line
      //Kiểm tra unique ở đây
      await EmployeeAPI.getEmployeeBycode(value.employeeCode).then(
        (response) => {
          console.log(response);
          if (response.data.data != null) {
            if (this.formMode == Enumeration.FormMode.Edit) {
              if (response.data.data.employeeId != value.employeeId) {
                this.validateResult.push({
                  isValid: false,
                  error: `Mã nhân viên <${value.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`,
                  errCode: Enumeration.ErrorCode.Duplicate,
                });
              }
            } else {
               this.validateResult.push({
                  isValid: false,
                  error: `Mã nhân viên <${value.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`,
                  errCode: Enumeration.ErrorCode.Duplicate,
                });
            }
          }
        }
      );
    },

    /**
     * Kiểm tra giá trị model bên form đã thay đổi chưa để đưa ra cảnh
     * báo đóng form (employeeOrigin, employeeModel)
     * DVHAI 08/07/2021
     */
    checkValueChange() {
      let isDiff = false;

      for (const property in this.employeeOrigin) {
        let origin = { ...this.employeeOrigin[property] };
        let model = { ...this.employeeModel[property] };

        if (typeof origin == "string") origin = origin.trim();
        if (typeof model == "string") origin = origin.trim();
        if (origin == null) origin = "";
        if (model == null) origin = "";
        console.log("origin" + origin, "model" + model);

        if (origin != model) isDiff = true;
      }

      return isDiff;
    },
  },
  computed: {
    formMode() {
      return this.$store.state.formMode;
    },
  },
};
</script>

<style scoped>
.separate {
  bottom: -15px;
  position: relative;
  width: 100%;
  border-top: 1px solid #e0e0e0;
}
@import url("../../../assets/css/views/employee/EmployeeDetail.css");
</style>
