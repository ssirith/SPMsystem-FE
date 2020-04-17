import React from "react"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"
import axios from 'axios'
export default function ModalComponentDelete(props) {
  function deleteProject(value){
    const temp = {
     project_id: props.toDelete.project_id
    }
    console.log(temp)
    axios.delete(`http://127.0.0.1:8000/api/projects/edit/IT01`, temp)
  }
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
          <Buttons color="secondary" onClick={(event) => deleteProject(event)} menu="Delete" />
         </div>
      </Modal.Footer>
    </Modal>
  )
}
