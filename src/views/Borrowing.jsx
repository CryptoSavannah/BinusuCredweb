import React, { Component } from "react";
import { Grid, Row, Col, Table, 
    FormGroup,
    ControlLabel,
    FormControl } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import axios from 'axios';
import { authenticationService } from "services/authenticationService";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { thArray, tdArray, thBorrowersArray, tdBorrowersArray } from "variables/Variables.jsx";
import { Tasks2 } from "components/Tasks/Tasks2.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

const remoteApiUrl = process.env.REACT_APP_API_URL

class Borrowing extends Component {

  state = {
    submitted_loans: [],
    currentUser: authenticationService.currentUserValue,
    amount: '',
    date: '',
  }

  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ borrowers_address: this.state.currentUser.user_details.bnu_address})
    };

    fetch(`${remoteApiUrl}/loans/requests/`, requestOptions)
      .then(results => {
          return results.json()
      })
      .then(data => {
        this.setState({ submitted_loans:data.data })
      });
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
    this.createLoan(this.state.currentUser.user_details.bnu_address, this.state.currentUser.user_details.hashed_nin, this.state.amount, this.state.date)
  } 

  createLoan = (borrowers_address, borrower_nin_hash, loan_amount, repayment_date) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ borrowers_address, borrower_nin_hash,loan_amount, repayment_date })
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
    const { currentUser, amount, date, submitted_loans } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-credit text-warning" />}
                statsText="Funds Owed"
                statsValue="50K"
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
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-refresh-2 text-info" />}
                statsText="Market Interest Rate"
                statsValue="0.7%"
                statsIcon={<i className="fa fa-info" />}
                statsIconText="See how it's calculated"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-portfolio text-success" />}
                statsText="Credit Score"
                statsValue="650"
                statsIcon={<i className="fa fa-info" />}
                statsIconText="See how it's calculated"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            <Card
                title="Unpaid Loans"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks2 />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
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
                            <td>{"1"}</td>
                            <td>{prop.expected_payment_date}</td>
                            <td>{prop.loan_amount}</td>
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

          <Row>
          <Col md={12}>
            <Card
              title="Borrowing History"
              category="Summary of all the borroeing history"
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
                    {tdBorrowersArray.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {prop.map((prop, key) => {
                            return <td key={key}>{prop}</td>;
                          })}
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

export default Borrowing;