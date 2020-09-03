import React from "react"
import { Modal } from "react-bootstrap"

export default function ModalFeedback(props) {
  return (
    <>
      <Modal
        show={props.isOpen}
        onHide={() => {
          props.setIsOpen(false)
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal! Woohoo, you're reading
          this text in a modal!Woohoo, you're reading this text in a
          modal!Woohoo, you're reading this text in a modal!Woohoo, you're
          reading this text in a modal!Woohoo, you're reading this text in a
          modal!Woohoo, you're reading this text in a modal!Woohoo, you're
          reading this text in a modal!
        </Modal.Body>
      </Modal>
    </>
  )
}
