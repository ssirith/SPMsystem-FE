import React, { useState } from "react"
import Cookie from "js-cookie"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "@reach/router"
import Loading from "./Loading"
export default function ModalDeleteRubric(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  let navigate = useNavigate()
  const [isPrefetch, setIsPreFetch] = useState(false)  
  async function deleteRubric() {
    const rubric_id= props.toDelete.rubric_id;
    const data ={
      rubric_id 

    }
    try {
      setIsPreFetch(true)
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/rubric/delete`,data,{headers})
      if (response.status === 200) {
        setIsPreFetch(false)
        Swal.fire({
          icon: 'success',
          title: 'Save!',
          text: 'Delete Success.',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false
        })

        setTimeout(() => {
          navigate("/createassignment")
        }, 2000);
      }
    } catch (err) {
      setIsPreFetch(false)
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again later.',
      })
      // console.log(err)
    }
  }

  if (isPrefetch) {
    return <>
      <Loading open={isPrefetch} />
    </>
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
