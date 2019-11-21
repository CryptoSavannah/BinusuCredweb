import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from '../components/Card/Card.jsx';

import { authenticationService } from 'services/authenticationService';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

    
    }

    render() {
        return (
            <div className="row">
                <div className="alert login-alert alert-info">
                    Binusu Credit
                </div>
                
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        firstname: Yup.string().required('First Name is required'),
                        lastname: Yup.string().required('Last Name is required'),
                        ninnumber: Yup.string().required('Nin number is required'),
                        email: Yup.string().required('Email is required'),
                        address: Yup.string().required('Address is required'),
                        phonenumber: Yup.string().required('Phone Number is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/admin/choose_track" } };
                                    this.props.history.push(from);
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
                                    <Col lg={3} sm={0}></Col>
                                    <Col lg={6} sm={12}>
                                        <Card
                                        title="REGISTER TO BINUSU CREDIT"
                                        content={
                                        <Form>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="firstname">First Name</label>
                                                        <Field name="firstname" type="text" className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="lastname">Last Name</label>
                                                        <Field name="lastname" type="text" className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="ninnumber">NIN Number</label>
                                                        <Field name="ninnumber" type="text" className={'form-control' + (errors.ninnumber && touched.ninnumber ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="ninnumber" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">    
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email Address</label>
                                                        <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="address">Address</label>
                                                        <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="phonenumber">Phone Number</label>
                                                        <Field name="phonenumber" type="password" className={'form-control' + (errors.phonenumber && touched.phonenumber ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="phonenumber" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="password">Password</label>
                                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="password"> Re Enter Password</label>
                                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="refferal">Refferal ID</label>
                                                <Field name="refferal" type="text" className={'form-control'} />
                                            </div>
                                            
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                                                {isSubmitting &&
                                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                }
                                            </div>
                                            {status &&
                                                <div className={'alert alert-danger'}>{status}</div>
                                            }
                                        </Form>
                                        }
                                        />
                                    </Col>
                                </Row>
                            </Grid>
                        </div>
                    )}
                />
            </div>
        )
    }
}

export default RegisterPage;