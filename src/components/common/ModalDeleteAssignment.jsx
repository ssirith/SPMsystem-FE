import React from "react"
import Cookie from "js-cookie"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Swal from 'sweetalert2'
import axios from "axios"
import { useNavigate } from "@reach/router"
export default function ModalDeleteAssignment(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  let navigate=useNavigate()  
  async function deleteAssignment() {
    const idForDelete = {
        assignment_id: props.toDelete
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/assignments/delete`,
        idForDelete,{headers}
      )
      
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Save!',
          text: 'Delete Success.',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false
        })

        setTimeout(() => {
          navigate("/assignments")
        }, 2000);
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again.',
      })
      // console.log(err)
    }
  }
  return (
    
    <Modal
      show={props.isOpen}
      onHide={() => {props.setIsOpen(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this assignment?</Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="mx-2">
          <Buttons onClick={() => props.setIsOpen(false)} menu="Cancle" />
        </div>
        <div className="mx-2">
          <Buttons
            color="secondary"
            onClick={(event) => deleteAssignment(event)}
            menu="Delete"
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
