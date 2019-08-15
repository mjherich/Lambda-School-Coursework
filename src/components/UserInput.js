import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default function UserInput() {
  return (
    <div className="user-input">
      <h1>Generate a QR Code!</h1>
      <Form>
        <Form.Field>
          <label>What do you want to convert?</label>
          <input placeholder='Enter a string to convert...' />
        </Form.Field>
        <Button type='submit'>Convert!</Button>
      </Form>
    </div>
  )
}