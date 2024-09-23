<script setup>
import RegisterDialog from '../../dialogs/RegisterDialog.vue'
import TodoDialog from '../../dialogs/TodoDialog.vue'
import ErrorDialog from '../../dialogs/ErrorDialog.vue'
import BaseButton from '../../ui/button/BaseButton.vue'
import BaseSelect from '../../ui/select/BaseSelect.vue'
import BaseInput from '../../ui/input/BaseInput.vue'
import Todos from '../todos/Todos.vue'

import { computed, onMounted } from 'vue'
import { useContentData } from './use-content-data'
import { useContentFilters } from './use-content-filters'

const {
  todoDialogOpened,
  registerDialogOpened,
  registrationSuccess,
  errorDialogOpened,
  errorDialogMessage,
  todos,
  users,
  favoritesTodos,
  userData,
  register,
  getUsers,
  openDialog,
  loadFavorites,
} = useContentData()

const { userIdFilter, titleFilter, todosFilter, generalFilters } =
  useContentFilters()

const usersIdsFilter = computed(() => {
  const arr = ['All users']
  for (const item of users.value) {
    arr.push(item.id)
  }
  return arr
})

function updateFavorites(arr) {
  localStorage.setItem('favorites-todos', JSON.stringify(arr))
  loadFavorites()
}

function getUserAddress() {
  if (!userData.value) {
    return ''
  }

  return `${userData.value.address.street} ${userData.value.address.suite}, ${userData.value.address.city}`
}

const filteredTodos = computed(() => {
  return todos.value.filter((el) => {
    const userIdMatch =
      typeof userIdFilter.value !== 'string' && userIdFilter.value !== ''
        ? el.userId === userIdFilter.value
        : true

    const titleMatch =
      titleFilter.value !== '' ? el.title.includes(titleFilter.value) : true

    const allTodosFilter = todosFilter.value?.value === 'all'
    const completedTodosFilter = todosFilter.value?.value === 'completed'
    const unCompletedTodosFilter = todosFilter.value?.value === 'uncompleted'
    const favoritesTodosFilter = todosFilter.value?.value === 'favorites'

    if (allTodosFilter) {
      return userIdMatch && titleMatch
    }

    if (favoritesTodosFilter) {
      const favorites = favoritesTodos.value.find((item) => item.id === el.id)
      return favorites && userIdMatch && titleMatch
    }

    return (
      userIdMatch &&
      titleMatch &&
      ((el.completed && completedTodosFilter) ||
        (!el.completed && unCompletedTodosFilter))
    )
  })
})

async function addTodo({ userId, title }) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed: false,
        userId,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to add todo')
    }

    const data = await response.json()
    todos.value.push(data)

    todoDialogOpened.value = false
  } catch (error) {
    console.error('Error adding todo:', error)
  }
}

onMounted(async () => {
  openDialog()
  await getUsers()

  userIdFilter.value = usersIdsFilter.value[0]
  todosFilter.value = generalFilters.find((el) => el.value === 'all')
})
</script>

<template>
  <div class="main-content">
    <div v-if="registrationSuccess" class="main-content__container">
      <div v-if="userData" class="main-content__user">
        <h2 class="main-content__user-title">User Information</h2>

        <table class="main-content__user-info">
          <tbody>
            <tr class="main-content__user-block">
              <td class="main-content__user-info-column">Name</td>
              <td class="main-content__user-info-column">
                {{ userData.name }}
              </td>
            </tr>

            <tr class="main-content__user-block">
              <td class="main-content__user-info-column">Phone</td>
              <td class="main-content__user-info-column">
                {{ userData.phone }}
              </td>
            </tr>

            <tr class="main-content__user-block">
              <td class="main-content__user-info-column">Company</td>
              <td class="main-content__user-info-column">
                {{ userData.company.name }}
              </td>
            </tr>

            <tr class="main-content__user-block">
              <td class="main-content__user-info-column">Address</td>
              <td class="main-content__user-info-column">
                {{ getUserAddress() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="main-content__todos">
        <div class="main-content__filters">
          <div class="main-content__filters-content">
            <BaseSelect
              v-model:value="userIdFilter"
              :options="usersIdsFilter"
              label="User Id filter"
              class="main-content__filters-input"
            >
              <template #option="{ option }">
                {{ option }}
              </template>
            </BaseSelect>

            <BaseSelect
              v-model:value="todosFilter"
              :options="generalFilters"
              label="Todos filter"
              class="main-content__filters-input"
            >
              <template #option="{ option }">
                {{ option.label }}
              </template>
            </BaseSelect>

            <BaseInput
              v-model:value="titleFilter"
              label="Todo title"
              class="main-content__filters-input"
            />

            <div class="main-content__todos-count">
              Todos count: {{ filteredTodos.length }}
            </div>
          </div>

          <div class="main-content__filters-actions">
            <BaseButton
              class="main-content__filters-button"
              @click="todoDialogOpened = true"
            >
              Add Todo
            </BaseButton>
          </div>
        </div>

        <Todos
          :items="filteredTodos"
          :favorites="favoritesTodos"
          class="main-content__todos-list"
          @update-favorites="updateFavorites"
        />
      </div>
    </div>

    <div class="main-content__dialogs">
      <TodoDialog v-model:visible="todoDialogOpened" @add-todo="addTodo" />

      <RegisterDialog
        v-model:visible="registerDialogOpened"
        @register="register"
      />

      <ErrorDialog
        v-model:visible="errorDialogOpened"
        :message="errorDialogMessage"
      />
    </div>

    <BaseButton
      v-if="!registrationSuccess && !registerDialogOpened"
      @click="registerDialogOpened = true"
    >
      Open registration
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
@import './main-content';
</style>
