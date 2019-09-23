import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import styled from "styled-components";

const StyledFormikDiv = styled.div`
    background: darkslategrey;
    margin: 0 auto;
    width: 16rem;
    height: 20rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-items: space-between;
    align-items: center;

    .form-title {
        border: 1px solid red;
    }

    .field {
        border: 1px solid red;
    }

    button {
        
    }
`;

export default function Signup(props) {
    const {signupValues} = props;

    const onSubmit = (formValues, actions) => {
        const userToPost = {
            username: formValues.username,
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
        <StyledFormikDiv className="signup-form">
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
        </StyledFormikDiv>
    )
}