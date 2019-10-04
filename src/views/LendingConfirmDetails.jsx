import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Loader } from "components/Loaders/Loader.jsx";
import { authenticationService } from "services/authenticationService";
import axios from 'axios';

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
const remoteApiUrl = "https://test.credit.binusu.kapsonlabs.ml/api/v1"

export default class LendingConfirmDetails extends Component{
  state = {
    loading: true,
    particularLoan: [],
    currentUser: authenticationService.currentUserValue,
  }

  componentDidMount() {
    const { loanId } = this.props.location.state
    
    axios.get(`${remoteApiUrl}/loans/${loanId}/`, { headers: { Authorization: 'Bearer '.concat(this.state.currentUser.token.token) }})
    .then(res => this.setState({ particularLoan:res.data.data, loading: false}))
  }
  
  render() {
    const { particularLoan, loading } = this.state;
    if (loading) return <Loader />;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
          <Col md={6}>
                <Col lg={12} sm={12}>
                <StatsCard
                    bigIcon={<i className="pe-7s-cash text-success" />}
                    statsText="Expected Amount"
                    statsValue={particularLoan.expected_amount}
                    statsIcon={<i className="fa fa-clock-o" />}
                />
                </Col>
                <Col lg={12} sm={12}>
                <StatsCard
                    bigIcon={<i className="pe-7s-cash text-danger" />}
                    statsText="Credit Amount"
                    statsValue={particularLoan.loan_amount}
                    statsIcon={<i className="fa fa-clock-o" />}
                />
                </Col>
                <Col lg={12} sm={12}>
                <StatsCard
                    bigIcon={<i className="pe-7s-portfolio text-success" />}
                    statsText="Credit Score"
                    statsValue="650"
                    statsIcon={<i className="fa fa-info" />}
                    statsIconText="See how it's calculated"
                 />
                </Col>
            </Col>
            <Col md={6}>
              <Card
                title="Approve Credit Request"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Borrowing Address (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Borrowing Address",
                          defaultValue: particularLoan.borrower_address,
                          disabled: true
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Amount",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Loan Amount",
                          defaultValue: particularLoan.loan_amount,
                          disabled: true
                        },
                        {
                          label: "Repayment Date",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Repayment Date",
                          defaultValue: particularLoan.loan_amount,
                          disabled: true
                        }
                      ]}
                    />

                    <Button bsStyle="info" pullLeft fill type="submit">
                      Approve Credit
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}