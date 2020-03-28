import React from "react";
import { Modal} from "react-bootstrap";
import Buttons from "./Buttons"
import Inputtext from "./Inputtext";

export default function ModalComponent(props) {
  return (
    <Modal
      show={props.isOpen}
      onHide={() => {
        props.setIsOpen(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body><Inputtext id="member" color='primary' placeholder="Search by name or ID"/></Modal.Body>
      <Modal.Footer>
        <Buttons color="primary" onClick={props.handleClose} menu="Save"/>
      </Modal.Footer>
    </Modal>
  );
}