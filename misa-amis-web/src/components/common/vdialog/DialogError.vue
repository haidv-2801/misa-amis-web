<template>
  <BaseDialog v-if="isShow">
    <template #alert__icon>
      <div class="icon-error icon-48 icon-src"></div>
    </template>
    <template #alert__text>
      <span
        >{{ propertyValue }} không được để trống</span
      >
    </template>
    <template #alert__foot>
      <div class="group__button">
        <button
          @click="cancel()"
          class="btn btn-h-36 btn-green btn-save-add"
        >
          Đóng
        </button>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue';

export default {
  name: 'DialogError',
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
      let me = code;
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
      return this.data.propertyName;
    },
  },
};
</script>

<style scoped>
.icon-error {
    background-position: -24px -954px;
}

.group__button {
  display: flex;
  justify-content: center;
}

.icon-warning {
  background-position: -592px -456px;
}

</style>
