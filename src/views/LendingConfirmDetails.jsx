import React, { Component } from "react";
import { Grid, Row, Col, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Loader } from "components/Loaders/Loader.jsx";
import { authenticationService } from "services/authenticationService";
import axios from 'axios';
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import { sha256 } from 'js-sha256';

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
const remoteApiUrl = "https://test.credit.binusu.kapsonlabs.ml/api/v1"

export default class LendingConfirmDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      particularLoan: [],
      currentUser: authenticationService.currentUserValue,
      loanId: this.props.location.state,
      spend_keys: [],
      show: false,
      _notificationSystem: null,
      oauthHash:'',
      gotToken: false,
      userBalance: ''
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if(this.state.loanId!=null){
      const loanid = this.state.loanId.loanId
      this.getAddressBalance();

      axios.get(`${remoteApiUrl}/loans/${loanid}/`, { headers: { Authorization: 'Bearer '.concat(this.state.currentUser.token.token) }})
      .then(res => this.setState({ particularLoan:res.data.data, loading: false}))
    }
  }

  approveCredit = () => {

  }

  // onSubmit = (e) => {
  //   e.preventDefault();
  //   this.fetchSpendKeys(this.state.currentUser.user_details.bnu_address)
  //   console.log(this.state.spendKeys)
  // }

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

  fetchSpendKeys = (address) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ address: address})
    };

    fetch(`${remoteApiUrl}/loans/get_key/`, requestOptions)
      .then(results => {
          return results.json();
      })
      .then(data => {
        this.setState({ spend_keys:data.data }, () => {
          // console.log(data.data.spendpr_key)
          return data.data.spendpr_key;
        })
      });
  }

  fetchSpendToken = (address) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ method: "generateToken", address: address})
    };

    fetch('https://tokyo.adin.ug/api/node/mobile_api.php', requestOptions)
      .then(results => {
        return results.json()
      })
      .then(data => {
        console.log(data.response.token);
        return data.response.token;
      })
      .then(token => {
        let hash = sha256.create();
        hash.update(this.state.spend_keys.spendp_key+token);
        console.log(hash.hex());
        this.setState({ oauthHash:hash.hex() });
        this.setState({ gotToken: true });
        return hash.hex();
      })
  }

  makeBlockchainCall = (oauth, from, to, amount) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ method: "createMobileTransaction", oauth: oauth, from: from, to: to, amount: amount})
    };

    fetch('https://tokyo.adin.ug/api/node/mobile_api.php', requestOptions)
      .then(results => {
        return results.json()
      })
      .then(data => {
        console.log(data) 
        return data
      });
  }

  handleClose = () => {
    this.setState({ gotToken: false });
    this.setState({ show: false });
  }

  approveCredit = () => {

    this.makeBlockchainCall(this.state.oauthHash, this.state.currentUser.user_details.bnu_address, this.state.particularLoan.borrower_address, this.state.particularLoan.loan_amount, (data) => {

      this.setState({ gotToken: false });

      const _notificationSystem = this.refs.notificationSystem;
      _notificationSystem.addNotification({
        title: <span data-notify="icon" className="pe-7s-gift" />,
        message: (
          <div>
            Loan of amount <b>{this.state.amount}</b> has been disbursed successfully
          </div>
        ),
        level: "success",
        position: "tr",
        autoDismiss: 10
        
      });
      this.setState({ _notificationSystem: this.refs.notificationSystem });
    })
  }

  handleShow(e) {
    e.preventDefault();
    this.setState({ show: true });
    this.fetchSpendToken(this.state.currentUser.user_details.bnu_address)
    this.fetchSpendKeys(this.state.currentUser.user_details.bnu_address)
  }
  
  render() {
    const { particularLoan, loading, gotToken, userBalance } = this.state;
    
    if (loading) return <Loader />;
      
    return (
      <div className="content">
      <NotificationSystem ref="notificationSystem" style={style}/>
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
                  <form onSubmit={this.handleShow}>
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

                    {parseFloat(particularLoan.loan_amount) < parseFloat(userBalance) ? (
                        <Button bsStyle="info" fill type="submit" active>
                          Approve Credit
                        </Button>
                    ) : (
                      <Button bsStyle="info" fill type="submit" disabled>
                        Approve Credit
                      </Button>
                    )}

                    <div className="clearfix" />
                  </form>
                }
              />
              <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Credit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>You are approving this credit request</h4>
                <p>
                  Borrower: {particularLoan.borrower_address.slice(0, 40)}
                </p>

                <p>Amount: {particularLoan.loan_amount}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Decline</Button>
                <Button bsStyle="primary" onClick={this.approveCredit} disabled={gotToken==false}>Approve</Button>
              </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}