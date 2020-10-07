import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react"
import { Link } from "@reach/router"
import dayjs from "dayjs"
import Buttons from "./Buttons"

import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import ModalDeleteAnnouncement from "./ModalDeleteAnnouncement"

import { UserContext } from "../../UserContext"
export default function AssignmentTable(props) {
  const [expanded, Setexpanded] = useState(false)
  const expanderBody = useRef()
  const [isPrefetch, setIsPreFetch] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const [isOpenDelete, setIsOpenDelete] = useState(false)


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
        <td className="pl-5">{props.announcements.announcement_title}</td>
        <td className="uk-text-nowrap"></td>
        <td className="uk-text-nowrap"></td>
        <td className="uk-text-nowrap"></td>
        <td className="uk-text-nowrap"></td>
        <td className="uk-text-nowrap"></td>
        <td>
          <div className="float-right">
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
                  <div className="container">
                    <div
                      className="uk-width-1-4 uk-text-center text-break"
                      style={{ border: "red 1px solid" }}
                    >
                      <p>{props.announcements.announcement_detail}</p>
                    </div>
                    <div className="row pl-3">
                      <div style={{ border: "green 1px solid" }}>
                        <p>Attachment:&nbsp;</p>
                      </div>
                      {props.Announcement && (
                        <div>
                          {props.Announcement.attachment.map((att, index) => {
                            return (
                              <>
                                <a
                                  href={`http://127.0.0.1:8000/storage/${att.attachment}`}
                                  download
                                  target="_blank"
                                >
                                  {att.attachment_name}
                                  <br></br>
                                </a>
                              </>
                            )
                          })}
                        </div>
                      )}
                    </div>
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
                      <Link
                        className="mr-2"
                        to={`/editannouncement/${props.announcements.announcement_id}`}
                      >
                        <Buttons menu="Edit" />
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
