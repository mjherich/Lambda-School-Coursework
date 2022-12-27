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
      id: 1565733539163
    }
  ]
}

const todoReducer = (stateTodos, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        todos: [
          ...stateTodos.todos,
          action.payload
        ]
      }
    case 'TOGGLE_COMPLETED':
      const stateTodosCopy = { todos: [...stateTodos.todos] }
      const newTodosState = stateTodosCopy.todos.map(todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else {
          return todo;
        }
      })
      return { todos: newTodosState }
    case 'CLEAR_COMPLETED':
      const stateTodosCopy2 = { todos: [...stateTodos.todos] }
      const clearedTodosState = stateTodosCopy2.todos.filter(todo => todo.completed === false)
      return {
        todos: clearedTodosState
      }
    default: return { todos: [...stateTodos.todos] }
  }
}
export default todoReducer