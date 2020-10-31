import React from "react"
import Cookie from "js-cookie"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"
import axios from "axios"
import { useNavigate } from "@reach/router"
export default function ModalComponentDelete(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  let navigate=useNavigate()
  async function deleteProject(value) {
    
    const idForDelete = {
      project_id: props.toDelete.project_id,
    }
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/projects/delete`,
        idForDelete,{headers}
      )
      if (response.status === 200) {
        alert("Delete Success.")
        setTimeout(()=>{
          window.location.reload()
        },1000)
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
