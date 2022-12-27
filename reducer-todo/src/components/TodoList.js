import React from 'react';
import Todo from './Todo';

export default function TodoList({todos, toggleCompleted}) {
  return (
    <ul>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} toggleCompleted={toggleCompleted} />
      })}
    </ul>
  )
}