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
  console.log('reducer stateTodos: ', stateTodos)
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
    default: return { todos: [...stateTodos.todos] }
  }
}
export default todoReducer

  // setTodos({
  //   todos: todos.map(todo => {
  //     if (todo.id === id) {
  //       return {
  //         ...todo,
  //         completed: !todo.completed
  //       };
  //     } else {
  //       return todo;
  //     }
  //   })
  // })