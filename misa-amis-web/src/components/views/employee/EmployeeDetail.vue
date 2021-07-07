<template>
  <transition name="slide">
    <div v-if="isOpen" class="popup__form">
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
                class="mg-r-6-px"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                @checkUnique="checkUnique"
                :model="employeeModel.EmployeeCode"
                :data="employeeCodeInput"
                :ref="employeeCodeInput.inputId"
                :styleObject="{ width: '155px' }"
              />

              <InputLabel
                class="flex-1"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.FullName"
                :data="employeeNameInput"
                :styleObject="{}"
              />
            </div>

            <div class="body-row">
              <div class="row__item flex-1">
                <label for="">Đơn vị <span class="color-red">*</span> </label>
                <DropdownMaster
                  @changeValueInput="changeValueInput"
                  :data="dropdownDepartment"
                  :model="employeeModel.DepartmentId"
                />
              </div>
            </div>

            <div class="body-row">
              <InputLabel
                class="flex-1"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.EmployeePosition"
                :data="employeePositionInput"
                :styleObject="{ width: '100%' }"
              />
            </div>
          </div>
          <div class="body__topright">
            <div class="body-row">
              <InputLabel
                class="mg-r-6-px"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.DateOfBirth"
                :data="dateOfBirthInput"
              />

              <!-- Giới tính -->
              <div class="row__item flex-1 padding-left-10">
                <label for="">Giới tính</label>
                <RadioButtonMaster
                  MustValidate="true"
                  @changeValueInput="changeValueInput"
                  :model="employeeModel.Gender"
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
                :model="employeeModel.IdentityNumber"
                :data="identityNumberInput"
              />

              <InputLabel
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.IdentityDate"
                :data="identityDateInput"
              />
            </div>

            <div class="body-row">
              <InputLabel
                class="flex-1"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.IdentityPlace"
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
              :model="employeeModel.Address"
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
              :model="employeeModel.PhoneNumber"
              :data="phoneNumberInput"
              :ref="phoneNumberInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.TelephoneNumber"
              :data="telephoneNumberInput"
              :ref="telephoneNumberInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.Email"
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
              :model="employeeModel.BankAccountNumber"
              :data="bankAccountNumberInput"
              :ref="bankAccountNumberInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.BankName"
              :data="bankNameInput"
              :ref="bankNameInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.BankBranchName"
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
            class="btn bgcolor-fff btn-size-default btn-border-default btn-h-36 btn-save"
          >
            Cất
          </button>
          <button class="btn btn-save-add btn-h-36 btn-green">
            Cất và thêm
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import InputLabel from "../../common/vinput/InputLabel.vue";
import DropdownMaster from "../../common/vcombobox/DropdownMaster.vue";
import EmployeeAPI from "../../../api/coponents/EmployeeAPI";
import RadioButtonMaster from "../../common/vradiobutton/RadioButtonMaster.vue";
function initState() {
  return {
    //trạng thái của form
    isOpen: false,

    // data form
    dropdownDepartment: {
      data: {
        inputId: "DepartmentId",
        placeHolder: "",
        items: [
          "Phòng nhân sự",
          "Phòng kế toán",
          "Phòng kinh doanh",
          "Phòng sản xuất",
        ],
      },
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

    dropdownWorkStatus: {
      data: {
        inputId: "WorkStatus",
        placeHolder: "",
        items: ["Đang làm việc", "Đang thử việc", "Đã nghỉ việc"],
        // dataType: "Enum",
        // enumName: "Gender",
      },
      style: {
        width: "100%",
        height: "40px",
      },
    },

    radioButtonGender: {
      data: {
        inputId: "Gender",
        placeHolder: "",
        items: ["Nữ", "Nam", "Khác"],
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
      inputId: "EmployeeCode",
      labelText: "Mã",
      isRequired: true,
      inputType: "text",
      validation: ["required", "minLength:3"],
      mask: "",
      isUnique: true,
    },

    employeeNameInput: {
      inputId: "EmployeeName",
      labelText: "Tên",
      isRequired: true,
      inputType: "text",
      validation: ["required"],
      mask: "",
    },

    addressInput: {
      inputId: "Address",
      labelText: "Địa chỉ",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    dateOfBirthInput: {
      inputId: "DateOfBirth",
      labelText: "Ngày sinh",
      inputType: "date",
      dataType: "Date",
      validation: [],
      mask: "",
    },

    identityNumberInput: {
      inputId: "IdentityNumber",
      labelText: "Số CMND",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    identityDateInput: {
      inputId: "IdentityDate",
      labelText: "Ngày cấp",
      inputType: "date",
      dataType: "Date",
      validation: [],
      mask: "",
    },

    identityPlaceInput: {
      inputId: "IdentityPlace",
      labelText: "Nơi cấp",
      inputType: "text",
      validation: [],
      mask: "",
    },

    employeePositionInput: {
      inputId: "EmployeePosition",
      labelText: "Chức danh",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    emailInput: {
      inputId: "Email",
      labelText: "Email",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
      dataType: "Email",
    },

    phoneNumberInput: {
      inputId: "PhoneNumber",
      labelText: "DT di động",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    telephoneNumberInput: {
      inputId: "TelephoneNumber",
      labelText: "DT cố định",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    bankAccountNumberInput: {
      inputId: "BankAccountNumber",
      labelText: "Tài khoản ngân hàng",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    bankNameInput: {
      inputId: "BankName",
      labelText: "Tên ngân hàng",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    bankBranchNameInput: {
      inputId: "BankBranchName",
      labelText: "Chi nhánh",
      isRequired: false,
      inputType: "text",
      validation: [],
      mask: "",
    },

    employeeModel: {},
    formMode: null,
    allInputValid: true,
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
    this.$bus.on("allInputValid", (value) => {
      this.allInputValid = value;
    });
  },
  methods: {
    /**
     * Open overlay
     * DVHAI 21/06/2021
     */
    openOverlay() {
      this.displayOverlay = !this.displayOverlay;
    },

    /**
     * Open DialogConfirmStoptyping
     * DVHAI 21/06/2021
     */
    openDialogConfirmStoptyping() {
      this.$emit("openDialogConfirmStoptyping");
    },

    /**
     * Reset all fields
     * DVHAI 14/06/2021
     */
    resetWindow() {
      Object.assign(this.$data, initState());
    },

    /**
     * Close form
     * DVHAI 11/06/2021
     */
    closeForm() {
      this.isOpen = false;
      this.invokeOverlay();
    },

    /**
     * Invoke overlay
     * DVHAI 14/06/2021
     */
    invokeOverlay() {
      this.$bus.emit("invokeOverlay");
    },

    /**
     * Open form
     * DVHAI 14/06/2021
     */
    async openForm(item) {
      this.resetWindow();
      //form mode: null ? add : edit
      if (item != null) {
        this.bindDataForm(item);
        this.formMode = item.EmployeeId;
      } else {
        // this.employeeModel.EmployeeCode = await this.getNewEmployeeCode();
      }

      this.invokeOverlay();

      this.isOpen = true;
    },

    /**
     * Get new employee code
     * DVHAI 14/06/2021
     */
    async getNewEmployeeCode() {
      let employeeCode = "";

      await EmployeeAPI.getNewEmployeecode()
        .then(function(response) {
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
     * Bind data to edit form
     * DVHAI 14/06/2021
     */
    async bindDataForm(item) {
      //Get record by id
      this.employeeModel = await this.getEmployeeById(item.EmployeeId);
    },

    /**
     * Get record by id
     * DVHAI 14/06/2021
     */
    async getEmployeeById(id) {
      let emp = null;

      await EmployeeAPI.getById(id)
        .then((response) => {
          emp = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.closeForm();
          this.$bus.emit("openToast", {
            type: "toast--error",
            text: "Lỗi. Vui lòng liên hệ MISA",
          });
        });

      return emp;
    },

    async save() {
      //validate all fields
      await this.validateAll();

      //is valid
      if (this.allInputValid) {
        //is formadd
        if (this.formMode == null) {
          EmployeeAPI.insert(this.employeeModel)
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
            });
        } else {
          //is formedit
          EmployeeAPI.update(this.employeeModel.EmployeeId, this.employeeModel)
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
            });
        }
      }
    },
    /**
     * Refresh grid
     * DVHAI 14/06/2021
     */
    refreshGrid() {
      this.$emit("refreshGrid");
    },

    /**
     * Change value input called by inputlabel
     * compoment
     * DVHAI 14/06/2021
     */
    changeValueInput(key, value) {
      this.employeeModel[key] = value;
    },

    /**
     * Check all input
     * DVHAI 14/06/2021
     */
    validateAll() {
      this.allInputValid = true;
      var elValidate = this.$refs.formGroup.querySelectorAll("[MustValidate]");

      for (const el of elValidate) {
        el.querySelector(".focus").focus();
        el.querySelector(".focus").blur();
      }
    },

    /**
     * Check unique value
     * DVHAI 23/06/2021
     */
    async checkUnique(key, value) {
      let isUnique = true;
      //api
      await EmployeeAPI.getEmployeeBycode(1, 0, value)
        .then((response) => {
          if (
            response.status != 204 &&
            this.employeeModel.EmployeeId != response.data.Data[0].EmployeeId
          ) {
            isUnique = false;
          }
        })
        .catch((error) => {
          console.log(error);
          isUnique = true;
        });

      this.$refs[key].changeUniqueState(isUnique);
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
