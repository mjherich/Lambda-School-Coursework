import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import styled from "styled-components";

export default function Signup(props) {
    const {signupValues} = props;

    const onSubmit = (formValues, actions) => {
        const userToPost = {
            username: formValues.name,
            password: formValues.password,
            userType: formValues.userType,
        }

        console.log(userToPost); // In lieu of an axios.post...
        actions.resetForm();
    };

    const validationSchema = yup.object().shape({
        username: yup.string()
            .test(
                "username",
                "Please enter a username at least 8 characters long.",
                value => value !== undefined && value.length > 8,
            ),
        password: yup.string()
            .test(
                "password",
                "Please enter a password at least 8 characters long.",
                value => value !== undefined && value.length > 8,
            ),
        userType: yup.string().required("Please choose a user type."),
    });

    return (
        <Formik 
            initialValues={signupValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            render={props => {
                return (
                    <Form>
                        <div className="form-title">
                            <h2>Sign Up</h2>
                        </div>
                        <div className="field">
                            <Field name="username" type="text" placeholder=" Username" />
                            <ErrorMessage name="username" component="div" />
                        </div>
                        <div className="field">
                            <Field name="password" type="password" placeholder=" Password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div className="field">
                            Student
                            <Field name="userType" type="radio" value="student" />
                            Helper
                            <Field name="userType" type="radio" value="helper" />
                            <ErrorMessage name="userType" component="div" />
                        </div>
                        <button type="submit">Sign Up</button>
                    </Form>
                )
            }}
        />
    )
}