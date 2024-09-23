<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: '', required: false },
  error: { type: String, default: '', required: false },
  value: { type: [Object, String, Number], default: null },
  options: { type: Array, default: () => [] },
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

const selected = (value) => {
  return JSON.stringify(value) === JSON.stringify(localValue.value)
}
</script>

<template>
  <div class="select">
    <label class="select__label" for="select">{{ props.label }}</label>

    <select
      v-bind="$attrs"
      v-model="localValue"
      id="select"
      class="select__component"
    >
      <option
        v-for="option in props.options"
        :selected="selected(option)"
        :value="option"
        @click="localValue = option"
      >
        <slot name="option" :option="option" />
      </option>
    </select>

    <span v-if="props.error" class="select__error">{{ props.error }}</span>
  </div>
</template>

<style scoped lang="scss">
@import 'base-select';
</style>
