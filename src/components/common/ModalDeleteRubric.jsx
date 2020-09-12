import React from "react"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"
import axios from "axios"
import { useNavigate } from "@reach/router"
export default function ModalDeleteRubric(props) {
  let navigate = useNavigate()
  
  async function deleteRubric() {
    const rubric_id= props.toDelete.rubric_id;
    const data ={
      rubric_id 

    }
    console.log(data)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/rubric/delete`,data)
      if (response.status === 200) {
        alert("Delete Success.")
        navigate("/createassignment")
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (

    <Modal
      show={props.isOpen}
      onHide={() => { props.setIsOpen(false) }}>
      <Modal.Header closeButton>
        <Modal.Title>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this rubric?</Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="mx-2">
          <Buttons onClick={() => props.setIsOpen(false)} menu="Cancle" />
        </div>
        <div className="mx-2">
          <Buttons
            color="secondary"
            onClick={(event) => deleteRubric(event)}
            menu="Delete"
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
