import React, { useState, useRef, useEffect } from "react"
import Buttons from "./Buttons"
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory"
import DetailsIcon from "@material-ui/icons/Details"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function AssignmentTable(props) {
  const [expanded, Setexpanded] = useState(false)
  const expanderBody = useRef()

  function toggleExpander(e) {
    if (!expanded) {
      Setexpanded(true)
    } else {
      Setexpanded(false)
    }
  }
  function handleToggle() {
    console.log("submit")
  }

  return (
    <>
      <tr key="main" onClick={toggleExpander}>
        <td>{`Assignment: ${props.index}`}</td>
        <td>{props.assignment.name}</td>
        <td className="uk-text-nowrap"></td>
        <td><FiberManualRecordIcon color="primary" /></td>
        <td>{`Due ${props.assignment.duedate}`}</td>
        <td>
          {expanded ? (
            <RemoveIcon color="primary" />
          ) : (
            <AddIcon color="primary" />
          )}
        </td>
      </tr>

      {expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref={expanderBody} className="inner uk-grid">
              <div className="uk-width-1-4 uk-text-center">
                <small className="text-danger">{`by Author name on "create date"`}</small>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-8 p-0">
                    <p>Due Date: {props.assignment.duedate}</p>
                    <p>{`Description: "Deatail Example"Deatail Example"`} </p>
                  </div>
                  <div className="col-4 uploadarea">
                    <p>Your works</p>
                    <div className="col-12 text-center mb-3">
                      <Buttons
                        fullWidth={true}
                        color=""
                        menu="+ Add"
                        onClick={() => handleToggle()}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className='col-8 p-0'>
                    <p>Attachment: example</p> 
                  </div>
                              
                  <div className="col-4 text-right p-0">
                    <Buttons
                      className="success"
                      menu="Feedback"
                      onClick={() => handleToggle()}
                    />
                  </div>
                </div>
                <div className="row">
                  <p>Rubric: </p>
                  <p
                    className="text-danger"
                    onClick={() => {
                      console.log("View rubric")
                    }}
                  >
                    {" "}
                    View rubric(Click)
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 text-center mb-3">
              <Buttons
                color="primary"
                menu="Save"
                onClick={() => handleToggle()}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
