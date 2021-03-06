import React, { Component } from "react";
import { Grid, Row, Col, Table, 
    FormGroup,
    ControlLabel,
    FormControl, Modal } from "react-bootstrap";
import NotificationSystem from "react-notification-system";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import axios from 'axios';
import { authenticationService } from "services/authenticationService";
import { style } from "variables/Variables.jsx";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { thArray, thBorrowersArray} from "variables/Variables.jsx";
import { Tasks2 } from "components/Tasks/Tasks2.jsx";

const remoteApiUrl = "https://test.credit.binusu.kapsonlabs.ml/api/v1"

class Borrowing extends Component {
  constructor(props){
    super(props);
    this.state = {
      submitted_loans: [],
      borrower_history: [],
      unpaidloans: [],
      currentUser: authenticationService.currentUserValue,
      amount: '',
      date: '',
      expected_amount: '',
      borrowedMoney: '',
      _notificationSystem: null,
      show: false,
    }
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.fetchLoanRequests();
    this.fetchBorrowingHistory();
    this.fetchUnpaidLoans();
    this.fetchBorrowerStatistics();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.submitted_loans !== this.state.submitted_loans) {
      this.fetchLoanRequests();
    }
    if (prevState.unpaidloans !== this.state.unpaidloans) {
      this.fetchUnpaidLoans();
    }
  }

  fetchBorrowerStatistics = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ address: this.state.currentUser.user_details.bnu_address})
    };

    fetch(`${remoteApiUrl}/loans/borrowerstats/`, requestOptions)
      .then(results => {
          return results.json()
      })
      .then(data => {
        console.log(data.data)
        this.setState({ borrowedMoney:data.data['loan_amount']})
      });
  }

  fetchLoanRequests = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ address: this.state.currentUser.user_details.bnu_address})
    };

    fetch(`${remoteApiUrl}/loans/requests/?status=unapproved`, requestOptions)
      .then(results => {
          return results.json()
      })
      .then(data => {
        this.setState({ submitted_loans:data.data })
      });
  }

  fetchBorrowingHistory = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ address: this.state.currentUser.user_details.bnu_address})
    };

    fetch(`${remoteApiUrl}/loans/history/?role=borrower`, requestOptions)
      .then(results => {
          return results.json()
      })
      .then(data => {
        this.setState({ borrower_history:data.data })
      });
  }

  fetchUnpaidLoans = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ address: this.state.currentUser.user_details.bnu_address})
    };

    fetch(`${remoteApiUrl}/loans/requests/?status=unpaid`, requestOptions)
      .then(results => {
          return results.json()
      })
      .then(data => {
        this.setState({ unpaidloans:data.data })
      });
  }

  handleShow = ()  => {
    // e.preventDefault();
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ amount: '',  date: ''});
    let expected_amount = parseInt(this.state.amount*(2.5/100))+parseInt(this.state.amount)
    console.log(expected_amount)
    this.createLoan(this.state.currentUser.user_details.bnu_address, this.state.currentUser.user_details.hashed_nin, this.state.amount, this.state.date, expected_amount)

    //create notification
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    const _notificationSystem = this.refs.notificationSystem;
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Loan of amount <b>{this.state.amount}</b> has been submitted successfully
        </div>
      ),
      level: "success",
      position: "tr",
      autoDismiss: 10
    });
  } 

  createLoan = (borrowers_address, borrower_nin_hash, loan_amount, repayment_date, expected_amount) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ borrowers_address, borrower_nin_hash,loan_amount, repayment_date, expected_amount })
    };

    fetch(`${remoteApiUrl}/loans/`, requestOptions)
      .then(results => {
          return results.json()
      })
      .then(data => {
          const loan = data.data;
          console.log(loan)
      });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { currentUser, amount, date, submitted_loans, borrower_history, unpaidloans, borrowedMoney } = this.state;
    return (
      <div className="content">
      <NotificationSystem ref="notificationSystem" style={style}/>
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-credit text-warning" />}
                statsText="Funds Owed"
                statsValue={borrowedMoney}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-cash text-danger" />}
                statsText="Borrowing Power Left"
                statsValue="5K"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-refresh-2 text-info" />}
                statsText="Market Interest Rate"
                statsValue="0.7%"
                statsIcon={<i className="fa fa-info" />}
                statsIconText="See how it's generated"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                cardLink={this.handleShow}
                bigIcon={<i className="pe-7s-portfolio text-success" />}
                statsText="Credit Score"
                statsValue="650"
                statsIcon={<i className="fa fa-info" />}
                statsIconText="See how it's calculated"
              />
            </Col>
          </Row>
          {unpaidloans.length > 0 &&
            <Row>
              <Col md={12}>
              <Card
                  title="Unpaid Loans"
                  stats="Updated 3 minutes ago"
                  statsIcon="fa fa-history"
                  content={
                    <div className="table-full-width">
                      <table className="table">
                      <thead>
                          <th>Lender's Address</th>
                          <th>Amount to Pay</th>
                          <th>Oustanding</th>
                          <th>Payable By</th>
                          <th>Status</th>
                        </thead>
                        <Tasks2 unpaidloans={unpaidloans}/>
                      </table>
                    </div>
                  }
                />
              </Col>
            </Row>
          }
          <Row>
          <Col md={6}>
              <Card
                title="Submit Loan Request"
                content={
                  <form onSubmit={this.onSubmit}>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Borrowing Address (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Borrowing Address",
                          defaultValue: currentUser.user_details.bnu_address,
                          disabled: true,
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "amount",
                          type: "text",
                          name:"amount",
                          bsClass: "form-control",
                          placeholder: "Amount",
                          defaultValue: "10,000",
                          value: amount,
                          onChange: this.onChange,
                        },
                        {
                          label: "Repayment Date",
                          type: "date",
                          name:"date",
                          bsClass: "form-control",
                          placeholder: "Repayment Date",
                          value: date,
                          onChange: this.onChange,
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Interest Calculator",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Interest Calculator",
                          defaultValue:
                            "10,500",
                          disabled: true
                        }
                      ]}
                    />

                    <Button bsStyle="info" pullLeft fill type="submit">
                      Request Loan
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Current Loan Requests"
                category="Summary of all submitted loan requests"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {submitted_loans.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>{prop.date_requested}</td>
                            <td>{prop.loan_amount}</td>
                            <td>{prop.expected_amount}</td>
                            <td style={{"color":"white", "background":"red"}}>{"Unapproved"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>

          <Row>
          <Col md={12}>
            <Card
              title="Borrowing History"
              category="Summary of all the borrowing history"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {thBorrowersArray.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                  {borrower_history.map((prop, key) => {
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

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Credit Rating Criteria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Modal Works</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Decline</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default Borrowing;