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
  const [selectedFile, setSelectedFile] = useState([])
  const [filefromBE, setFilefromBE] = useState([])
  const [deleteSelectedFile, setDeleteSelectedFile] = useState([])
  const [assignment, SetAssignment] = useState({})
  const [expanded, Setexpanded] = useState(false)
  const [isOpenFeedback, setIsOpenFeedback] = useState(false)
  const [isOpenRubric, setIsOpenRubric] = useState(false)
  const expanderBody = useRef()
  const [isPrefetch, setIsPreFetch] = useState(false)
  const [rubric, setRubric] = useState({})
  const [newCriterions, setNewCriterions] = useState([])
  var thisDay = dayjs(new Date()).format("MMMM d, YYYY HH:mm A")
  var dueDate = dayjs(props.assignment.date_time).format("MMMM d, YYYY HH:mm A")

  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)

      // const response = await axios.get(
      //   `${process.env.REACT_APP_API_BE}/rubric/${props.assignment.rubric_id}`
      // ) อันนี้คือตอนดึงข้อมูลของ assignmentครับ แล้วอันไหนที่่ดึง file ที่เราอัพโหลด
      const response = await axios.get(
        `${process.env.REACT_APP_API_BE}/assignments/${props.assignment.assignment_id}/${props.user.id}`
      )
      SetAssignment(response.data)
      // console.log('file from be',response.data.file_assignment)
      setFilefromBE(response.data.file_assignment)
      console.log(
        response.data.file_assignment,
        "response.data.file_assignment"
      )
      // console.log("rubric from BE ", response.data)
      // setRubric(response.data.rubric)
      loopCriterions(response.data.rubric)

      setIsPreFetch(false)

      // console.log('new ', newRubric)
    } catch (err) {
      console.log(err)
    }
  })

  useEffect(() => {
    fetchData()
  }, [])

  function uploadFile(event) {
    // function นี้ป่ะ อันนี้คือuploadครับ ใช่ครับ
    if (event.target.files[0]) {
      const file = event.target.files[0]
      const newSeletedFile = [...selectedFile]
      newSeletedFile.push(file)
      setSelectedFile(newSeletedFile)
    } else {
      console.log("no selectedfile")
    }
  }

  console.log(selectedFile, "selectedFile")

  function deleteFile(index) {
    selectedFile.splice(index, 1)
    setSelectedFile([...selectedFile])

    // ทำแบบข้างล่างได้นะ ลองแก้ดู จะได้ไม่พลาด
  }
  function deleteFileFromBE(file) {
    const newDeleteSeletedFile = [...deleteSelectedFile]
    const newFileFromBE = [...filefromBE]

    newDeleteSeletedFile.push(file.send_assignment_id) // อันนี้ป่ะ
    const seletedFile = newFileFromBE.filter(
      (files) => files.send_assignment_id !== file.send_assignment_id
    )

    setFilefromBE(seletedFile)
    setDeleteSelectedFile(newDeleteSeletedFile)

    // deleteSelectedFile.push(filefromBE[index].send_assignment_id)
    // console.log("del", deleteSelectedFile)
    // filefromBE.splice(index, 1)
    // setFilefromBE([...filefromBE])
  }

  function loopCriterions(data) {
    var tempCriterions = []
    data.map((criterion, index) => {
      let idx = tempCriterions.findIndex(
        (item) => item.criteria_id === criterion.criteria_id
      )
      if (idx != -1) {
        tempCriterions[idx].criteria_detail.push({
          detail: criterion.criteria_detail,
          score: criterion.criteria_score,
        })
      } else {
        tempCriterions.push({
          criteria_id: criterion.criteria_id,
          criteria_name: criterion.criteria_name,
          criteria_detail: [
            {
              detail: criterion.criteria_detail,
              score: criterion.criteria_score,
            },
          ],
        })
      }
    })
    setNewCriterions(tempCriterions)
  }

  function toggleExpander(e) {
    if (!expanded) {
      Setexpanded(true)
    } else {
      Setexpanded(false)
    }
  }
  async function handleToggle() {
    try {
      var status = ""
      if (dayjs().isBefore(dueDate, thisDay)) {
        status = "Submitted"
      } else {
        status = "SubmittedLate"
      }
      const formData = new FormData()
      formData.append("assignment_id", assignment.assignment_id)
      formData.append("student_id", props.user.id)
      formData.append("status", status)
      if (selectedFile.length != 0) {
        for (const acceptFile of selectedFile) {
          formData.append("send_file_assignment[]", acceptFile) // ทำไมต้องมี [] อันนี้5555 ตอนนั้ผมลองใช้ดูแล้วมันได้ครับ555 เพราะว่าformat ที่เพื่อนตั้งไว้คือarray ที่เป็นfileด้วย
        }
      } else {
        console.log("no file to upload")
        formData.append("send_file_assignment[]", [])
      }
      if (deleteSelectedFile.length != 0) {
        for (const refuseFile of deleteSelectedFile) {
          formData.append("delete_file_assignment[]", refuseFile)
        }
      } else {
        console.log("no file to delete")
        formData.append("delete_file_assignment[]", [])
      }

      // const formData = {
      //   assignment_id: assignment.assignment_id,
      //   student_id: props.user.id,
      //   status: status,
      //   send_file_assignment: selectedFile,
      //   delete_file_assignment: deleteSelectedFile.map((file) => file),
      // }

      // console.log(formData.send_file_assignment, "formData");
      // const formsnet = new FormData(formData)
      // formsnet.append("send_file_assignment[]",selectedFile)
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/send_assignment`,
        formData
      )
      if (response.status === 200) {
        alert("Success")
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (isPrefetch) {
    return <></>
  }

  return (
    <>
      {/* {console.log('res assigment',response.data)} */}
      {/* {console.log("criterions", rubric.criterions)} */}
      {console.log("sort criterions", newCriterions)}
      {/* {console.log("rubric obj", rubric)} */}
      <tr key="main" onClick={toggleExpander}>
        <td>{`Assignment: ${props.index}`}</td>
        <td>{props.assignment.assignment_title}</td>
        <td className="uk-text-nowrap"></td>
        <td>
          {assignment.status ? (
            assignment.status.status === "Submitted" ? (
              <FiberManualRecordIcon color="primary" />
            ) : (
              <FiberManualRecordIcon className="warning" />
            )
          ) : (
            <FiberManualRecordIcon
              color={
                dayjs().isAfter(thisDay, dueDate) ? "disabled" : "secondary"
              }
            />
          )}
        </td>{" "}
        <td>{`Due ${dayjs(props.assignment.date_time).format(
          "MMMM d, YYYY / HH:mm A"
        )}`}</td>
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
                <small className="text-danger">{`by ${
                  assignment.teacher.teacher_name
                } on ${dayjs(props.assignment.created_at).format(
                  "MMMM DD, YYYY"
                )} At ${dayjs(props.assignment.created_at).format(
                  "HH:mm A"
                )} `}</small>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-8 p-0">
                    <div className="d-flex">
                      <p className="m-0">Due Date:&nbsp;</p>
                      <p className="text-danger m-0">{` ${dayjs(
                        props.assignment.due_date
                      ).format("MMMM d, YYYY")} at ${dayjs(
                        props.assignment.date_time
                      ).format("HH:mm A")}`}</p>
                    </div>

                    <p>
                      {`Description: ${props.assignment.assignment_detail}`}{" "}
                    </p>
                  </div>
                  <div className="col-4 uploadarea overflow-hidden">
                    <p>Your works</p>
                    <div className="fileContent ">
                      <ul className="list-unstyled">
                        {filefromBE.map((file, index) => {
                          if (file) {
                            return (
                              <>
                                <li key={index} className="d-inline-block">
                                  {" "}
                                  <FolderIcon className="primary" />
                                  &nbsp;{file.send_assignment_name} &nbsp;{" "}
                                  <button
                                    onClick={() => {
                                      deleteFileFromBE(file)
                                    }}
                                  >
                                    <DeleteIcon
                                      fontSize="small"
                                      color="error"
                                    />
                                  </button>
                                </li>
                              </>
                            )
                          } else {
                            return <></>
                          }
                        })}
                        {selectedFile.map((file, index) => {
                          if (file) {
                            return (
                              <>
                                <li key={index}>
                                  {" "}
                                  <FolderIcon className="primary" />
                                  &nbsp;{file.name} &nbsp;{" "}
                                  <button
                                    onClick={() => {
                                      deleteFile(index)
                                    }}
                                  >
                                    <DeleteIcon
                                      fontSize="small"
                                      color="error"
                                    />
                                  </button>
                                </li>
                              </>
                            )
                          } else {
                            return <></>
                          }
                        })}
                      </ul>
                    </div>
                    <div className="col-12 text-center mb-3">
                      <input
                        value=""
                        type="file"
                        id="uploadfile"
                        onChange={(e) => uploadFile(e)}
                      />
                      {/* <Buttons
                        fullWidth={true}
                        color=""
                        menu="+ Add"
                        onClick={() => handleToggle()}
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-8 p-0 d-flex">
                    <p>Attachment:&nbsp;</p>
                    {assignment.attachment.map((a, index) => {
                      return (
                        <>
                          <a
                            href={`http://127.0.0.1:8000/storage/attachments/${a.attachment_name}`}
                            download
                            target="_blank"
                          >
                            {a.attachment_name}&nbsp;
                          </a>
                        </>
                      )
                    })}
                  </div>

                  <div className="col-4 text-right p-0">
                    <Buttons
                      className="success"
                      menu="Feedback"
                      onClick={() => setIsOpenFeedback(true)}
                    />
                    <ModalFeedback
                      isOpen={isOpenFeedback}
                      setIsOpen={setIsOpenFeedback}
                    />
                  </div>
                </div>
                <div className="row">
                  <p>{`Rubric: `}</p>
                  <a
                    className="text-danger"
                    onClick={() => {
                      setIsOpenRubric(true)
                    }}
                  >
                    View rubric(Click)
                  </a>
                  <ModalRubric
                    isOpen={isOpenRubric}
                    setIsOpen={setIsOpenRubric}
                    newCriterions={newCriterions}
                  />
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
