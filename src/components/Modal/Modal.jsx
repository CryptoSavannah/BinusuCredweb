import React from "react";
import {Modal, Button} from "react-bootstrap";

function DetailModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{props.address}</h5>
        <h5>Amount :{props.amount}</h5>
        <h5>Duration: {props.duration}</h5>
        <h5>CreditScore: {props.creditScore}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
  
export default DetailModal;