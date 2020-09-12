import React, { useState, useCallback, useEffect, useContext, useRef } from "react"
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import Inputtext from "../components/common/Inputtext"
import IconButton from '@material-ui/core/IconButton';
import Textarea from "../components/common/Textarea"
import { Card } from "react-bootstrap"
import Button from "@material-ui/core/Button"
import Buttons from "../components/common/Buttons"
import DueDate from "../components/common/DueDate"
import DropdownRubric from "../components/common/DropdownRubric"
import CreateRubric from "../components/common/CreateRubric"
import ModalEditReviewer from "../components/common/ModalEditReviewer"
import { Link, useNavigate, Redirect, Router } from "@reach/router"
import { UserContext } from "../UserContext"
import axios from "axios"
import ReviewerBox from "../components/common/ReviewerBox"
import ModalDeleteRubric from "../components/common/ModalDeleteRubric"
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from "@material-ui/icons/Folder"
import DeleteIcon from '@material-ui/icons/Delete';
import TimePicker from '../components/common/TimePicker';
import { keys } from "@material-ui/core/styles/createBreakpoints"
import dayjs from "dayjs"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'reactstrap';
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));
// import { Router } from "@material-ui/icons"
export default function CreateAssignment(props) {
    const classes = useStyles();
    let navigate = useNavigate()
    const inputRef = useRef()
    const { user, setUser } = useContext(UserContext)
    const [assignment, setAssignment] = useState({})
    const [attachmentFromBE, setAttachmentFromBE] = useState([])
    const [selectAttachment, setSelectAttachment] = useState([])
    const [delete_attachment, setDelete_attachment] = useState([])
    const [isPreFetch, setIsPreFetch] = useState(false)
    const [isOpenReviewer, setIsOpenReviewer] = useState(false)
    const [assignment_title, setAssignment_title] = useState("")
    const [assignment_detail, setAssignment_detail] = useState("")
    const [due_date, setDue_date] = useState("")
    const [due_time, setDue_time] = useState("")
    const [reviewer, setReviewer] = useState([])
    const [reviewerFromBE, setReviewerFromBE] = useState([])
    const [showAllRubric, setShowAllRubric] = useState([])
    const [delete_responsible_teacher, setDelete_responsible_teacher] = useState([])
    const [rubric, setRubric] = useState("")
    const [isOpenDeleteRubric, setIsOpenDeleteRubric] = useState(false)
    const fetchData = useCallback(async () => {
        setIsPreFetch(true)
        const rub = await axios.get(`${process.env.REACT_APP_API_BE}/rubric`)
        setShowAllRubric(rub.data)
        const teacehr = await axios.get(`${process.env.REACT_APP_API_BE}/teachers`)
        const res = await axios.get(`${process.env.REACT_APP_API_BE}/assignments/${props.id}`)
        setAssignment(res.data)
        setAssignment_title(res.data.assignment_title)
        setAssignment_detail(res.data.assignment_detail)
        setDue_date(res.data.due_date)
        setDue_time(res.data.due_time)
        setAttachmentFromBE(res.data.attachment)
        var newReviewer = []
        teacehr.data.map((t) => {
            res.data.resnponsible.map((r) => {
                if (t.teacher_id === r.resposible_teacher_id) {
                    newReviewer.push(t)
                    setReviewer(newReviewer)
                    setReviewerFromBE(newReviewer)
                }
            }
            )
        })
        rub.data.map((r) => {
            if (r.rubric_id === res.data.rubric_id) {
                setRubric(r)
            }
        })
        setIsPreFetch(false)
    }, [])
    
    useEffect(() => {
        fetchData()
    }, [])
    const checkRole = useCallback(() => {
        if (user.role === "student") {
          alert(`You dont'have permission to go this page.`)
          navigate("/")
        }
      })
    
      useEffect(() => {
        checkRole()
      }, [user])
    const handleAssignmentName = (event) => {
        setAssignment_title(event.target.value)
    }

    const handleDescription = (event) => {
        setAssignment_detail(event.target.value)
    }

    const uploadFiles = (event) => {
        if (event.target.files[0]) {
            let files = event.target.files[0]
            const newSelectAttachment = [...selectAttachment]
            newSelectAttachment.push(files)
            setSelectAttachment(newSelectAttachment)
        }
    }

    function deleteSelectFile(index) {
        selectAttachment.splice(index, 1)
        setSelectAttachment([...selectAttachment])
    }

    function deleteFilesFromBE(data) {
        const newDeleteSeletedFile = [...delete_attachment]
        const newAttachmentFromBE = [...attachmentFromBE]

        newDeleteSeletedFile.push(data.attachment_id) // del fileFromBE
        const seletedFile = newAttachmentFromBE.filter(
            (files) => files.attachment_id !== data.attachment_id
        )

        setAttachmentFromBE(seletedFile) //แทนที่ค่าเก่าใน BE ด้วยค่า selectfile ใหม่
        setDelete_attachment(newDeleteSeletedFile)
    }



    const handleDuedate = (event) => {
        var date = dayjs(event.target.value).format('YYYY-MM-DD');
        setDue_date(date)
    }

    const handleTimePicker = (event) => {
        var isTime = due_date + ' ' + event.target.value
        var sendTime = dayjs(isTime).format('HH:mm')
        setDue_time(sendTime)
    }

    function addReviewer(value) {
        let temp = []
        temp.push(value)
        setReviewer(...temp)
    }
    function deleteReviewer(value) {
        let temp = delete_responsible_teacher
        temp.push(value.teacher_id)
        setDelete_responsible_teacher(temp)

    }
    function setEdit(value) {
        if (value) {
            navigate(`/editrubric/${value}`)
        }
        else (alert("No rubric for editing !!"))
    }

    function setModalDelete(value) {
        if (rubric !== "") {
            setIsOpenDeleteRubric(value)
        }
        else (alert("No rubric for deleting !!"))
    }

    function handleClickAdd() {
        inputRef.current.click()
    }

    async function handleSubmit() {
        const assignment_id = assignment.assignment_id
        let sendReviewer = []
        if (reviewerFromBE.length !== 0) {
            reviewer.map(r => {
                if (!reviewerFromBE.some(item => item.teacher_id === r.teacher_id)) {
                    sendReviewer.push(r.teacher_id)

                }
            })
        }
        const teacher_id = user.id
        const rubric_id = rubric.rubric_id

        const data = new FormData();
        data.append('assignment_id', assignment_id)//assignment_id

        if (sendReviewer.length !== 0) {//responsible_teacher
            for (const acceptResponsible_teacher of sendReviewer) {
                data.append('responsible_teacher[]', acceptResponsible_teacher)
            }
        } else {
            data.append('responsible_teacher[]', [])
        }

        if (delete_responsible_teacher.length !== 0) {//delete_responsible_teacher
            for (const acceptDelete_responsible_teacher of delete_responsible_teacher) {
                data.append('delete_responsible_teacher[]', acceptDelete_responsible_teacher)
            }
        } else {
            data.append('delete_responsible_teacher[]', [])
        }

        if (selectAttachment.length !== 0) {//selectAttachment
            for (const acceptFile of selectAttachment) {
                data.append('attachment[]', acceptFile)
            }
        } else {
            data.append('attachment[]', [])
        }

        if (delete_attachment.length !== 0) {//delete_attachment
            for (const acceptDelete_attachment of delete_attachment) {
                data.append('delete_attachment[]', acceptDelete_attachment)
            }
        } else {
            data.append('delete_attachment[]', [])
        }

        data.append('assignment_title', assignment_title)//assignment_title
        data.append('assignment_detail', assignment_detail)//assignment_detail
        data.append('due_date', due_date)//due_date
        data.append('due_time', due_time)//due_time
        data.append('teacher_id', teacher_id)//teacher_id
        data.append('rubric_id', rubric_id)//rubric_id

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BE}/assignments/edit`, data)
            if (response.status === 200) {
                alert("Edit Success.")
                navigate(`assignments/${props.id}`)
                window.location.reload()
            }
        } catch (err) {
            alert("It's not success, Please check your input")
            console.error(err)
        }
    }

    if (isPreFetch) {
        return <></>
    }

    return (
        <>
            <Container>

                <Row>
                    <Col xs={12} md={8}>
                        <BreadcrumbNavString
                            pastref={`/assignments/ ${props.id}`}
                            past={`Assignment ${props.id}`}
                            current="Edit Assignment"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={8}>
                        <h5>Create New Assigment</h5>
                    </Col>
                </Row>

                <br />
                <Row style={{ alignItems: "center" }}>
                    <Col sm={1}>
                        Title:
                    </Col>
                    <Col sm={8}>
                        <Inputtext
                            id="assignmentname"
                            label="Input Assignment Name"
                            defaultValue={assignment.assignment_title}
                            onChange={(event) => handleAssignmentName(event)}
                        />

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={1}>
                        Description:
                    </Col>
                    <Col sm={8}>
                        <Textarea
                            id="description"
                            label="Input Assignment Description"
                            defaultValue={assignment.assignment_detail}
                            onChange={(event) => handleDescription(event)}
                        />
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col sm={5} style={{ marginLeft: 3 }}>
                        Attachment:
                    </Col>
                    <Col>
                        <Buttons
                            menu="Add"
                            color="primary"
                            onClick={() => handleClickAdd()}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={5}>
                        <Card style={{ marginLeft: 8 }}>
                            <Card.Body >
                                <div className="row">
                                    <div className="col-12 text-center m-2">
                                        <input type="file" id="file"
                                            style={{ display: 'none' }}
                                            name="file"
                                            onChange={(e) => uploadFiles(e)}
                                            ref={inputRef}
                                        />
                                    </div>
                                    <ul>
                                        {attachmentFromBE && attachmentFromBE.map((f, index) => {
                                            if (f) {
                                                return (
                                                    <>
                                                        <li key={index}>
                                                            &nbsp;
                                                            <FolderIcon className="primary" />
                                                            &nbsp;
                                                            {f.attachment_name}
                                                            {f.name}
                                                            &nbsp;
                                                            <button onClick={() => deleteFilesFromBE(f, index)}>
                                                                <DeleteIcon fontSize="small" color="error" />
                                                            </button>
                                                        </li>
                                                        <br />
                                                    </>
                                                )
                                            } else {
                                                return (<></>)
                                            }
                                        })}
                                        {selectAttachment.map((file, index) => {
                                            if (file) {
                                                return (
                                                    <>
                                                        <li key={index}>
                                                            &nbsp;
                                                            <FolderIcon className="primary" />
                                                            &nbsp;
                                                            {file.name}
                                                            &nbsp;
                                                            <button
                                                                onClick={() => {
                                                                    deleteSelectFile(index)
                                                                }}
                                                            >
                                                                <DeleteIcon
                                                                    fontSize="small"
                                                                    color="error"
                                                                />
                                                            </button>
                                                        </li>
                                                        <br />
                                                    </>
                                                )
                                            } else {
                                                return <></>
                                            }
                                        })}
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col sm={1.5} style={{ marginLeft: 15 }}>
                        Due Date:
                    </Col>
                    <Col sm={6} style={{ marginLeft: 17 }}>
                        <DueDate
                            id="date"
                            type="date"
                            defaultValue={assignment.due_date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => handleDuedate(event)}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={1.5} style={{ marginLeft: 15 }}>
                        Due Time:
                    </Col>
                    <Col sm={6} style={{ marginLeft: 17 }}>
                        <TimePicker
                            id="time"
                            type="time"
                            defaultValue={assignment.due_time}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => handleTimePicker(event)}
                        />
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col sm={5} style={{ marginLeft: 3 }}>
                        Reviewer:
                        <div style={{fontSize : '12px'}}>
                        (ผู้ประเมินคะแนน)
                        </div>
                    </Col>

                    <Col sm={2}>
                        <Buttons
                            menu="Edit"
                            color="primary"
                            onClick={() => setIsOpenReviewer(true)}
                        />
                        <ModalEditReviewer
                            isOpen={isOpenReviewer}
                            setIsOpen={setIsOpenReviewer}
                            addReviewer={addReviewer}
                            deleteReviewer={deleteReviewer}
                            header="Add Reviewer"
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={5} style={{ marginLeft: 11 }}>
                        <ReviewerBox title="Reviewer" reviewers={reviewer} />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col sm={1}>
                        Rubric:
                        </Col>
                    <Col sm={3} style={{ marginLeft: 3 }}>
                        <DropdownRubric
                            rubricList={showAllRubric}
                            rubric={rubric}
                            setRubric={setRubric}
                            value={rubric}
                        />
                        <Link className="col-12 text-center" to={`/createrubric`}>
                            Create New Rubric
                        </Link>
                    </Col>
                    <Col sm={3}>
                        {rubric.rubric_id ? (
                            <>
                                {/* <button onClick={() => setEdit(rubric.rubric_id)}>
                                    <EditIcon color="primary" />
                                </button> */}
                                <Button variant="outlined" size="small" className={classes.margin}>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => setEdit(rubric.rubric_id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Button>
                        &nbsp;
                        {/* <button onClick={() => setModalDelete(true)}>
                                    <DeleteIcon color="secondary" />
                                </button> */}
                                <Button variant="outlined" size="small" className={classes.margin}>
                                    <IconButton
                                        aria-label="delete"

                                        onClick={() => setModalDelete(true)}
                                        color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </Button>
                                <ModalDeleteRubric
                                    isOpen={isOpenDeleteRubric}
                                    setIsOpen={setIsOpenDeleteRubric}
                                    header="Confirmation"
                                    toDelete={rubric}
                                />
                            </>
                        ) : <></>}

                    </Col>
                </Row>
                <br />
                <hr style={{
                    color: '#C8C8C8',
                    backgroundColor: '#C8C8C8',
                    height: .5,
                    borderColor: '#C8C8C8'
                }} />
                <div className="col-12 mx-auto">
                    <div className="row">
                        <div className="col-12 text-center">
                            <Link className="mr-2" to="/assignments">
                                <Buttons
                                    menu="Cancel"
                                />
                            </Link>

                            <Buttons
                                menu="Save"
                                color="primary"
                                onClick={(event) => handleSubmit(event)}
                            />

                        </div>
                    </div>
                </div>
                <br />
            </Container >
        </>
    )
}