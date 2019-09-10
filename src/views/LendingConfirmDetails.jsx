import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

export default function LendingConfirmDetails() {
  
    return (
      <div className="content">
        <Grid fluid>
          <Row>
          <Col md={6}>
                <Col lg={12} sm={12}>
                <StatsCard
                    bigIcon={<i className="pe-7s-refresh-2 text-info" />}
                    statsText="Current Interest Rate"
                    statsValue="2.0%"
                    statsIcon={<i className="fa fa-info" />}
                    statsIconText="See how it's calculated"
                />
                </Col>
                <Col lg={12} sm={12}>
                <StatsCard
                    bigIcon={<i className="pe-7s-cash text-danger" />}
                    statsText="Credit Amount"
                    statsValue="10K BNU"
                    statsIcon={<i className="fa fa-clock-o" />}
                    statsIconText="In the last hour"
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
                          defaultValue: "ipkau2345765432345645",
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
                          placeholder: "Amount",
                          defaultValue: "10,000"
                        },
                        {
                          label: "Repayment Date",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Repayment dATE",
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