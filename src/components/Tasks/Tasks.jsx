import React, { Component, useEffect } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import DetailModal from "components/Modal/Modal.jsx"
import { Link } from "react-router-dom";

export class Tasks extends Component {

    render() {

    
    const edit = <Tooltip id="edit_tooltip">View Details</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;

    return this.props.loans.map((loan) => (
      <tbody>
        <tr key={loan.id}>

          <td><Link to="/admin/confirm_details">{loan.borrower_address.slice(0, 33)}</Link></td>
          <td>{loan.loan_amount}</td>
          <td>{"undefined"}</td>
          <td>{"undefined"}</td>
          <td>{"undefined"}</td>
          <td className="td-actions text-right">

            <OverlayTrigger placement="top" overlay={remove}>
              <Button onClick={this.props.delLoan.bind(this, loan.id)} bsStyle="danger" simple type="button" bsSize="xs">
                <i className="fa fa-times" />
              </Button>
            </OverlayTrigger>

          </td>
        </tr>
      </tbody>
      ));
    }
  }
