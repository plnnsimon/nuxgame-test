import { ref } from 'vue'

export function useContentFilters() {
  const userIdFilter = ref('')
  const titleFilter = ref('')
  const todosFilter = ref(null)

  const generalFilters = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Completed',
      value: 'completed',
    },
    {
      label: 'Uncompleted',
      value: 'uncompleted',
    },
    {
      label: 'Favorites',
      value: 'favorites',
    },
  ]

  return {
    titleFilter,
    userIdFilter,
    todosFilter,
    generalFilters,
  }
}
