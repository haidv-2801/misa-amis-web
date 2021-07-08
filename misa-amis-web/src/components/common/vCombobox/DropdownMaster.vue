<template>
  <div
    class="tooltip"
    :style="{ '--scale': tooltipScale, '--tooltip-message': validation.error }"
    @mouseover="raiseErrorMsg()"
    @mouseleave="hideErrorMsg()"
  >
    <DxSelectBox
      class="m-select-box focus"
      :placeholder="cloneDataSource.placeHolder"
      :noDataText="'Không tìm thấy'"
      :searchEnabled="true"
      :showClearButton="false"
      :width="cloneDataSource.style.width"
      :height="cloneDataSource.style.height"
      :data-source="cloneDataSource.data.value"
      v-model="cloneModel"
      :onFocusIn="focus"
      :onFocusOut="blur"
    />
  </div>
</template>

<script>
import DxSelectBox from "devextreme-vue/select-box";
import validate from "../../../scripts/common/validator.js";
export default {
  name: "DropdownMaster",
  components: {
    DxSelectBox,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    model: {
      type: String,
      default: "",
    },
  },
  created() {
    //Sao chép model sang một biến mới
    this.cloneModel = JSON.parse(JSON.stringify(this.model));
    //Sao chép datasource sang một biến mới
    this.cloneDataSource = JSON.parse(JSON.stringify(this.data));
  },
  data() {
    return {
      //Sao chép model sang một biến mới
      cloneModel: JSON.parse(JSON.stringify(this.model)),
      //Sao chép datasource sang một biến mới
      cloneDataSource: JSON.parse(JSON.stringify(this.data)),

      //Trạng thái validate
      validation: {
        isValid: true,
        error: "",
      },

      //(1-hiển thị lỗi, 0-ẩn lỗi)
      tooltipScale: 0,
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
     * DVHAI 06/07/2021
     */
    focus() {
      this.tooltipScale = 0;
      this.validation.isValid = true;
    },

    /**
     * Blur input
     * DVHAI 06/07/2021
     */
    blur() {
      //validate tùy chỉnh
      // this.validate();
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
    },
  },

  watch: {
    /**
     *Theo dõi giá trị của bản sao và thay đổi bản gốc bên ngoài component
     * DVHAI 07/07/2021
     */
    cloneModel() {
      let index = this.cloneDataSource.data.value.indexOf(this.cloneModel),
        value = this.cloneDataSource.data.key[index];

      this.$emit("changeValueInput", this.cloneDataSource.data.inputId, value);
      // console.log(this.cloneModel, this.cloneDataSource.data.value)
    },
    /**
     *Theo dõi model và tạo ra một bản sao mới bên trong này
     * DVHAI 07/07/2021
     */
    model() {
      this.cloneModel = JSON.parse(JSON.stringify(this.model));
    },

    data: {
      deep: true,
      handler: function(value) {
        this.cloneDataSource = JSON.parse(JSON.stringify(value));

       let index = value.data.value.indexOf(this.cloneModel),
        val = value.data.key[index];
        this.$emit("changeValueInput", value.data.inputId, val);
      },
    },
  },
  computed: {},
};
</script>

<style>
/* @import url('../../../assets/css/common/tooltip.css'); */
.m-select-box .dx-texteditor-input {
  padding: 6px 10px;
}

.dx-texteditor.dx-editor-outlined {
  border-radius: 2px;
}

.dx-dropdowneditor-icon {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}

.m-select-box .dx-state-hover {
  background-color: #e0e0e0;
}

.dx-list-item.dx-state-active {
  background-color: transparent !important;
  color: inherit !important;
}

.dx-dropdowneditor-button.dx-state-active .dx-dropdowneditor-icon,
.dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon {
  background-color: transparent;
}

.dx-texteditor.dx-editor-outlined {
  border: 1px solid #babec5;
}

.m-select-box.dx-texteditor.dx-editor-outlined {
  border: 1px solid var(--color-border-input);
}

/* toan */
.dx-selectbox-popup-wrapper
  .dx-item.dx-list-item.dx-state-active
  .dx-item-content.dx-list-item-content,
.dx-selectbox-popup-wrapper
  .dx-item.dx-list-item.dx-list-item-selected
  .dx-item-content.dx-list-item-content {
  color: #35bf22 !important;
  background-color: #ebedf0;
  border: 0;
}
.dx-selectbox-popup-wrapper
  .dx-item.dx-list-item.dx-state-hover
  .dx-item-content.dx-list-item-content {
  background-color: #ebedf0;
  border: 0;
}

.dx-selectbox-popup-wrapper .dx-state-focused {
  border: none !important;
  outline: none !important;
  background-color: #ebedf0 !important;
  color: inherit !important;
}
</style>
