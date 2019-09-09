import React, { Component, useEffect } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import DetailModal from "components/Modal/Modal.jsx"

export function Tasks() {

  const [modalShow, setModalShow] = React.useState(false);

    let tasks = [];

    
    const edit = <Tooltip id="edit_tooltip">View Details</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;
    
    const tasks_title = [
      ['ipKAU456789876543456787iuygbhjuygfvg789767887676765', "20,000", "10 days"],
      ["ipKAU456789876543456787iuygbhjuygfvg789767887676765", "25,000", "15 days"],
      ["ipKAU456789876543456787iuygbhjuygfvg789767887676765", "10,000", "30 days"],
      ["ipKAU456789876543456787iuygbhjuygfvg789767887676765", "30,000", "12 days"],
      ['ipKAU456789876543456787iuygbhjuygfvg789767887676765', "35,000", "2 days"],
      ["ipKAU456789876543456787iuygbhjuygfvg789767887676765", "15,000", "4 days"]
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
          <td>{tasks_title[i][0]}</td>
          <td>{tasks_title[i][1]}</td>
          <td>{tasks_title[i][2]}</td>
          <td className="td-actions text-right">
            <OverlayTrigger placement="top" overlay={edit}>
              <Button bsStyle="info" simple type="button" bsSize="xs" onClick={() => setModalShow(true)}>
                <i className="fa fa-edit" />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={remove}>
              <Button bsStyle="danger" simple type="button" bsSize="xs">
                <i className="fa fa-times" />
              </Button>
            </OverlayTrigger>

            <DetailModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              heading="Borrower Details"
              address={tasks_title[i][0]}
              amount={tasks_title[i][1]}
              duration={tasks_title[i][2]}
              creditScore="A"
            />

          </td>
        </tr>
      );
    }

    return <tbody>{tasks}</tbody>;
}
