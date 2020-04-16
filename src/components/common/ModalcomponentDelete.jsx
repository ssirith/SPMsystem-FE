import React from "react"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"

export default function ModalComponent(props) {
  return (
    <Modal
      show={props.isOpen}
      onHide={() => {
        props.setIsOpen(false)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this project?</Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <div className='mx-2'>
           <Buttons onClick={()=>props.setIsOpen(false)} menu="Cancle" />
           </div>
           <div className='mx-2'>
          <Buttons color="secondary" onClick={()=> console.log("Delete")} menu="Delete" />
         </div>
      </Modal.Footer>
    </Modal>
  )
}
