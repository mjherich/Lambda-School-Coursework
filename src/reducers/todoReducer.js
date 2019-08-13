export const initialTodos = {
  todos: [
    {
      item: 'Learn about reducers',
      completed: false,
      id: 3892987589
    },
    {
      item: 'Second initial todo',
      completed: false,
      id: Date.now()
    }
  ]
}

const todoReducer = (stateTodos, action) => {
  return { ...stateTodos.todos }
}
export default todoReducer