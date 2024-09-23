<script setup>
import BaseInput from '../ui/input/BaseInput.vue'
import BaseButton from '../ui/button/BaseButton.vue'
import BaseModal from '../ui/modal/BaseModal.vue'

import { computed, ref } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: { type: String, default: 'Description' },
})

const emit = defineEmits(['register', 'update:visible'])

const userName = ref('')
const phone = ref('')

const validationRules = {
  userName: (val) => {
    const regex = /^[a-zA-Z]+$/
    return val !== '' ? regex.test(val) : true
  },
  phone: (val) => {
    const regex = /^[0-9+\-\(\)\s]+$/
    return val !== '' ? regex.test(val) : true
  },
}

function validateInput(val, type) {
  const rule = validationRules[type]
  if (!rule) {
    return ''
  }

  return rule(val) ? '' : 'Invalid field'
}

function registerUser() {
  emit('register', {
    userName: userName.value,
    phone: phone.value,
  })
}

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
    :title="props.title"
    class="register-dialog"
    @close-modal="modalVisible = false"
  >
    <template #modal-body>
      <div class="register-dialog__body">
        <BaseInput
          v-model:value="userName"
          :error="validateInput(userName, 'userName')"
          title="Usename"
          placeholder="Usename"
        />

        <BaseInput
          v-model:value="phone"
          :error="validateInput(phone, 'phone')"
          title="Phone"
          placeholder="Enter phone"
        />
      </div>
    </template>

    <template #modal-action>
      <BaseButton class="btn-register" @click="registerUser">
        Register
      </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
@import '../static/scss/variables/colors';

.register-dialog {
  max-width: 447px;
  min-height: 299px;

  &__body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 20px 25px;
  }

  &__footer {
  }

  .btn-register {
    background-color: $success;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    width: 100%;
  }

  .btn-register:hover {
    background-color: #45a049;
  }
}
</style>
