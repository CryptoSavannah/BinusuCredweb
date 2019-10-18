import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from '../components/Card/Card.jsx'
import { Loader4 } from "components/Loaders/Loader4.jsx";

import { authenticationService } from 'services/authenticationService';
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/admin/choose_track');
        }
    }

    render() {
        return (
            <div>
                <div className="alert login-alert alert-info">
                    Binusu Credit
                </div>
                
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/admin/choose_track" } };
                                    this.props.history.push(from);
                                    
                                    window.localStorage.setItem('data', JSON.stringify(user))
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <div className="content">
                            <Grid fluid>
                                <Row>
                                    <Col lg={6} md={6} sm={6} className="login-image">
                                        <div >
                                            <div className="intro-words">
                                                <h2>Decentralised Finance</h2>
                                                <h3>And</h3>
                                                <h2>Social Responsibility Credit</h2>
                                                <h3>Platform</h3>
                                            </div>
                                        </div>
                                    </Col>
                                    {isSubmitting ? (
                                        <Loader4/>
                                    ) : (
                                        <Col lg={6} md={6} sm={6} className="loginForm">
                                            <Card
                                            title="LOGIN TO BINUSU CREDIT"
                                            content={
                                            <Form>
                                                <div className="form-group">
                                                    <label htmlFor="username">Username</label>
                                                    <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary">Login</button>
                                                </div>
                                                {status &&
                                                    <div className={'alert alert-danger'}>{status}</div>
                                                }
                                                <div className='pull-right'><Link to="/register">Register Here</Link></div>
                                            </Form>
                                            }
                                            />
                                        </Col>
                                        )}
                                    )}
                                        
                                </Row>
                            </Grid>
                        </div>
                    )}
                />
            </div>
        )
    }
}

export default LoginPage;