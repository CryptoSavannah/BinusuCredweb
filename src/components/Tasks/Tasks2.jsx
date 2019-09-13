import React, { Component, useEffect } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from "react-router-dom";

export function Tasks2() {

  const [modalShow, setModalShow] = React.useState(false);

    let tasks = [];

    
    const edit = <Tooltip id="edit_tooltip">View Details</Tooltip>;
    const remove = <Tooltip id="pay_loan">Pay Loan</Tooltip>;
    
    const tasks_title = [
      ['ipKAU456789876543456787iuygbhjuygfvg789767887676765', "20,500", "10 days"],
      ["ipKAU456789876543456787iuygbhjuygfvg789767887676765", "25,500", "15 days"],
    ];

    var number;
    for (var i = 0; i < tasks_title.length; i++) {
      number = "checkbox" + i;
      tasks.push(
        <tr key={i}>
          <td>
            <Checkbox
              number={number}
              isChecked={i === 1 || i === 2 ? true : false}
            />
          </td>
          <td><Link to="/admin/pay_credit">{tasks_title[i][0]}</Link></td>
          <td>{tasks_title[i][1]}</td>
          <td>{tasks_title[i][2]}</td>
          <td className="td-actions text-right">

            <OverlayTrigger placement="top" overlay={remove}>
              <Button bsStyle="danger" simple type="button" bsSize="xs">
                <i className="pe-7s-play" />
              </Button>
            </OverlayTrigger>

          </td>
        </tr>
      );
    }

    return <tbody>{tasks}</tbody>;
}
