<template>
  <DxSelectBox
    class="m-select-box"
    :placeholder="data.placeHolder"
    :noDataText="'Không tìm thấy'"
    :searchEnabled="true"
    :showClearButton="false"
    :width="data.style.width"
    :height="data.style.height"
    :data-source="data.data.items"
    v-model="cloneModel"
  />
</template>

<script>
import DxSelectBox from "devextreme-vue/select-box";

export default {
  name: "DropdownMaster",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    model: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      cloneModel: -1,
    };
  },
  components: {
    DxSelectBox,
  },
  methods: {},
  watch: {
    /**
     *Theo dõi giá trị của bản sao và thay đổi bản gốc bên ngoài component
     * DVHAI 07/07/2021
     */
    cloneModel() {
      let value = this.data.data.items.indexOf(this.cloneModel);
      if (value == -1) value = null;
      this.$emit("changeValueInput", this.data.data.inputId, value);
    },

    /**
     *Theo dõi model và tạo ra một bản sao mới bên trong này
     * DVHAI 07/07/2021
     */
    model() {
      this.cloneModel = this.data.data.items[this.model];
    },
  },
};
</script>

<style>
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
