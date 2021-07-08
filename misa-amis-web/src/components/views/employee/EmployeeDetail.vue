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
                class="mg-r-6-px"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                @checkUnique="checkUnique"
                :model="employeeModel.employeeCode"
                :data="employeeCodeInput"
                :ref="employeeCodeInput.inputId"
                :styleObject="{ width: '155px' }"
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
                <DropdownMaster
                  :key="departmentDropdownKeyRefresh"
                  Mustvalidate="true"
                  @changeValueInput="changeValueInput"
                  :data="dropdownDepartment"
                  :model="employeeModel.departmentId"
                />
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
          <button @click="save()" class="btn btn-save-add btn-h-36 btn-green">
            Cất và thêm
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import InputLabel from '../../common/vinput/InputLabel.vue';
import DropdownMaster from '../../common/vcombobox/DropdownMaster.vue';
import EmployeeAPI from '../../../api/coponents/EmployeeAPI';
import DepartmentAPI from '../../../api/coponents/DepartmentAPI';
import RadioButtonMaster from '../../common/vradiobutton/RadioButtonMaster.vue';
import Enumeration from '../../../scripts/common/enumeration';
function initState() {
  return {
    departmentDropdownKeyRefresh: 0,
    //trạng thái của form
    isOpen: false,

    // data form
    dropdownDepartment: {
      data: {
        inputId: 'departmentId',
        placeHolder: '',
        items: null,
      },
      validation: ['required'],
      style: {
        width: '100%',
        height: '32px',
      },
    },

    dropdownPosition: {
      data: {
        inputId: 'EmployeePosition',
        placeHolder: '',
        items: ['Giám đốc', 'Fresher Web', 'DepOops', 'BA'],
        // dataType: "Enum",
        // enumName: "Gender",
      },
      style: {
        width: '100%',
        height: '32',
      },
    },

    dropdownWorkStatus: {
      data: {
        inputId: 'WorkStatus',
        placeHolder: '',
        items: ['Đang làm việc', 'Đang thử việc', 'Đã nghỉ việc'],
        // dataType: "Enum",
        // enumName: "Gender",
      },
      style: {
        width: '100%',
        height: '40px',
      },
    },

    radioButtonGender: {
      data: {
        inputId: 'gender',
        placeHolder: '',
        items: ['Nữ', 'Nam', 'Khác'],
        dataType: 'Enum',
        enumName: 'Gender',
      },
      style: {
        width: '100%',
        height: '32px',
      },
    },

    //input
    employeeCodeInput: {
      inputId: 'employeeCode',
      labelText: 'Mã',
      isRequired: true,
      inputType: 'text',
      validation: ['required', 'minLength:3'],
      mask: '',
      isUnique: true,
    },

    employeeNameInput: {
      inputId: 'employeeName',
      labelText: 'Tên',
      isRequired: true,
      inputType: 'text',
      validation: ['required'],
      mask: '',
    },

    addressInput: {
      inputId: 'address',
      labelText: 'Địa chỉ',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    dateOfBirthInput: {
      inputId: 'dateOfBirth',
      labelText: 'Ngày sinh',
      inputType: 'date',
      dataType: 'Date',
      validation: [],
      mask: '',
    },

    identityNumberInput: {
      inputId: 'identityNumber',
      labelText: 'Số CMND',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    identityDateInput: {
      inputId: 'identityDate',
      labelText: 'Ngày cấp',
      inputType: 'date',
      dataType: 'Date',
      validation: [],
      mask: '',
    },

    identityPlaceInput: {
      inputId: 'identityPlace',
      labelText: 'Nơi cấp',
      inputType: 'text',
      validation: [],
      mask: '',
    },

    employeePositionInput: {
      inputId: 'employeePosition',
      labelText: 'Chức danh',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    emailInput: {
      inputId: 'email',
      labelText: 'Email',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
      dataType: 'Email',
    },

    phoneNumberInput: {
      inputId: 'phoneNumber',
      labelText: 'DT di động',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    telephoneNumberInput: {
      inputId: 'pelephoneNumber',
      labelText: 'DT cố định',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    bankAccountNumberInput: {
      inputId: 'bankAccountNumber',
      labelText: 'Tài khoản ngân hàng',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    bankNameInput: {
      inputId: 'bankName',
      labelText: 'Tên ngân hàng',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    bankBranchNameInput: {
      inputId: 'bankBranchName',
      labelText: 'Chi nhánh',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    employeeModel: {},
    allInputValid: true,
  };
}

export default {
  name: 'EmployeeDetail',
  components: {
    InputLabel,
    DropdownMaster,
    RadioButtonMaster,
  },
  props: {},
  data() {
    return initState();
  },
  mounted() {},
  created() {
    //Lấy dữ liệu phòng ban
    this.getAllDepartments();
    //Lắng nghe sự kiện xem tất cả các trường validate thế nào
    this.$bus.on('allInputValid', (value) => {
      this.allInputValid = value;
    });
  },
  methods: {
    /**
     * Láy tất cả phòng ban
     * DVHAI 08/07/2021
     */
    getAllDepartments() {
      DepartmentAPI.getAll()
        .then((response) => {

          let list = [];
          for(let item of response.data) {
            list.push({'key':item.departmentId, 'value': item.departmentName});
          }            

          this.dropdownDepartment.data.items = list;
          this.departmentDropdownKeyRefresh = 1;

          console.log(list)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * Open overlay
     * DVHAI 08/07/2021
     */
    openOverlay() {
      this.displayOverlay = !this.displayOverlay;
    },

    /**
     * Open DialogConfirmStoptyping
     * DVHAI 08/07/2021
     */
    openDialogConfirmStoptyping() {
      this.$emit('openDialogConfirmStoptyping');
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
      this.$bus.emit('invokeOverlay');
    },

    /**
     * Open form
     * DVHAI 08/07/2021
     */
    async openForm(item) {
      let cloneItem = null;
      if (item) cloneItem = JSON.parse(JSON.stringify(item));

      this.resetWindow();
      if (this.formMode == Enumeration.FormMode.Edit) {
        this.bindDataForm(cloneItem);
      } else if (this.formMode == Enumeration.FormMode.Add) {
        this.employeeModel.employeeCode = await this.getNewEmployeeCode();
      } else if (this.formMode == Enumeration.FormMode.Duplicate) {
        await this.bindDataForm(cloneItem);
        this.employeeModel.employeeCode = await this.getNewEmployeeCode();
      } else {
        //
      }

      this.isOpen = true;
      this.invokeOverlay();
    },

    /**
     * Lấy mã nhân viên mới
     * DVHAI 08/07/2021
     */
    async getNewEmployeeCode() {
      let employeeCode = '';

      await EmployeeAPI.getNextEmployeeCode()
        .then(function(response) {
          employeeCode = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$bus.emit('openToast', {
            type: 'toast--info',
            text: 'Không thể tạo mã',
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

      await EmployeeAPI.getById(id)
        .then((response) => {
          emp = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.closeForm();
          this.$bus.emit('openToast', {
            type: 'toast--error',
            text: 'Lỗi. Vui lòng liên hệ MISA',
          });
        });

      return emp;
    },

    /**
     * Lưu dữ liệu
     * DVHAI 08/07/2021
     */
    async saveAndClose() {
      await this.save();
      // this.closeForm();
    },

    /**
     * Lưu dữ liệu
     * DVHAI 08/07/2021
     */
    async save() {
      //validate tất cả các trường
      await this.validateAll();

      alert(this.allInputValid);
      //hợp lệ
      if (this.allInputValid) {
        //Là form thêm hoặc tạo bản sao
        if (
          this.formMode == Enumeration.FormMode.Add ||
          this.formMode == Enumeration.FormMode.Duplicate
        ) {
          console.log(this.employeeModel);
          EmployeeAPI.insert(this.employeeModel)
            .then((response) => {
              console.log(response);
              this.refreshGrid();
              this.$bus.emit('openToast', {
                type: 'toast--success',
                text: 'Thêm nhân viên thành công',
              });
            })
            .catch((error) => {
              console.log(error);
              this.$bus.emit('openToast', {
                type: 'toast--error',
                text: 'Lỗi. Vui lòng liên hệ MISA',
              });
            });
        } else if (this.formMode == Enumeration.FormMode.Edit) {
          //Là form sửa
          EmployeeAPI.update(this.employeeModel.employeeId, this.employeeModel)
            .then((response) => {
              console.log(response);
              this.refreshGrid();
              this.$bus.emit('openToast', {
                type: 'toast--success',
                text: 'Sửa nhân viên thành công',
              });
            })
            .catch((error) => {
              console.log(error);
              this.$bus.emit('openToast', {
                type: 'toast--error',
                text: 'Lỗi. Vui lòng liên hệ MISA',
              });
            });
        }
      }
    },
    /**
     * Làm mới dữ liệu
     * DVHAI 08/07/2021
     */
    refreshGrid() {
      this.$emit('refreshGrid');
    },

    /**
     * Thay đổi dữ liệu model được gọi bởi các thành phần con
     * DVHAI 08/07/2021
     */
    changeValueInput(key, value) {
      this.employeeModel[key] = value;
    },

    /**
     * Kiểm tra tất cả các input
     * DVHAI 08/07/2021
     */
    validateAll() {
      this.allInputValid = true;
      var elValidate = this.$refs.formGroup.querySelectorAll('[MustValidate]');

      for (const el of elValidate) {
        el.querySelector('.focus').focus();
        el.querySelector('.focus').blur();
      }
    },

    /**
     * Kiểm tra giá trị duy nhất
     * DVHAI 08/07/2021
     */
    async checkUnique(key, value) {
      // let isUnique = true;
      // //api
      // await EmployeeAPI.getEmployeeBycode(1, 0, value)
      //   .then((response) => {
      //     if (
      //       response.status != 204 &&
      //       this.employeeModel.employeeId != response.data.Data[0].employeeId
      //     ) {
      //       isUnique = false;
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     isUnique = true;
      //   });
      // this.$refs[key].changeUniqueState(isUnique);
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
@import url('../../../assets/css/views/employee/EmployeeDetail.css');
</style>
