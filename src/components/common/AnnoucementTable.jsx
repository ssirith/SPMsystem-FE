import React, { useState, useRef, useEffect, useCallback, useContext } from "react"
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
import ModalDeleteAnnouncement from "./ModalDeleteAnnouncement"
import ModalFeedback from "./ModalFeedback"
import ModalRubric from "./ModalRubric"
import axios from "axios"
import userEvent from "@testing-library/user-event"
import { UserContext } from "../../UserContext"
export default function AssignmentTable(props) {
  const [expanded, Setexpanded] = useState(false)
  const expanderBody = useRef()
  const [isPrefetch, setIsPreFetch] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
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
  console.log(props.announcements)
  return (
    <>
      <tr key="main" onClick={toggleExpander}>
        <td className='pl-5'>{props.announcements.announcement_title}</td>
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
      {user.role === "student" ? (
        <>
          {expanded && (
            <tr className="expandable" key="tr-expander">
              <td className="uk-background-muted" colSpan={7}>
                <div ref={expanderBody} className="inner uk-grid">
                  <div className="uk-width-1-4 uk-text-center text-break">
                    <p>{props.announcements.announcement_detail}</p>
                  </div>
                </div>
              </td>
            </tr>

          )}
        </>
      ) : (
          <>
            {expanded && (
              <tr className="expandable" key="tr-expander">
                <td className="uk-background-muted" colSpan={7}>
                  <div ref={expanderBody} className="inner uk-grid">
                    <div className="uk-width-1-4 uk-text-center text-break">
                      <p>{props.announcements.announcement_detail}</p>
                    </div>
                  </div>

                  <div className="col-12 mx-auto my-4">
                    <div className="row">
                      <div className="col-12 text-center">
                        <Link className="mr-2" to={`/editannouncement/${props.announcements.announcement_id}`}>
                          <Buttons
                            menu="Edit"
                          />
                        </Link>
                        <Buttons
                          menu="Delete"
                          color="secondary"
                          onClick={() => setIsOpenDelete(true)}
                        />
                        <ModalDeleteAnnouncement
                          isOpen={isOpenDelete}
                          setIsOpen={setIsOpenDelete}
                          header="Confirmation"
                          toDelete={props.announcements.announcement_id}
                        />
                      </div>
                    </div>
                  </div>

                </td>
              </tr>

            )}
          </>
        )}


    </>
  )
}
