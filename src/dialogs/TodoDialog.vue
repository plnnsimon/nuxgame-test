<script setup>
import BaseButton from '../ui/button/BaseButton.vue'
import BaseModal from '../ui/modal/BaseModal.vue'
import { computed, ref } from 'vue'
import BaseInput from '../ui/input/BaseInput.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  message: { type: String, default: '' },
})
const emit = defineEmits(['update:visible', 'add-todo'])

const userId = ref('')
const title = ref('')

const modalVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  },
})

function addTodo() {
  emit('add-todo', { userId: userId.value, title: title.value })
}
</script>

<template>
  <BaseModal
    :visible="modalVisible"
    title="Error"
    class="todo-dialog"
    @close-modal="modalVisible = false"
  >
    <template #modal-body>
      <div class="todo-dialog__body">
        <BaseInput
          v-model:value="userId"
          title="User Id"
          placeholder="set user id"
        />

        <BaseInput
          v-model:value="title"
          title="Todo title"
          placeholder="set todo title"
        />
      </div>
    </template>

    <template #modal-action>
      <BaseButton class="btn-error" @click="addTodo"> Add todo </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
@import '../static/scss/variables/colors';

.todo-dialog {
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
    background-color: $success;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    width: 100%;
  }
}
</style>
