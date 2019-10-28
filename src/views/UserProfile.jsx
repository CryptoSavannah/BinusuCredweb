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
import { Loader3 } from "components/Loaders/Loader3.jsx";

import {
  thLendersArray,
  tdLendersArray
} from "variables/Variables.jsx";

import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {

  state = {
    transaction_history: [],
    currentUser: authenticationService.currentUserValue,
    historyLoading: true
  }

  componentDidMount() {
    this.fetchTransactionHistory();
  }

  fetchTransactionHistory = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ method: "getTxes", address: this.state.currentUser.user_details.bnu_address, number:20})
    };

    fetch(`https://tokyo.adin.ug/api/node/mobile_api.php`, requestOptions)
      .then(results => {
          return results.json()
      })
      .then(data => {
        this.setState({ transaction_history:data.response, historyLoading:false })
      });
  }

  render() {
    const { transaction_history, currentUser, historyLoading } = this.state;

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
                      <th>Sender</th>
                      <th>Recepient</th>
                      <th>Tx ID</th>
                      <th>Amount</th>
                      <th>Txn Type</th>
                    </thead>
                    {historyLoading===true ? (
                      <Loader3/>
                    ) : (
                      <tbody>
                      {transaction_history.map((prop, key) => {
                          return (
                            <tr key={key}>
                              <td>{prop.sender.slice(0, 25)}</td>
                              <td>{prop.recipient.slice(0, 25)}</td>
                              <td>{prop.txid}</td>
                              <td>{prop.amount}</td>
                              <td>{prop.amount}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    ) 
                    }
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
