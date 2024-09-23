<script setup>
import BaseButton from '../ui/button/BaseButton.vue'
import BaseModal from '../ui/modal/BaseModal.vue'
import { computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  message: { type: String, default: '' },
})
const emit = defineEmits(['update:visible'])

const modalVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  },
})
</script>

<template>
  <BaseModal
    :visible="modalVisible"
    title="Error"
    class="error-dialog"
    @close-modal="modalVisible = false"
  >
    <template #modal-body>
      <div class="error-dialog__body">
        {{ props.message }}
      </div>
    </template>

    <template #modal-action="{ close }">
      <BaseButton class="btn-error" @click="close()"> Close </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
@import '../static/scss/variables/colors';

.error-dialog {
  max-width: 447px;

  &__header {
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 20px 25px;
  }

  &__footer {
  }

  .btn-error {
    background-color: $error;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    width: 100%;
  }
}
</style>
