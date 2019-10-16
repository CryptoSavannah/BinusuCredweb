import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from 'axios';

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import { Loader3 } from "components/Loaders/Loader3.jsx";

import { authenticationService } from "services/authenticationService";
import { Link } from "react-router-dom";


import {
  thLendersArray,
  tdLendersArray
} from "variables/Variables.jsx";

const remoteApiUrl = "https://test.credit.binusu.kapsonlabs.ml/api/v1"

class Lending extends Component {

  state = {
    loans : [],
    lender_history: [],
    currentUser: authenticationService.currentUserValue,
    userBalance: '',
    lentMoney: '',
    interest: '',
    historyLoading: true
  }

  componentDidMount() {
    this.fetchBorrowerLoanRequests();
    this.fetchLendingHistory();
    this.getAddressBalance();
    this.fetchLoansStatistics();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.loans !== this.state.loans) {
  //     this.fetchBorrowerLoanRequests();
  //   }
  // }

  fetchBorrowerLoanRequests = () => {
    axios.get(`${remoteApiUrl}/loans/`, { headers: { Authorization: 'Bearer '.concat(this.state.currentUser.token.token) }})
    .then(res => this.setState({ loans:res.data.data }))
  }

  fetchLendingHistory = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ address: this.state.currentUser.user_details.bnu_address})
    };

    fetch(`${remoteApiUrl}/loans/history/?role=lender`, requestOptions)
      .then(results => {
          return results.json()
      })
      .then(data => {
        this.setState({ lender_history:data.data, historyLoading:false })
      });
  }

  fetchLoansStatistics = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ address: this.state.currentUser.user_details.bnu_address})
    };

    fetch(`${remoteApiUrl}/loans/stats/`, requestOptions)
      .then(results => {
          return results.json()
      })
      .then(data => {
        console.log(data.data)
        this.setState({ lentMoney:data.data['loan_amount'], interest:data.data['interest'] })
      });
  }

  getAddressBalance = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ method:"getMobileBalance", address: this.state.currentUser.user_details.bnu_address})
    };

    fetch('https://tokyo.adin.ug/api/node/mobile_api.php', requestOptions)
      .then(results => {
        return results.json()
      })
      .then(data => {
        const balance = data.response.available+data.response.pending
        this.setState({ userBalance:balance.toFixed(2) })
      });
  }

  delLoan = (id) => {
    this.setState({ loans: [...this.state.loans.filter(loan => loan.id !== id)] });
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
  render() {
    const { currentUser, loans, lender_history, userBalance, lentMoney, interest, historyLoading } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-drawer text-success" />}
                statsText="Lending Balance"
                statsValue={userBalance}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-cash text-info" />}
                statsText="Lent Money"
                statsValue={lentMoney}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-cash text-success" />}
                statsText="Total Interest(Open Loans)"
                statsValue={interest}
                statsIcon={<i className="pe-7s-info" />}
                statsIconText="see how it's calculated"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-hourglass text-info" />}
                statsText="Current Interest Rate"
                statsValue="2.5%"
                statsIcon={<i className="pe-7s-info" />}
                statsIconText="see how it's calculated"
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                title="Lending History"
                category="Summary of all the lending history"
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
                    {historyLoading==true ? (
                      <Loader3/>
                    ) : (
                    <tbody>
                    
                      {lender_history.map((prop, key) => {
                          
                          return (
                            <tr key={key}>
                              <td><Link to={{pathname: "/admin/track_loan", state: {loanId: prop.id}}}>{prop.lending_address.slice(0, 40)}</Link></td>
                              <td>{prop.date_approved}</td>
                              <td>{prop.loan_amount}</td>
                              <td>{prop.outstanding_amount}</td>
                              {prop.loan_status==2 ? (
                                <td style={{"color":"white", "background":"red"}}>{"Unpaid"}</td>
                              ) : (
                                <td style={{"color":"white", "background":"blue"}}>{"Under Payment"}</td>
                              )}
                              
                            </tr>
              
                          );
                        })}
                      
                    </tbody>
                    )}
                  </Table>
                }
              />
              </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                title="Available Borrowers"
                category="Filtered According to Lending balance and Credit score"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <thead>
                        <th>Borrower Address</th>
                        <th>Amount</th>
                        <th>Interest</th>
                        <th>Duration</th>
                        <th>Credit Score</th>
                      </thead>
                      <Tasks loans={loans} delLoan={this.delLoan}/>
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default Lending;