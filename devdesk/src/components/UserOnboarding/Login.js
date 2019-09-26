import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios'
import * as yup from "yup";

import { setUserType } from '../../store/actions';

const Login = (props) => {
    const { loginValues } = props;

    const onSubmit = (formValues, actions) => {

        const userToPost = {
            username: formValues.username,
            password: formValues.password,
        }

        console.log(userToPost);
        axios.post('https://lambda-dev-desk-queue.herokuapp.com/login', `grant_type=password&username=${userToPost.username}&password=${userToPost.password}`, {
            headers: {
                Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then(res => {
                localStorage.setItem('token', res.data.access_token);
                props.setUserType(formValues.userType);
                formValues.userType === 'student' ? props.history.push('/student-dashboard') : props.history.push('/helper-dashboard')
            })
            .catch(err => console.log(err))
    };

    const validationSchema = yup.object().shape({

        userType: yup.string().required("Please choose a user type."),
    });

    return (
        <>
            <Link to="/">Homepage</Link>
            <div className="login-form">
                <Formik
                    initialValues={loginValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    render={props => {
                        return (
                            <Form>
                                <div className="form-title">
                                    <h2>Login</h2>
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
                                    <button type="submit">Login</button>
                                </div>
                            </Form>
                        )
                    }}
                />
            </div>
        </>
    )
}

export default connect(null, { setUserType })(Login);