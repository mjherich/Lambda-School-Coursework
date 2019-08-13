import React from 'react';

export default function Todo({ idx, todo, toggleCompleted }) {
  return (
    <li
      key={idx}
      style={todo.completed ? { textDecoration: 'line-through' } : {}}
      onClick={() => toggleCompleted(todo.id)}
    >
      {todo.item}
    </li>
  )
}