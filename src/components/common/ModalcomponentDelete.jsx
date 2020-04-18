import React from "react"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"
import axios from "axios"
import { useNavigate } from "@reach/router"
export default function ModalComponentDelete(props) {
  let navigate=useNavigate()
  async function deleteProject(value) {
    
    const temp = {
      project_id: props.toDelete.project_id,
    }
    console.log(temp)
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/projects/delete`,
        temp
      )
      console.log(response)
      if (response.status === 200) {
        
        setTimeout(()=>{
          window.location.reload()
        },2000)
      }
    } catch (err) {
      console.log(err)
    }
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
      <Modal.Footer className="justify-content-center">
        <div className="mx-2">
          <Buttons onClick={() => props.setIsOpen(false)} menu="Cancle" />
        </div>
        <div className="mx-2">
          <Buttons
            color="secondary"
            onClick={(event) => deleteProject(event)}
            menu="Delete"
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
