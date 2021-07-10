<template>
  <DxSelectBox
    class="m-select-box focus"
     placeholder=""
    :height="32"
    :width="200"
    :showClearButton="false"
    :data-source="cloneDataSource"
    v-model="cloneModel"
  />
</template>

<script>
import DxSelectBox from 'devextreme-vue/select-box';
export default {
  name: 'DropdownNormal',
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
      default: '',
    },
  },
  created() {
    // //Sao chép model sang một biến mới
    // this.cloneModel = JSON.parse(JSON.stringify(this.model));
    // //Sao chép datasource sang một biến mới
    // this.cloneDataSource = JSON.parse(JSON.stringify(this.data));
  },
  data() {
    return {
      //Sao chép datasource sang một biến mới
      cloneDataSource: [
        "10 bản ghi trên 1 trang",
        "20 bản ghi trên 1 trang",
        "30 bản ghi trên 1 trang",
        "50 bản ghi trên 1 trang",
        "100 bản ghi trên 1 trang",
      ],

        //Sao chép model sang một biến mới
      cloneModel: "10 bản ghi trên 1 trang",
    };
  },

  methods: {
    
  },

  watch: {
    /**
     *Theo dõi giá trị của bản sao và thay đổi bản gốc bên ngoài component
     * DVHAI 07/07/2021
     */
    cloneModel() {
      // let index = this.cloneDataSource.data.value.indexOf(this.cloneModel),
      //   value = this.cloneDataSource.data.key[index];

      // this.$emit('changeValueInput', this.cloneDataSource.data.inputId, value);
    },

    /**
     *Theo dõi model và tạo ra một bản sao mới bên trong này
     * DVHAI 07/07/2021
     */
    model() {
      // this.cloneModel = JSON.parse(JSON.stringify(this.model));
    },

    /**
     * Theo dõi dữ liệu trong prop và sao chép
     * sang một biến mới
     * DVHAI 07/07/2021
     */
    data: {
      deep: true,
      handler: function(value) {
        if (value) {
          // this.cloneDataSource = JSON.parse(JSON.stringify(value));

          // //Lấy vị trí của bên hiển thị và ánh xạ sang mã
          // let index = value.data.value.indexOf(this.cloneModel),
          //   val = value.data.key[index];

          // //Thay đổi giá trị model bên component cha
          // this.$emit('changeValueInput', value.data.inputId, val);
        }
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
   /* border: 1px solid red;  */
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
