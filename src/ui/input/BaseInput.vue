<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: '', required: false },
  type: { type: String, default: 'text', required: false },
  error: { type: String, default: '', required: false },
  value: { type: String, default: '' },
})
const emit = defineEmits(['update:value'])

const localValue = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('update:value', value)
  },
})
</script>

<template>
  <div class="input">
    <label class="input__label" for="input">{{ props.label }}</label>

    <input
      v-bind="$attrs"
      v-model="localValue"
      :type="props.type"
      id="input"
      class="input__component"
    />

    <span v-if="props.error" class="input__error">{{ props.error }}</span>
  </div>
</template>

<style scoped lang="scss">
@import 'base-input';
</style>
