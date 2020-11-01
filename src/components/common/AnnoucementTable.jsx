import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react"
import Cookie from "js-cookie"
import { Link } from "@reach/router"
import Swal from 'sweetalert2'
import Buttons from "./Buttons"
import axios from "axios"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import ModalDeleteAnnouncement from "./ModalDeleteAnnouncement"
import FolderIcon from "@material-ui/icons/Folder"
import { UserContext } from "../../UserContext"
export default function AnnouncementTable(props) {
  const [announcement, SetAnnouncement] = useState({})
  const [expanded, Setexpanded] = useState(false)
  const expanderBody = useRef()
  const [isPrefetch, setIsPreFetch] = useState(false)
  const { user, setUser } = useContext(UserContext)
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",    
  }
  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      const response = await axios.get(
        `${process.env.REACT_APP_API_BE}/announcement/${props.announcement.announcement_id}`
      ,{headers})
      SetAnnouncement(response.data)
      setIsPreFetch(false)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again.',
      })
      console.log(err)
    }
  })
  useEffect(() => {
    fetchData()
  }, [])

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
  // console.log(props.announcements)
  return (
    <>
    
      <tr key="main" onClick={toggleExpander}>
        <td className="pl-5">{props.announcement.announcement_title}</td>
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
      {user&&user.user_type === "Student" ? (
        <>
          {expanded && (
            <tr className="expandable" key="tr-expander">
              <td className="uk-background-muted" colSpan={7}>
                <div ref={expanderBody} className="inner uk-grid">
                  <div className="container">
                    <div
                      className="uk-width-1-4 uk-text-center text-break"
                      // style={{ border: "red 1px solid" }}
                    >
                      <p>{props.announcement.announcement_detail}</p>
                    </div>
                    <div className="row pl-3">
                      <div
                      // style={{ border: "green 1px solid" }}
                      >
                        <p>Attachment:&nbsp;</p>
                      </div>
                      {props.announcement && (
                        <div>
                          {announcement.attachment.map((att, index) => {
                            return (
                              <>
                                <FolderIcon className="primary" />
                                &nbsp;
                                <a
                                  href={`http://127.0.0.1:8000/storage/${att.announcement_file}`}
                                  download
                                  target="_blank"
                                >
                                  {att.announcement_file_name}
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
                  <div className="container">
                    <div className="uk-width-1-4 uk-text-center text-break">
                      <p>{props.announcement.announcement_detail}</p>
                    </div>

                    <div className="row pl-3">
                      <div>
                        <p>Attachment:&nbsp;</p>
                      </div>

                      {announcement && (
                        <div>
                          {announcement.attachment.map((att, index) => {
                            return (
                              <div key={index}>
                                <FolderIcon className="primary" />
                                <a
                                  href={`http://127.0.0.1:8000/storage/${att.announcement_file}`}
                                  download
                                  target="_blank"
                                >
                                  {att.announcement_file_name.substring(0, 25)}
                                  <br></br>
                                </a>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                    <div className="col-12 mx-auto my-4">
                      <div className="row">
                        <div className="col-12 text-center">
                          <Link
                            className="mr-2"
                            to={`/editannouncement/${props.announcement.announcement_id}`}
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
                            toDelete={props.announcement.announcement_id}
                          />
                        </div>
                      </div>
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
