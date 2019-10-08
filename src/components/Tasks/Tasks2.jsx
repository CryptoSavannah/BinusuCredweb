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

        <td><Link to="#">{unpaidloan.lending_address.slice(0, 40)}</Link></td>
        <td>{unpaidloan.expected_amount}</td>
        <td>{unpaidloan.date_requested}</td>
        <td className="td-actions text-right">

          <OverlayTrigger placement="top" overlay={remove}>
            <Button bsStyle="danger" simple type="button" bsSize="xs">
              <i className="pe-7s-play" />
            </Button>
          </OverlayTrigger>

          </td>
        </tr>
      </tbody>
      ));
    }
  }
