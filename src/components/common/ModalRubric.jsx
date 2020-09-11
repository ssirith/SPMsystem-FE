import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import Table from "react-bootstrap/Table"

export default function ModalFeedback(props) {
  return (
    <>
      {/* {console.log('frommodal',props.newCriterions)} */}
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
          <Modal.Title>Criteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive="sm">
            <tbody>
              {props.newCriterions.map((criterion, index) => {
                return (
                  <>
                    <tr>
                      <td>{criterion.criteria_name}</td>
                      {criterion.criteria_detail.map((c, index) => {
                        return (
                          <>
                            <td className="text-center">
                              {c.score}
                              <br />
                              {c.detail}
                            </td>
                          </>
                        )
                      })}
                    </tr>

                  </>
                )

              })}




              {/* {props.newCriterions.map((criterion, index) => {
                  return (
                    <tr>
                    <td>{criterion.criteria_name}</td>
                    {criterion.map((c,index)=>{
                      return(
                        <>
                        <td className="text-center">
                        {criterion.criteria_score}
                        <br />
                        {criterion.criteria_detail}
                      </td>
                      </>
                      )
                    })}
                    </tr>
                  )
                })} */}

            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  )
}
