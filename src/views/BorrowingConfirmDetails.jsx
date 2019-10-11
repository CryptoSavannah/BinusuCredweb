import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Loader } from "components/Loaders/Loader.jsx";
import ChartistGraph from "react-chartist";
import { authenticationService } from "services/authenticationService";
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

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
const remoteApiUrl = "https://test.credit.binusu.kapsonlabs.ml/api/v1"

export default class BorrowingConfirmDetails extends Component{
  state = {
    loading: true,
    repayment_history: [],
    currentUser: authenticationService.currentUserValue,
    loanId: this.props.location.state,
    particularLoan: [],
  }

  componentDidMount() {
    if(this.state.loanId!=null){
      const loanid = this.state.loanId.unpaidloanId

      axios.get(`${remoteApiUrl}/loans/${loanid}/`, { headers: { Authorization: 'Bearer '.concat(this.state.currentUser.token.token) }})
      .then(res => this.setState({ particularLoan:res.data.data, loading: false}))
    }
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

//   componentDidMount() {
//     const { loanId } = this.props.location.state
    
//     axios.get(`${remoteApiUrl}/loans/${loanId}/`, { headers: { Authorization: 'Bearer '.concat(this.state.currentUser.token.token) }})
//     .then(res => this.setState({ particularLoan:res.data.data, loading: false}))
//   }
  
  render() {
    const { particularLoan } = this.state;

    const { repayment_history } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
                title="Make Loan Repayment"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Amount",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Installment Amount",
                        },
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Lending Address",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Lending Address",
                          defaultValue: particularLoan.lending_address,
                          disabled: true
                        }
                      ]}
                    />

                    <Button bsStyle="info" pullLeft fill type="submit">
                      Approve Repayment
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
              <Col lg={6} sm={6}>
                <StatsCard
                    bigIcon={<i className="pe-7s-cash text-success" />}
                    statsText="Loan Amount"
                    statsValue={particularLoan.loan_amount}
                    statsIcon={<i className="fa fa-clock-o" />}
                />
              </Col>
              <Col lg={6} sm={6}>
                <StatsCard
                    bigIcon={<i className="pe-7s-cash text-success" />}
                    statsText="Outstanding"
                    statsValue="5,000"
                    statsIcon={<i className="fa fa-clock-o" />}
                />
              </Col>
            </Col>
            <Col md={6}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Loan Repayment Profile"
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
          </Row>
          <Row>
          <Col md={12}>
            <Card
              title="Repayment History"
              category="Summary of all the this loan's history"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  {/* <thead>
                    <tr>
                      {thBorrowersArray.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead> */}
                  <tbody>
                  {repayment_history.map((prop, key) => {
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