<template>
  <BaseDialog v-if="isShow">
    <template #alert__icon>
      <div class="icon-warning icon-48 icon-src"></div>
    </template>
    <template #alert__text>
      <span
        >{{ propertyName }} {{ propertyValue }} đã tồn tại trong hệ thống, vui
        lòng kiểm tra lại.</span
      >
    </template>
    <template #alert__foot>
      <div class="group__button">
        <button
          @click="cancel()"
          class="btn btn-h-36 btn-green btn-save-add"
        >
          Đồng ý
        </button>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue';

export default {
  name: 'DialogWarning',
  props: {
    data: {
      type: Object,
      default: () => {
        return { propertyName: 'Mã nhân viên', propertyValue: 'NV-0001' };
      },
    },
  },
  components: {
    BaseDialog,
  },
  data() {
    return {
      //Trạng thái của popup
      isShow: false,
    };
  },
  methods: {
    /**
     * Mở popup
     * DVHAI 07/07/2021
     */
    openPopup(code) {
      this.isShow = true;
      this.invokeOverlay();
    },

    /**
     * Đóng popup
     * DVHAI 07/07/2021
     */
    closePopup() {
      this.isShow = false;
      this.invokeOverlay();
    },

    /**
     * Không làm gì cả
     * DVHAI 07/07/2021
     */
    cancel() {
      this.closePopup();
      //alert success
    },

    /**
     * Gọi lớp phủ
     * DVHAI 07/07/2021
     */
    invokeOverlay() {
      this.$bus.emit('invokeOverlay');
    },
  },

  computed: {
    propertyName() {
      return this.data.propertyValue;
    },

    propertyValue() {
      return '<' + this.data.propertyName + '>';
    },
  },
};
</script>

<style scoped>
.group__button {
  display: flex;
  justify-content: flex-end;
}

.icon-warning {
  background-position: -592px -456px;
}

.btn__cancel {
  color: black !important;
  background-color: #f4f4f4 !important;
}

.btn__delete {
  background-color: #f65454 !important;
}

.btn__delete:hover {
  opacity: 0.9;
}

.btn__delete,
.btn__cancel {
  cursor: pointer;
  margin-left: 10px;
  width: 100px;
  text-align: center;
}

.btn__cancel:hover {
  background-color: #e9ebee !important;
}
</style>
