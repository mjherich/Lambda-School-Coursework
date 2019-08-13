import React from 'react';
import Todo from './Todo';
// add toggleCompleted to props below after getting todos to render in component
export default function TodoList({todos, toggleCompleted}) {
  console.log('todos in TodoList.js', todos)
  return (
    <ul>
      {todos.map(todo => {
        return <Todo todo={todo} toggleCompleted={toggleCompleted} />
      })}
    </ul>
  )
}