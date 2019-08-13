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
        ]}
    default:
      return { ...stateTodos.todos }
  }
}
export default todoReducer