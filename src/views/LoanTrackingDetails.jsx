import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";

import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import axios from 'axios';
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
import { authenticationService } from "services/authenticationService";
const remoteApiUrl = "https://test.credit.binusu.kapsonlabs.ml/api/v1"


class LoanTrackingDetails extends Component {

  state = {
    currentUser: authenticationService.currentUserValue,
    userBalance: '',
    repayment_history: []
  }

  componentDidMount() {
    if(this.state.loanId!=null){
        const loanid = this.state.loanId.loanId
        this.getAddressBalance();
        this.fetchRepaymentsHistory(loanid);
  
        axios.get(`${remoteApiUrl}/loans/${loanid}/`, { headers: { Authorization: 'Bearer '.concat(this.state.currentUser.token.token) }})
        .then(res => this.setState({ particularLoan:res.data.data, loading: false}))
      }
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
        this.setState({ userBalance:data.response.available })
      });
  }

  fetchRepaymentsHistory = (loan_id) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ loan_id: loan_id})
    };

    fetch(`${remoteApiUrl}/loans/repayments_history/`, requestOptions)
      .then(results => {
          return results.json();
      })
      .then(data => {
        this.setState({ repayment_history:data.data })
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
  render() {
    const {userBalance, repayment_history} = this.state
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={12}>
              <StatsCard
                cardLink="#"
                bigIcon={<i className="pe-7s-cash text-primary" />}
                statsText="Loan Amount"
                statsValue="450M"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={4} sm={12}>
              <StatsCard
                cardLink="#"
                bigIcon={<i className="pe-7s-cash text-success" />}
                statsText="Amount Paid Back"
                statsValue={userBalance}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={4} sm={12}>
              <StatsCard
                cardLink="#"
                bigIcon={<i className="pe-7s-cash text-danger" />}
                statsText="Outstanding Amount"
                statsValue="0"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Repayment Tracker"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={6}>
            <Card
              title="Repayment History"
              category="Summary of all the this loan's history"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                      <th>Paying Address</th>
                      <th>Installment</th>
                      <th>Amount</th>
                      <th>Date Paid</th>
                    </thead>
                  <tbody>
                  {repayment_history.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>{prop.paying_address.slice(0, 40)}</td>
                            <td>{prop.installment_number}</td>
                            <td>{prop.installment_amount}</td>
                            <td>{prop.date_paid}</td>
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

export default LoanTrackingDetails;
