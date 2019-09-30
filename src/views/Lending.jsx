import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from 'axios';

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import { authenticationService } from "services/authenticationService";


import {
  thLendersArray,
  tdLendersArray
} from "variables/Variables.jsx";

const remoteApiUrl = process.env.REACT_APP_API_URL

class Lending extends Component {

  state = {
    loans : [],
    currentUser: authenticationService.currentUserValue,
  }

  componentDidMount() {
    axios.get(`${remoteApiUrl}/loans/`, { headers: { Authorization: 'Bearer '.concat(this.state.currentUser.token.token) }})
    .then(res => this.setState({ loans:res.data.data }))
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
    const { currentUser, loans } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-drawer text-success" />}
                statsText="Lending Balance"
                statsValue="500K"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-cash text-info" />}
                statsText="Lent Money"
                statsValue="50K"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-cash text-success" />}
                statsText="Total Interest(Open Loans)"
                statsValue="5K"
                statsIcon={<i className="pe-7s-info" />}
                statsIconText="see how it's calculated"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-hourglass text-info" />}
                statsText="Current Interest Rate"
                statsValue="0.7%"
                statsIcon={<i className="pe-7s-info" />}
                statsIconText="see how it's calculated"
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
                      <Tasks loans={loans}/>
                    </table>
                  </div>
                }
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
                    <tbody>
                      {tdLendersArray.map((prop, key) => {
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

export default Lending;