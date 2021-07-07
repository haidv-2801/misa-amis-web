<template>
  <div
    class="row__item tooltip"
    :style="{ '--scale': tooltipScale, '--tooltip-message': validation.error }"
  >
    <label :for="data.inputId" v-if="data.isRequired"
      >{{ data.labelText }}<span class="color-red"> *</span></label
    >
    <label v-else>{{ data.labelText }}</label>

    <DxDateBox
      class="focus"
      :displayFormat="'dd/MM/yyyy'"
      :placeholder="'DD/MM/YYYY'"
      :useMaskBehavior="true"
      :min="'01/01/1900'"
      :height="32"
      :width="180"
      :onFocusIn="focus"
      :onFocusOut="blur"
      v-model="cloneModel"
      v-if="data.inputType == 'date'"
    />

    <!-- money mask -->
    <input
      v-else-if="data.dataType == 'money'"
      class="focus"
      :id="data.inputId"
      :type="data.inputType"
      :style="styleObject"
      :class="{
        notValidControl: !validation.isValid,
        'align-right': data.dataType == 'money',
      }"
      :placeholder="data.mask"
      @focus="focus"
      @blur="blur"
      v-model="cloneModel"
      v-mask="data.mask"
      :masked="false"
    />

    <!-- no money mask -->
    <input
      v-else
      class="focus"
      :id="data.inputId"
      :type="data.inputType"
      :style="styleObject"
      :class="{
        notValidControl: !validation.isValid,
      }"
      :placeholder="data.mask"
      @focus="focus"
      @blur="blur"
      @mouseover="raiseErrorMsg()"
      @mouseleave="hideErrorMsg()"
      v-model="cloneModel"
      v-mask="data.mask"
    />
  </div>
</template>

<script>
import validate from "../../../scripts/common/validator.js";
import CommonFn from "../../../scripts/common/common.js";

// dx datebox
import "devextreme/dist/css/dx.light.css";
import DxDateBox from "devextreme-vue/date-box";

export default {
  name: "InputLabel",
  components: {
    DxDateBox,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    model: {
      default: "",
    },
    styleObject: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.cloneModel = this.model;
  },
  data() {
    return {
      //Trạng thái validate
      validation: {
        isValid: true,
        error: "",
      },

      //(1-hiển thị lỗi, 0-ẩn lỗi)
      tooltipScale: 0,

      //Sao chép model sang một biến mới
      cloneModel: JSON.parse(JSON.stringify(this.model)),

      //Định dạng tiền
      money: {
        decimal: "",
        thousands: ".",
        prefix: "",
        suffix: " (VNĐ)",
        precision: 0,
        masked: false,
      },

      isUniqueValue: true,
    };
  },
  methods: {
    /**
     * Hiển thị lỗi khi hover
     * DVHAI 06/07/2021
     */
    raiseErrorMsg() {
      if (!this.validation.isValid) {
        this.tooltipScale = 1;
      }
    },

    /**
     * Ẩn lỗi khi mất hover
     * DVHAI 06/07/2021
     */
    hideErrorMsg() {
      this.tooltipScale = 0;
    },

    /**
     * Thay đổi trạng thái unique ở bên component cha
     * DVHAI 06/07/2021
     */
    changeUniqueState(isUnique) {
      this.isUniqueValue = isUnique;
    },

    /**
     * DVHAI 06/07/2021
     */
    focus() {
      this.tooltipScale = 0;
      this.validation.isValid = true;

      this.changeUniqueState(true);
    },

    /**
     * Blur input
     * DVHAI 06/07/2021
     */
    blur() {
      //validate tùy chỉnh
      this.validate();

      //validate duy nhất
      if (this.data.isUnique == true)
        this.validateUnique(this.data.inputId, this.cloneModel);
    },

    /**
     * Validate duy nhất
     * DVHAI 06/07/2021
     */
    validateUnique(key, value) {
      this.$emit("checkUnique", key, value);
    },

    /**
     * Validate tùy chỉnh
     * DVHAI 06/07/2021
     */
    validate() {
      for (const x of this.data.validation) {
        var cons = x.split(":"),
          validateResult =
            cons.length > 1
              ? validate[cons[0]](this.cloneModel)(cons[1])
              : validate[x](this.cloneModel);

        let errMsg = '"' + this.data.labelText + " " + validateResult.msg + '"';

        //raise error
        this.setValidateError(validateResult.isValid, errMsg);

        //error fire
        if (!validateResult.isValid) {
          this.$bus.emit("allInputValid", validateResult.isValid);
          break;
        }
      }
    },

    /**
     * Cài đặt lỗi validate
     * DVHAI 06/07/2021
     */
    setValidateError(isValid, errorMsg) {
      this.validation.isValid = isValid;
      this.validation.error = errorMsg;
      // this.tooltipScale = isValid == false ? 1 : 0;
    },
  },
  computed: {},
  watch: {
    /**
     * Thay đổi giá trị model thật bên ngoài component
     * DVHAI 06/07/2021
     */
    cloneModel() {
      //Nếu là tiền thì format
      let moneyNumber = this.cloneModel || "";

      if (this.data.dataType == "money")
        moneyNumber = CommonFn.onlyNumber(moneyNumber);

      //Thay đổi giá trị model thật bên ngoài component
      this.$emit("changeValueInput", this.data.inputId, moneyNumber);
    },

    /**
     * Sao chép dữ liệu
     * DVHAI 06/07/2021
     */
    model() {
      this.cloneModel = JSON.parse(JSON.stringify(this.model));
    },

    /**
     * Tracking unique value, if false raise error
     * DVHAI 06/07/2021
     */
    isUniqueValue: function(val) {
      let errMsg = "'" + this.data.labelText + " đã tồn tại" + "'";
      this.setValidateError(val, errMsg);
    },
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/tooltip.css");

input {
  width: 100%;
  border: 1px solid #babec5;
  border-radius: 2px;
  height: 32px;
  padding: 6px 10px;
  outline: none;
}

</style>
