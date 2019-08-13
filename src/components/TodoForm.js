import React, { useState } from 'react';

export default function TodoForm(props) {
  const [input, setInput] = useState('')

  const handleChange = e => {
    setInput(e.target.value)
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    props.addTask(input)
  }

  const handleClear = e => {
    e.preventDefault()
    props.clearCompleted()
  }

  return (
    <form>
      <h2>This is the Form</h2>
      <input type="text" value={input} onChange={handleChange}></input>
      <button onClick={handleSubmit}>Add Todo</button>
      <button onClick={handleClear}>Clear Completed</button>
    </form>
  )
}