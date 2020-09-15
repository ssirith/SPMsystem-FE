import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined"
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined"
export default function ModalFeedback(props) {
  const [counter, setCounter] = useState(0)

  function nextFeedback() {
    if (
      counter > props.feedback.length - 1 ||
      counter == props.feedback.length - 1
    ) {
      setCounter(0)
      console.log("too much")
    } else if (counter < props.feedback.length - 1) {
      setCounter(counter + 1)
    }
  }
  function prevFeedback() {
    if (counter >= props.feedback.length - 1) {
      setCounter(counter - 1)
    } else if (counter == 0) {
      setCounter(props.feedback.length - 1)
      console.log("already 0")
    }
  }
  return (
    <>
      {console.log("counter", counter)}
      {console.log("length", props.feedback)}
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
          <Modal.Title>
            {`Feedback`}
            <ArrowBackOutlinedIcon className='mx-2'
            fontSize='small'
              style={{ cursor: "pointer", backgroundColor:'#336699',borderRadius:'50%',color:'white'  }}
              onClick={() => {
                prevFeedback()
              }}
            /> &nbsp;
            <ArrowForwardOutlinedIcon
            fontSize='small'
              style={{ cursor: "pointer", backgroundColor:'#336699',borderRadius:'50%',color:'white' }}
              onClick={() => {
                nextFeedback()
              }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.feedback.length!=0&&(<p className="text-break">{props.feedback[counter].feedback_detail}</p>)}
            
        </Modal.Body>
      </Modal>
    </>
  )
}
