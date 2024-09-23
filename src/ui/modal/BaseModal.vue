<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: { type: String, default: '' },
})
const emit = defineEmits(['close-modal'])

const dialog = ref(null)

function onBackdropClick(event) {
  if (event.target === dialog.value) {
    emit('close-modal')
  }
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      dialog.value.showModal()
    } else {
      dialog.value.close()
    }
  }
)
</script>

<template>
  <dialog ref="dialog" class="base-modal" @click="onBackdropClick">
    <div class="base-modal__header">
      <h3>{{ title }}</h3>
    </div>

    <div class="base-modal__body">
      <slot name="modal-body" />
    </div>

    <div class="base-modal__footer">
      <slot name="modal-action" :close="dialog?.close" />
    </div>
  </dialog>
</template>

<style scoped lang="scss">
@import '../../static/scss/variables/colors';

.base-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 10px;
  background: $gray-light;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow: hidden;

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: $secondary-text-color;
    height: 51px;
    background: $gray;
  }

  &__body {
  }

  &__footer {
    display: flex;
    justify-content: center;
    padding: 0px 20px 30px;
  }
}
</style>
