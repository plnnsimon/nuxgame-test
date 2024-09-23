<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
    required: false,
  },
  tag: {
    type: String,
    default: 'div',
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>

<template>
  <component
    v-bind="$attrs"
    :is="props.tag"
    :class="[{ disabled }]"
    class="button"
  >
    <div class="button__inner">
      <slot>
        <p v-if="props.title" class="button__inner-text">
          {{ props.title }}
        </p>
      </slot>
    </div>
  </component>
</template>

<style scoped lang="scss">
@import '../../static/scss/variables/colors';

.button {
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  -webkit-tap-highlight-color: transparent;
  background: $secondary-bg-color;
  transition: opacity ease 0.3s;

  &:hover {
    opacity: 0.7;
  }

  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
