import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

export default function PayCredit() {
  
    return (
      <div className="content">
        <Grid fluid>
          <Row>
          <Col md={6}>
                <Col lg={12} sm={12}>
                <StatsCard
                    bigIcon={<i className="pe-7s-refresh-2 text-info" />}
                    statsText="Repayment Duration Left"
                    statsValue="10 days"
                />
                </Col>
                <Col lg={12} sm={12}>
                <StatsCard
                    bigIcon={<i className="pe-7s-cash text-danger" />}
                    statsText="Credit Amount"
                    statsValue="15K"
                />
                </Col>
            </Col>
            <Col md={6}>
              <Card
                title="Approve Credit Repayment"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Lender's Address",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Lender's Address",
                          defaultValue: "ipkau2345765432345645789",
                          disabled: true
                        },
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Amount",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Interest Calculator",
                          defaultValue:
                            "15,500",
                          disabled: true
                        }
                      ]}
                    />

                    <Button bsStyle="info" pullLeft fill type="submit">
                      Approve Payment
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