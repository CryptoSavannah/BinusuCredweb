import React, { Component } from "react";
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl, Modal } from "react-bootstrap";
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
import { sha256 } from 'js-sha256';

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
const remoteApiUrl = "https://test.credit.binusu.kapsonlabs.ml/api/v1"

export default class BorrowingConfirmDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      repayment_history: [],
      currentUser: authenticationService.currentUserValue,
      loanId: this.props.location.state,
      particularLoan: [],
      spend_keys: [],
      oauthHash:'',
      show: false,
      gotToken: false,
      userBalance: '',
      paymentMethod: '',
      currency: '',
      amount: '',
      userBalance: '',
      gotToken: false,
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount() {
    if(this.state.loanId!=null){
      const loanid = this.state.loanId.unpaidloanId
      this.getAddressBalance();
      this.fetchRepaymentsHistory(loanid);

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
        if(data.status=="success"){
          console.log(data.response.receipt)
          this.updateLoanStatus(this.state.loanId.unpaidloanId  , this.state.currentUser.user_details.bnu_address, this.state.amount)

        }
      });
  }

  updateLoanStatus = (loan_id, paying_address, amount) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(this.state.currentUser.token.token) 
      },
      body: JSON.stringify({ loan_id: loan_id, paying_address: paying_address, amount: amount})
    };

    fetch(`${remoteApiUrl}/loans/repayment/`, requestOptions)
      .then(results => {
          return results.json();
      })
      .then(data => {
        return data
      });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleClose = () => {
    this.setState({ gotToken: false });
    this.setState({ show: false });
  }

  approveCredit = () => {

    this.makeBlockchainCall(this.state.oauthHash, this.state.currentUser.user_details.bnu_address, this.state.particularLoan.borrower_address, this.state.amount)
      
    this.setState({ gotToken: false });

    // const _notificationSystem = this.refs.notificationSystem;
    // _notificationSystem.addNotification({
    //   title: <span data-notify="icon" className="pe-7s-gift" />,
    //   message: (
    //     <div>
    //       Loan of amount <b>{this.state.amount}</b> has been disbursed successfully
    //     </div>
    //   ),
    //   level: "success",
    //   position: "tr",
    //   autoDismiss: 10
      
    // });

    // this.setState({ _notificationSystem: this.refs.notificationSystem });

    this.props.history.push('/admin/borrowing')

  }

  handleShow(e) {
    e.preventDefault();
    this.setState({ show: true });
    this.fetchSpendToken(this.state.currentUser.user_details.bnu_address)
    this.fetchSpendKeys(this.state.currentUser.user_details.bnu_address)
  }
  
  render() {
    const { particularLoan, repayment_history, amount, userBalance, gotToken } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
                title="Make Loan Repayment"
                content={
                  <form onSubmit={this.handleShow}>
                    <Col lg={6} sm={6}>
                    <FormGroup controlId="formControlsSelect">
                      <ControlLabel>Select Payment Method</ControlLabel>
                      <FormControl name="paymentMethod" componentClass="select" placeholder="select" onChange={this.onChange}>
                        <option value="select">select payment method</option>
                        <option value="credit">FROM CREDIT BALANCE</option>
                      </FormControl>
                    </FormGroup>
                    </Col>

                    <Col lg={6} sm={6}>
                    <FormGroup controlId="formControlsSelect">
                      <ControlLabel>Select Currency</ControlLabel>
                      <FormControl name="currency" componentClass="select" placeholder="select" onChange={this.onChange}>
                        <option value="select">select currency</option>
                        <option value="BNU">BNU</option>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="LTC">LTC</option>
                      </FormControl>
                    </FormGroup>
                    </Col>

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Amount",
                          type: "text",
                          name: "amount",
                          bsClass: "form-control",
                          placeholder: "Installment Amount",
                          onChange: this.onChange,
                        },
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

                    {parseFloat(amount) < parseFloat(userBalance) ? (
                        <Button bsStyle="info" fill type="submit" active>
                          Approve Credit Repayment
                        </Button>
                    ) : (
                      <Button bsStyle="info" fill type="submit" disabled>
                        Approve Credit Repayment
                      </Button>
                    )}
                    <div className="clearfix" />
                  </form>
                }
              />
              <Col lg={6} sm={6}>
                <StatsCard
                    bigIcon={<i className="pe-7s-cash text-success" />}
                    statsText="Loan Amount"
                    statsValue={particularLoan.expected_amount}
                    statsIcon={<i className="fa fa-clock-o" />}
                />
              </Col>
              <Col lg={6} sm={6}>
                <StatsCard
                    bigIcon={<i className="pe-7s-cash text-danger" />}
                    statsText="Outstanding"
                    statsValue={particularLoan.outstanding_amount}
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

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Repayment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>You are approving this repayment request</h4>
                <p>
                  Lender: 
                </p>

                <p>Amount: {amount}</p>
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