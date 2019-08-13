import React from 'react';

export default function Todo({ todo, toggleCompleted }) {
  return (
    <li
      key={todo.id}
      style={todo.completed ? { textDecoration: 'line-through' } : {}}
      onClick={() => toggleCompleted(todo.id)}
    >
      {todo.item}
    </li>
  )
}