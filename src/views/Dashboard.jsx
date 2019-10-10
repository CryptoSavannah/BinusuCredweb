import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";

import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
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


class Dashboard extends Component {

  state = {
    currentUser: authenticationService.currentUserValue,
    userBalance: ''
  }

  componentDidMount() {
    this.getAddressBalance();
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
    const {userBalance} = this.state
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={12}>
              <StatsCard
                cardLink="#"
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Available Funds to Borrow"
                statsValue="450M"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={4} sm={12}>
              <StatsCard
                cardLink="/admin/lending"
                bigIcon={<i className="pe-7s-cash text-danger" />}
                statsText="I am a Lender"
                statsValue={userBalance}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={4} sm={12}>
              <StatsCard
                cardLink="/admin/borrowing"
                bigIcon={<i className="pe-7s-portfolio text-info" />}
                statsText="I am a Borrower"
                statsValue="0"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Interest Rate Predictions"
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
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Market Status"
                category="24 Hours Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                id="chartActivity"
                title="Trend Analysis"
                category="All loans including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
