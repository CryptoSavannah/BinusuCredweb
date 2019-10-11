import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { authenticationService } from "services/authenticationService";

import {
  thLendersArray,
  tdLendersArray
} from "variables/Variables.jsx";

import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {

  state = {
    transaction_history: [],
    currentUser: authenticationService.currentUserValue
  }

  render() {
    const { transaction_history, currentUser } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Account Information"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-4"]}
                      properties={[
                        {
                          label: "Account Balance",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company",
                          defaultValue: "Creative Code Inc.",
                          disabled: true
                        },
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: currentUser.user_details.username,
                          disabled: true
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: currentUser.user_details.first_name,
                          disabled: true
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: currentUser.user_details.last_name,
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "BNU Address",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Home Adress",
                          defaultValue: currentUser.user_details.bnu_address,
                          disabled: true
                        }
                      ]}
                    />

                    <Button bsStyle="info" pullRight fill type="submit">
                      Load/Withdraw Account
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name={currentUser.user_details.first_name }
                userName={currentUser.user_details.username}
                description={
                  <span>
                    "{currentUser.user_details.email}
                    <br />
                    
                    <br />
                    "
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                title="Account Transactional History"
                category="Summary of all the deposits and withdraws on this account"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thLendersArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                    {transaction_history.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>{prop.lending_address.slice(0, 40)}</td>
                            <td>{prop.actual_payment_date}</td>
                            <td>{prop.loan_amount}</td>
                            <td>{prop.expected_amount}</td>
                            <td>{prop.loan_status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
              </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
