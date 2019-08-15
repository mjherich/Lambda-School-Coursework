import React from 'react';
import { Button, Message } from 'semantic-ui-react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function UserInput() {
  // const [strToConvert, setStrToConvert] = React.useState('')

  const submitHandler = e => {
    e.preventDefault()

  }
  return (
    <div className="user-input">
      <h1>Generate a QR Code!</h1>
      <Formik
        initialValues={{ qrString: '' }}
        validate={values => {
          let errors = {};
          if (!values.qrString) {
            errors.qrString = 'String must not be empty!';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="ui form">
            <Field className="field" type="text" name="qrString" />
            <ErrorMessage name="qrString" component={Message} className="ui negative message" />
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}