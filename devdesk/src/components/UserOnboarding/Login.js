import React from 'react';
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import { withFormik} from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const FormDiv = styled.div `
border: 1px solid black;
width: 80%;


`




export default class Login extends React.Component {
  render() {
    return (
        <FormDiv>
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="email" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="password" />
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="studentCheck" />{' '}
            Are You a Student?
          </Label>

        </FormGroup>
        
        <Button>Submit</Button>
      </Form>
      </FormDiv>
    );
  }
}

const FormikForm = withFormik({
    mapPropsToValues({ email, password, studentCheck }) {
        return {
           
            email: email || "",
            password: password || "",
            studentCheck: studentCheck || false,
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required("You must enter an email"),
        password: Yup.string().required("You must enter a password")
    }),

    // handleSubmit(values, {setStatus}) {
    //     axios.post(" https://reqres.in/api/users", values).then(res => {
    //         console.log(res);
    //         setStatus(res.data);
    //     });
    // }

})(Login);
// console.log("This is the HOC", FormikForm)
// export default FormikForm;