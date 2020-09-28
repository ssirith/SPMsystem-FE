import React, { useState, useRef, useEffect, useCallback } from "react"
import { Link } from "@reach/router"
import dayjs from "dayjs"
import Buttons from "./Buttons"
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory"
import DetailsIcon from "@material-ui/icons/Details"
import FolderIcon from "@material-ui/icons/Folder"
import DeleteIcon from "@material-ui/icons/Delete"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import ModalFeedback from "./ModalFeedback"
import ModalRubric from "./ModalRubric"
import axios from "axios"

export default function AssignmentTable(props) {
  const [expanded, Setexpanded] = useState(false)
  const expanderBody = useRef()
  const [isPrefetch, setIsPreFetch] = useState(false)

  // const fetchData = useCallback(async () => {
  //   try {
  //     setIsPreFetch(true)

  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_BE}/assignments/${props.assignment.assignment_id}/${props.user.id}`
  //     )
  //     SetAssignment(response.data)

  //     setFilefromBE(response.data.file_assignment)
  //     console.log(
  //       response.data.file_assignment,
  //       "response.data.file_assignment"
  //     )

  //     loopCriterions(response.data.rubric)

  //     setIsPreFetch(false)

  //   } catch (err) {
  //     console.log(err)
  //   }
  // })

  // useEffect(() => {
  //   fetchData()
  // }, [])

  function toggleExpander(e) {
    if (!expanded) {
      Setexpanded(true)
    } else {
      Setexpanded(false)
    }
  }

  if (isPrefetch) {
    return <></>
  }

  return (
    <>
      <tr key="main" onClick={toggleExpander}>
        <td className='pl-5'>{props.annoucement.topic}</td>
        <td className="uk-text-nowrap"></td>
        <td className="uk-text-nowrap"></td>
        <td className="uk-text-nowrap"></td>
        <td className="uk-text-nowrap"></td>
        <td className="uk-text-nowrap"></td>
        <td>
          <div className='float-right'>
            {expanded ? (
            <RemoveIcon color="primary" />
          ) : (
            <AddIcon color="primary" />
          )}
          </div>
          
        </td>
      </tr>

      {expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={7}>
            <div ref={expanderBody} className="inner uk-grid">
              <div className="uk-width-1-4 uk-text-center text-break">
                <p>{props.annoucement.detail}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
