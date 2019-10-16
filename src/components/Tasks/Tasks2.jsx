import React, { Component, useEffect } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from "react-router-dom";

export class Tasks2 extends Component {
  render() {  

    const edit = <Tooltip id="edit_tooltip">View Details</Tooltip>;
    const remove = <Tooltip id="pay_loan">Pay Loan</Tooltip>;

  
    return this.props.unpaidloans.map((unpaidloan) => (
      <tbody>
        <tr key={unpaidloan.id}>

        <td><Link to={{pathname: "/admin/pay_loan", state: {unpaidloanId: unpaidloan.id}}}>{unpaidloan.lending_address.slice(0, 40)}</Link></td>
        <td>{unpaidloan.expected_amount}</td>
        <td style={{"color":"red"}}>{unpaidloan.outstanding_amount}</td>
        <td>{unpaidloan.expected_payment_date}</td>
        {unpaidloan.loan_status==2 ? (
          <td style={{"color":"white", "background":"red"}}>{"Unpaid"}</td>
        ) : (
          <td style={{"color":"white", "background":"blue"}}>{"Under Payment"}</td>
        )}
  
        </tr>
      </tbody>
      ));
    }
  }
