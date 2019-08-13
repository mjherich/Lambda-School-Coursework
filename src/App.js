import React, { useReducer } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoReducer, { initialTodos } from './reducers/todoReducer.js';

import './App.css';

function App() {
  const [stateTodos, dispatchTodos] = useReducer(todoReducer, initialTodos)

  // FIX BELOW FUNCTIONS LATER
  // addTask = task => {
  //   setTodos({
  //     todos: [...todos, {
  //       task: task,
  //       id: Date.now(),
  //       completed: false
  //     }]
  //   })
  // }
  // toggleCompleted = id => {
  //   setTodos({
  //     todos: todos.map(todo => {
  //       if (todo.id === id) {
  //         return {
  //           ...todo,
  //           completed: !todo.completed
  //         };
  //       } else {
  //         return todo;
  //       }
  //     })
  //   })
  // }
  // clearCompleted = () => {
  //   setTodos({
  //     todos: todos.filter(todo => todo.completed === false)
  //   })
  // }
  return (
    <div className="App">
      <h1>Todo App featuring Reducers!</h1>
      <TodoList todos={stateTodos.todos} />
      {/* toggleCompleted={this.toggleCompleted} */}
      <TodoForm />
      {/* addTask={this.addTask} clearCompleted={this.clearCompleted} */}
    </div>
  );
}

export default App;


// const initTodos = [
//   {
//     task: 'Organize Garage',
//     id: 1528817077286,
//     completed: false
//   },
//   {
//     task: 'Bake Cookies',
//     id: 1528817084358,
//     completed: false
//   }
// ];

// class App extends React.Component {
//   // you will need a place to store your state in this component.
//   // design `App` to be the parent component of your application.
//   // this component is going to take care of state, and any change handlers you need to work with your state
//   constructor() {
//     super();
//     this.state = {
//       todos: initTodos
//     }
//   }