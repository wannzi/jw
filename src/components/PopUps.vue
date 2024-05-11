<template>
  <div v-if="isVisible" class="dialog-backdrop" @click.self="close">
    <div class="dialog-content" @click.stop>
      <slot></slot> <!-- 用于插入任意内容 -->
      <button @click="close">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUps',
  props: {
    id: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isVisible: this.visible
    };
  },
  watch: {
    visible(newVal) {
      this.isVisible = newVal;
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', { popupId: this.id, visible: false });    }
  }
}
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
}

.dialog-content {
  background: white;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 11;
}
</style>