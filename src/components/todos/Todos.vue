<script setup>
import BaseButton from '../../ui/button/BaseButton.vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  favorites: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['update-favorites'])

function setFavorite(todo) {
  let arr = [...props.favorites]
  if (getFavoriteTodo(todo)) {
    arr = arr.filter((el) => el.id !== todo.id)
  } else {
    arr.push(todo)
  }

  emit('update-favorites', arr)
}

function getFavoriteTodo(item) {
  return props.favorites.find((el) => el.id === item.id)
}
</script>

<template>
  <div class="todos">
    <div v-for="todo in props.items" class="todos__item">
      <div class="todos__item-head">
        <span
          :class="{ 'todos__item-id_favorite': getFavoriteTodo(todo) }"
          class="todos__item-id"
        >
          Todo id: {{ todo.id }}
        </span>

        <span class="todos__item-completed">
          {{ todo.completed ? 'Completed' : 'Uncompleted' }}
        </span>
      </div>

      <span class="todos__item-user"> User Id: {{ todo.userId }} </span>

      <span class="todos__item-title">
        {{ todo.title }}
      </span>

      <BaseButton class="todos__item-action" @click="setFavorite(todo)">
        {{ getFavoriteTodo(todo) ? 'Unset favorite' : 'Set favorite' }}
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'todos';
</style>
