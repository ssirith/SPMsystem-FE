import React, { useState, useCallback, useEffect, useContext, useRef } from "react"
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import Inputtext from "../components/common/Inputtext"
import Textarea from "../components/common/Textarea"
import { Card } from "react-bootstrap"
import Button from "@material-ui/core/Button"
import Buttons from "../components/common/Buttons"
import DueDate from "../components/common/DueDate"
import DropdownRubric from "../components/common/DropdownRubric"
import CreateRubric from "../components/common/CreateRubric"
import ModalAddReviewer from "../components/common/ModalAddReviewer"
import { Link, useNavigate, Redirect, Router } from "@reach/router"
import { UserContext } from "../UserContext"
import axios from "axios"
import ReviewerBox from "../components/common/ReviewerBox"
import ModalDeleteRubric from "../components/common/ModalDeleteRubric"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from "@material-ui/icons/Folder"
import TimePicker from '../components/common/TimePicker';
import { keys } from "@material-ui/core/styles/createBreakpoints"
import dayjs from "dayjs"
import { Container, Row, Col } from 'reactstrap';
// import { Router } from "@material-ui/icons"
export default function CreateAssignment() {
    let navigate = useNavigate()
    const inputRef = useRef()
    const { user, setUser } = useContext(UserContext)
    const [attachment, setAttachment] = useState([])
    const [isOpenAttachment, setIsOpenAttachment] = useState(false)
    const [isPreFetch, setIsPreFetch] = useState(false)
    const [isOpenReviewer, setIsOpenReviewer] = useState(false)
    const [assignment_title, setAssignment_title] = useState("")
    const [assignment_detail, setAssignment_detail] = useState("")
    const [due_date, setDue_date] = useState("")
    const [due_time, setDue_time] = useState("")
    const [reviewer, setReviewer] = useState([])
    const [showAllRubric, setShowAllRubric] = useState([])
    const [rubric, setRubric] = useState("")
    const [isOpenDeleteRubric, setIsOpenDeleteRubric] = useState(false)
    const fetchData = useCallback(async () => {
        setIsPreFetch(true)
        const rub = await axios.get(`${process.env.REACT_APP_API_BE}/rubric`)
        setShowAllRubric(rub.data)// ได้ array ของ rubric ทั้งหมด
        setIsPreFetch(false)
    }, [])
    useEffect(() => {
        fetchData()
    }, [])

    const handleAssignmentName = (event) => {
        setAssignment_title(event.target.value)
    }

    const handleDescription = (event) => {
        setAssignment_detail(event.target.value)
    }

    const uploadFiles = (event) => {
        if (event.target.files[0]) {
            let files = event.target.files[0]
            setAttachment([...attachment, files])
        }
    }

    const deleteFilesUpload = (data, index) => {
        attachment.splice(index, 1)
        setAttachment([...attachment])
    }

    const handleDuedate = (event) => {
        var date = dayjs(event.target.value).format('YYYY-MM-DD');
        setDue_date(date)
        console.log("due_date=>", due_date)
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

    function handleClickAdd(){
        inputRef.current.click()
    }

    async function handleSubmit() {
        const responsible_teacher = []
        reviewer.map((r, index) => responsible_teacher.push(r.teacher_id))
        const teacher_id = user.id
        const rubric_id = rubric.rubric_id
        const data = new FormData();
        data.append('assignment_title', assignment_title)
        data.append('assignment_detail', assignment_detail)
        data.append('due_date', due_date)
        data.append('due_time', due_time)
        data.append('teacher_id', teacher_id)
        data.append('rubric_id', rubric_id)
        if (attachment.length !== 0) {
            for (const acceptFile of attachment) {
                data.append('attachment[]', acceptFile)
            }
        } else {
            data.append('attachment[]', [])
        }
        if (responsible_teacher.length !== 0) {
            for (const acceptResponsible_teacher of responsible_teacher) {
                data.append('responsible_teacher[]', acceptResponsible_teacher)
            }
        } else {
            data.append('responsible_teacher[]', [])
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BE}/assignments`, data)
            if (response.status === 200) {
                alert("Create Success.")
                navigate("/Assignments")
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
                            pastref="/Assignments"
                            past="All Assignment"
                            current="Create Assignment"
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
                            defaultValue={assignment_title}
                            onChange={(event) => handleAssignmentName(event)}
                        />

                    </Col>
                </Row>
                <br />
                <Row >
                    <Col sm={1}>
                        Description:
                    </Col>
                    <Col sm={8}>
                        <Textarea
                            id="description"
                            label="Input Assignment Description"
                            defaultValue={assignment_detail}
                            onChange={(event) => handleDescription(event)}
                        />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col sm={1}>
                        Attachment:
                    </Col>
                    <Col sm={5}>
                        <Card style={{ marginLeft: 8 }}>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-12 text-center m-2">
                                        <input type="file" id="file"
                                            style={{ display: 'none' }}
                                            name="file"
                                            onChange={(e) => uploadFiles(e)}
                                            ref={inputRef}
                                        />
                                        <Buttons
                                            menu="+ Add "
                                            onClick={() => handleClickAdd()}
                                        />
                                    </div>
                                    <ul>
                                        {attachment && attachment.map((f, index) => {
                                            if (f) {
                                                return (
                                                    <>

                                                        <li key={index}>
                                                            &nbsp;
                                                            <FolderIcon className="primary" />
                                                            &nbsp;
                                                            {f.name}
                                                            &nbsp;
                                                            <button onClick={() => deleteFilesUpload(f, index)}>
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
                            defaultValue=""
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
                            defaultValue="HH:mm"
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
                    </Col>

                    <Col sm={2}>
                        <Buttons
                            menu="Edit"
                            color="primary"
                            onClick={() => setIsOpenReviewer(true)}
                        />
                        <ModalAddReviewer
                            isOpen={isOpenReviewer}
                            setIsOpen={setIsOpenReviewer}
                            addReviewer={addReviewer}
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
                        />
                        <Link className="col-12 text-center" to={`/createrubric`}>
                            Create New Rubric
                        </Link>
                    </Col>
                    <Col sm={3}>
                        {rubric.rubric_id ? (
                            <>
                                <button onClick={() => setEdit(rubric.rubric_id)}>
                                    <EditIcon color="primary" />
                                </button>
                        &nbsp;
                        <button onClick={() => setModalDelete(true)}>
                                    <DeleteIcon color="secondary" />
                                </button>
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
                            <Link className="mr-2" to="/Assignments">
                                <Buttons
                                    menu="Cancel"
                                    color="secondary"
                                />
                            </Link>

                            <Buttons
                                menu="Create"
                                color="primary"
                                onClick={(event) => handleSubmit(event)}
                            />

                        </div>
                    </div>
                </div>
                <br />
            </Container>
        </>
    )
}