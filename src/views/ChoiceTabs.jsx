import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { userService } from "services/userService";
import { authenticationService } from "services/authenticationService";



class ChoiceTabs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

  
  render() {
    const { currentUser, users } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={2}></Col>
            <Col lg={8} sm={6}>
              <h3>Welcome {currentUser.user_details.first_name} {currentUser.user_details.last_name}. Please Navigate Below</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={4}></Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-angle-right text-success" />}
                statsText="Go here to Lend Credit"
                statsIcon={<i className="fa fa-refresh" />}
                cardLink="/admin/lending"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4}></Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-angle-right text-info" />}
                statsText="Go here to Borrow Credit"
                statsIcon={<i className="fa fa-clock-o" />}
                cardLink="/admin/borrowing"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4}></Col>
            <Col lg={4} sm={6}>
              <StatsCard
                statsText="View Market Status"
                bigIcon={<i className="pe-7s-angle-right text-info" />}
                statsIcon={<i className="pe-7s-info" />}
                cardLink="/admin/dashboard"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ChoiceTabs;