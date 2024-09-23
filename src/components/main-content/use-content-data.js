import { ref } from 'vue'

export function useContentData() {
  const todoDialogOpened = ref(false)
  const registerDialogOpened = ref(false)
  const registrationSuccess = ref(false)
  const errorDialogOpened = ref(false)
  const errorDialogMessage = ref('')
  const users = ref([])
  const todos = ref([])
  const favoritesTodos = ref([])
  const userData = ref(null)

  async function getUsers() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      users.value = await res.json()
    } catch (err) {
      console.error(err)
    }
  }

  async function loadTodos() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      todos.value = await res.json()
    } catch (err) {
      console.error(err)
    }
  }

  async function register({ userName, phone }) {
    const exist = users.value.find(
      (user) => userName === user.username && user.phone.includes(phone)
    )
    if (!exist) {
      errorDialogOpened.value = true
      errorDialogMessage.value = 'Login Error'
      return
    }

    registrationSuccess.value = true
    userData.value = exist

    loadFavorites()
    await loadTodos()

    closeDialog()
  }

  function openDialog() {
    registerDialogOpened.value = true
  }

  function closeDialog() {
    registerDialogOpened.value = false
  }

  function loadFavorites() {
    const storedData = localStorage.getItem('favorites-todos')
    favoritesTodos.value = storedData ? JSON.parse(storedData) : []
  }

  return {
    todoDialogOpened,
    registerDialogOpened,
    registrationSuccess,
    errorDialogOpened,
    errorDialogMessage,
    users,
    todos,
    favoritesTodos,
    userData,
    register,
    loadTodos,
    getUsers,
    openDialog,
    closeDialog,
    loadFavorites,
  }
}
