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
    } else if (counter < props.feedback.length - 1) {
      setCounter(counter + 1)
    }
  }
  function prevFeedback() {
    if (counter >= props.feedback.length - 1) {
      setCounter(counter - 1)
    } else if (counter == 0) {
      setCounter(props.feedback.length - 1)
    }
  }
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
          <Modal.Title>
            {`Feedback`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.feedback.length!=0&&(<p className="text-break">{props.feedback[counter].feedback_detail}</p>)}
            <hr/>
          {props.feedback.length>1&&
            <div className='text-center'>
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
            </div>
            }
        </Modal.Body>
      </Modal>
    </>
  )
}
