import React from 'react';
import { Button, Message } from 'semantic-ui-react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';

import { createQrCode } from '../actions';
import { tsPropertySignature } from '@babel/types';

function UserInput(props) {

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
          props.createQrCode(values)
          setTimeout(() => {
            setSubmitting(false);
          }, 1000)
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

export default connect(null, { createQrCode } )(UserInput)