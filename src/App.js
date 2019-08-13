import React, { useReducer } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoReducer, { initialTodos } from './reducers/todoReducer.js';

import './App.css';

function App() {
  const [stateTodos, dispatchTodos] = useReducer(todoReducer, initialTodos)

  const addTask = task => {
    const newTodo = {
      item: task,
      completed: false,
      id: Date.now()
    }
    dispatchTodos({ type: 'ADD_TASK', payload: newTodo })
  }

  const toggleCompleted = id => {
    dispatchTodos({ type: 'TOGGLE_COMPLETED', payload: id })
  }

  const clearCompleted = () => {
    dispatchTodos({ type: 'CLEAR_COMPLETED' })
  }

  return (
    <div className="App">
      <h1>Todo App featuring Reducers!</h1>
      <TodoList todos={stateTodos.todos} toggleCompleted={toggleCompleted} />
      <TodoForm addTask={addTask} clearCompleted={clearCompleted} />
    </div>
  );
}

export default App;