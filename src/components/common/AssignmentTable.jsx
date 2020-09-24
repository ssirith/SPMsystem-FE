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
  const uploadFileRef = useRef()
  const [isPrefetch, setIsPreFetch] = useState(false)
  const [newCriterions, setNewCriterions] = useState([])
  var thisDay = dayjs(new Date()).format("YYYY-M-D HH:mm")
  var dueDate = props.assignment.date_time
  const mockFeedback = [
    {
      author: "Jame",
      detail:
        "sadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasdsadsadasdasdadasdasdasdasd",
    },
    {
      author: "Joel",
      detail: "21321312321312313131231231",
    },
  ]

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
  console.log(assignment)
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

  // console.log(selectedFile, "selectedFile")

  function handleUpload() {
    uploadFileRef.current.click()
  }
  function deleteFile(index) {
    selectedFile.splice(index, 1)
    setSelectedFile([...selectedFile])

    // ทำแบบข้างล่างได้นะ ลองแก้ดู จะได้ไม่พลาด
  }
  function deleteFileFromBE(file) {
    const newDeleteSeletedFile = [...deleteSelectedFile]
    const newFileFromBE = [...filefromBE]

    newDeleteSeletedFile.push(file.send_assignment_id) // fileFromBE
    const seletedFile = newFileFromBE.filter(
      (files) => files.send_assignment_id !== file.send_assignment_id
    )

    setFilefromBE(seletedFile) //แทนที่ค่าเก่าใน BE ด้วยค่า selectfile
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
  async function upLoad() {
    try {
      var status = ""
      if (dayjs().isBefore(dueDate, thisDay)) {
        status = "Submitted"
        console.log("in if")
      } else if (dayjs().isAfter(thisDay, dueDate)) {
        status = "Submitted Late"
        console.log("in else")
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
  function handleToggle() {
    if (selectedFile.length != 0) {
      upLoad()
    } else {
      alert("No File selected, please select at least one file before submit")
    }
  }

  if (isPrefetch) {
    return <></>
  }

  return (
    <>
      {console.log(
        "this day is before duedate",
        dayjs().isBefore(thisDay, dueDate)
      )}
      {/* {console.log('res assigment',response.data)} */}
      {/* {console.log("criterions", rubric.criterions)} */}
      {/* {console.log("sort criterions", newCriterions)} */}
      {/* {console.log("rubric obj", rubric)} */}
      <tr key="main" onClick={toggleExpander}>
        <td className="uk-text-nowrap"></td>
        <td width="15%">{`Assignment: ${props.index}`}</td>
        <td>{props.assignment.assignment_title}</td>
        <td className="uk-text-nowrap"></td>
        <td width="5%">
          {assignment.status ? (
            assignment.status.status === "Submitted" ? (
              <FiberManualRecordIcon className="successStatus" />
            ) : (
                <FiberManualRecordIcon className="warning" />
              )
          ) : (
              <FiberManualRecordIcon
                color={
                  dayjs().isBefore(dueDate, thisDay) ? "disabled" : "secondary"
                }
              />
            )}
        </td>{" "}
        <td width="30%">{`Due ${dayjs(props.assignment.date_time).format(
          "YYYY MMMM, D / HH:mm A"
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
          <td className="uk-background-muted" colSpan={7}>
            <div ref={expanderBody} className="inner uk-grid">
              <div className="uk-width-1-4 uk-text-center">
                <small className="text-danger">{`by ${assignment.teacher.teacher_name
                  } on ${dayjs(props.assignment.created_at).format(
                    "MMMM DD, YYYY"
                  )} At ${dayjs(props.assignment.created_at).format(
                    "HH:mm A"
                  )} `}</small>
              </div>
              <div className="container row">
                <div className="col-8">
                  <div className="row">
                    <div className="col-2 p-0">
                      <p className="m-0">Due Date:&nbsp;</p>
                      <p className="m-0">Description:&nbsp;</p>
                    </div>
                    <div className="col-4 p-0">
                      <div className="d-flex">
                        &nbsp;
                        <p className="text-danger m-0">{` ${dayjs(
                        props.assignment.due_date
                      ).format("MMMM d, YYYY")} at ${dayjs(
                        props.assignment.date_time
                      ).format("HH:mm A")}`}</p>
                      </div>
                      <p className="text-break">
                        {props.assignment.assignment_detail}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 p-0">
                      <p>Attachment:&nbsp;</p>
                    </div>

                    <div className="col-4">
                      {assignment.attachment.map((a, index) => {
                        return (
                          <>
                            <a
                              href={`http://127.0.0.1:8000/storage/${a.attachment}`}
                              download
                              target="_blank"
                            >
                              {a.attachment_name}
                              <br></br>
                            </a>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 p-0">
                      <p>Rubric:&nbsp;</p>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <p
                      style={{ cursor: "pointer", color: "#3f51b5" }}
                      className="linkRubric"
                      onClick={() => {
                        setIsOpenRubric(true)
                      }}
                    >
                      View rubric(Click)
                    </p>
                    <ModalRubric
                      isOpen={isOpenRubric}
                      setIsOpen={setIsOpenRubric}
                      newCriterions={newCriterions}
                    />
                  </div>
                  <div className="row">
                    <div className="col-2 p-0">
                      <p>Score:&nbsp;</p>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    {console.log(assignment.assessment)}

                    {assignment && (
                      <p>
                        {assignment.status !== null ? (
                          assignment.assessment.length == 0 ? (
                            <div className="text-danger">Waitng for assessment</div>
                          ) : (
                              assignment.status.total_score !== null ? (assignment.status.total_score) : (<div className="text-danger">Waitng for assessment</div>)
                            )
                        ) : (
                          <div className="text-danger">Waitng for assessment</div>
                          )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-4">
                  <div className=" col-12 filearea">
                    <p className="pt-3">Your works</p>
                    <div className="fileContent ">
                      <ul className="list-unstyled">
                        {filefromBE.map((file, index) => {
                          if (file) {
                            return (
                              <>
                                <li key={index} className="li-Content">
                                  {" "}
                                  <FolderIcon className="primary" />
                                  &nbsp;
                                  <span>
                                    {file.send_assignment_name.substring(0, 20)}{" "}
                                    &nbsp;{"..."}
                                  </span>
                                  <div className="float-right">
                                    <DeleteIcon
                                      onClick={() => {
                                        deleteFileFromBE(file)
                                      }}
                                      style={{ cursor: "pointer" }}
                                      fontSize="small"
                                      color="error"
                                    />
                                  </div>
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
                                <li className="li-Content" key={index}>
                                  {" "}
                                  <FolderIcon className="primary" />
                                  &nbsp;
                                  <span>
                                    {file.name.substring(0, 20)} &nbsp;{" "}
                                  </span>
                                  <div className="float-right">
                                    <DeleteIcon
                                      onClick={() => {
                                        deleteFile(file)
                                      }}
                                      style={{ cursor: "pointer" }}
                                      fontSize="small"
                                      color="error"
                                    />
                                  </div>
                                  {/* <button
                                    className="no-bg float-right m-0"
                                    onClick={() => {
                                      deleteFile(index)
                                    }}
                                  > */}
                                  {/* </button> */}
                                </li>
                              </>
                            )
                          } else {
                            return <></>
                          }
                        })}
                      </ul>
                    </div>
                    <div className="col-12 text-center mb-3 p-0 uploadarea">
                      <input
                        required
                        value=""
                        type="file"
                        id="uploadfile"
                        onChange={(e) => uploadFile(e)}
                        ref={uploadFileRef}
                      />
                      <Buttons
                        fullWidth={true}
                        color=""
                        menu="+ Add"
                        onClick={() => handleUpload()}
                      />
                    </div>
                  </div>
                  <div className=" float-right pt-3">
                    <Buttons
                      style={{ backgroundColor: "green" }}
                      className="success"
                      menu="Feedback"
                      onClick={() => setIsOpenFeedback(true)}
                    />
                    <ModalFeedback
                      isOpen={isOpenFeedback}
                      setIsOpen={setIsOpenFeedback}
                      feedback={assignment.feedback}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 text-center mb-3">
              {assignment.status !== null ? (
                assignment.assessment.length == 0 ? (
                  <Buttons
                    color="primary"
                    menu="Submit"
                    onClick={() => handleToggle()}
                  />
                ) : (
                    assignment.status.total_score !== null ? (<Buttons className="bg-light" menu="Submit" disabled />) : (<Buttons className="bg-light" menu="Submit" disabled />)
                  )
              ) : (
                  <Buttons
                    color="primary"
                    menu="Submit"
                    onClick={() => handleToggle()}
                  />
                )}
              {/* {assignment && assignment.status === null ? (
                <Buttons
                  color="primary"
                  menu="Submit"
                  onClick={() => handleToggle()}
                />
              ) : (
                  assignment.status.total_score === null ? (<Buttons
                    color="primary"
                    menu="Submit"
                    onClick={() => handleToggle()}
                  />) : (<Buttons className="bg-light" menu="Submit" disabled />)

                )} */}
            </div>
          </td>
        </tr>
      )
      }
    </>
  )
}
