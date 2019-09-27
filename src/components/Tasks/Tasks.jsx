import React, { Component, useEffect } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import DetailModal from "components/Modal/Modal.jsx"
import { Link } from "react-router-dom";

export class Tasks extends Component {

    state = {
      tasks: [],
      tasks_title: [
        ['ipKAU456789876543456787iuygbhjuygfvg789767887676761', "20,000", "2.2%", "10 days", "700"],
        ["ipKAU456789876543456787iuygbhjuygfvg789767887676762", "25,000", "1.8%", "15 days", "700"],
        ["ipKAU456789876543456787iuygbhjuygfvg789767887676763", "10,000", "1.5%", "30 days", "620"],
        ["ipKAU456789876543456787iuygbhjuygfvg789767887676764", "30,000", "1.2%", "12 days", "615"],
        ['ipKAU456789876543456787iuygbhjuygfvg789767887676765', "35,000", "0.7%", "2 days", "600"],
        ["ipKAU456789876543456787iuygbhjuygfvg789767887676766", "15,000", "2.5%", "4 days", "750"]
      ]
    }

    removeBorrower = () => {
      console.log(this.state.tasks_title)
    }

    render() {

    
    const edit = <Tooltip id="edit_tooltip">View Details</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;

    var number;
    for (var i = 0; i < this.state.tasks_title.length; i++) {
      number = "checkbox" + i;
      this.state.tasks.push(
        <tr key={i}>
          <td>
            <Checkbox
              number={number}
              isChecked={i === 1 || i === 2 ? true : false}
            />
          </td>
          <td><Link to="/admin/confirm_details">{this.state.tasks_title[i][0]}</Link></td>
          <td>{this.state.tasks_title[i][1]}</td>
          <td>{this.state.tasks_title[i][2]}</td>
          <td>{this.state.tasks_title[i][3]}</td>
          <td>{this.state.tasks_title[i][4]}</td>
          <td className="td-actions text-right">

            <OverlayTrigger placement="top" overlay={remove}>
              <Button onClick={this.removeBorrower} bsStyle="danger" simple type="button" bsSize="xs">
                <i className="fa fa-times" />
              </Button>
            </OverlayTrigger>

          </td>
        </tr>
      );
    }

    return (<tbody>{this.state.tasks}</tbody>);
  }
}
