import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import styled from "styled-components";

const StyledFormikDiv = styled.div`
    background: darkslategrey;
    margin: 0 auto;
    width: 16rem;
    height: 20rem;
    border-radius: 10px;
    margin-top: 2rem;
    padding: 1rem;
    display: flex;
    justify-content: center;

    form {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative; /* Necessary for "position: absolute" on button to work! */
    }

    .form-title {
        margin-bottom: 2rem;

        h2 {
            font-size: 3rem;
        }
    }

    .field {
        margin-bottom: 1rem;

        &:nth-last-of-type(1) {
            margin-bottom: 2rem;
        }

        .radio {
            height: 1.5rem;
        }

        p { /* Error messages. */
            color: red;
        }
    }

    .submit-button {
        position: absolute;
        bottom: 0;
    }
`;

export default function Signup(props) {
    const initialSignupValues = {
        username: "",
        password: "",
        userType: "",
      };
    
    const [signupValues, setSignupValues] = useState(initialSignupValues);

    const onSubmit = (formValues, actions) => {
        const userToPost = {
            username: formValues.username,
            password: formValues.password,
            userType: formValues.userType,
        }

        console.log(userToPost); // In lieu of an axios.post...      
        props.history.push("/login/");
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
                                    <ErrorMessage name="username" component="p" />
                                </div>
                                <div className="field">
                                    <Field name="password" type="password" placeholder=" Password" />
                                    <ErrorMessage name="password" component="p" />
                                </div>
                                <div className="field">
                                    <div className="radio">
                                        <span>Student</span>
                                        <Field name="userType" type="radio" value="student" />
                                    </div>
                                    <div className="radio">
                                        <span>Helper</span>
                                        <Field name="userType" type="radio" value="helper" />
                                    </div>
                                    <ErrorMessage name="userType" component="p" />
                                </div>
                                <div className="submit-button">
                                    <button type="submit">Sign Up</button>
                                </div>
                            </Form>
                        )
                    }}
                />
            </StyledFormikDiv>
    )
}