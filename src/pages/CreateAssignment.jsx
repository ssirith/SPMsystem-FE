import React, { useState, useCallback, useEffect, useContext, useRef } from "react"
import Cookie from 'js-cookie'
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import Inputtext from "../components/common/Inputtext"
import Textarea from "../components/common/Textarea"
import { Card } from "react-bootstrap"
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button"
import Buttons from "../components/common/Buttons"
import DueDate from "../components/common/DueDate"
import DropdownRubric from "../components/common/DropdownRubric"
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
import dayjs from "dayjs"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'reactstrap';
import { Table } from "react-bootstrap"
import Loading from "../components/common/Loading"
import Swal from 'sweetalert2'
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));
export default function CreateAssignment() {
    const headers = {
        Authorization: `Bearer ${Cookie.get("jwt")}`,
        "Content-Type": "application/json",
        accept: "application/json",
    }
    const classes = useStyles();
    let navigate = useNavigate()
    const inputRef = useRef()
    const { user, setUser } = useContext(UserContext)
    //     const userBeforeParse=JSON.parse(localStorage.getItem('user'))
    //   const  [user, setUser ] = useState(userBeforeParse)
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
    const [criterion, setCriterion] = useState()
    const [rubric, setRubric] = useState("")
    const [isOpenDeleteRubric, setIsOpenDeleteRubric] = useState(false)

    const fetchData = useCallback(async () => {
        try {
            setIsPreFetch(true)
            const rub = await axios.get(`${process.env.REACT_APP_API_BE}/rubric`, { headers })
            setShowAllRubric(rub.data)// ได้ array ของ rubric ทั้งหมด
            setIsPreFetch(false)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oop...',
                text: 'Something went wrong, Please Try again later.',
            })
            // console.log(err)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        var criterions = [];
        showAllRubric.map((a) => {
            if (a.rubric_id === rubric.rubric_id) {
                async function refreshCriterion() {
                    const temp = await axios.get(`${process.env.REACT_APP_API_BE}/rubric/${rubric.rubric_id}`, { headers })
                    temp.data.criterions.map((c, index) => {
                        let idx = criterions.findIndex(item => item.criteria_id === c.criteria_id)
                        if (idx !== -1) {//0
                            criterions[idx].score.push(
                                {
                                    name: c.criteria_detail,
                                    value: c.criteria_score
                                }
                            )
                            criterions[idx].score.sort((a, b) => {
                                return a.value - b.value
                            })

                        } else {
                            criterions.push(
                                {
                                    criteria_id: c.criteria_id,
                                    criteria_name: c.criteria_name,
                                    score: [
                                        {
                                            name: c.criteria_detail,
                                            value: c.criteria_score
                                        }
                                    ]
                                }
                            )
                        }
                    })

                    setCriterion(criterions)
                }
                refreshCriterion()
            }

        })
    }, [rubric])

    const checkRole = useCallback(() => {
        if (user && user.user_type === "Student") {
            Swal.fire({
                icon: 'error',
                title: 'Oop...',
                text: `You dont'have permission to go this page.`,
            })
            navigate("/main")
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
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oop...',
                text: "No rubric for editing !!",
            })
        }

    }



    function setModalDelete(value) {
        if (rubric !== "") {
            setIsOpenDeleteRubric(value)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oop...',
                text: "No rubric for deleting !!",
            })
        }
    }

    function handleClickAdd() {
        inputRef.current.click()
    }
    async function handleSubmit() {
        setIsPreFetch(true)
        const responsible_teacher = []
        reviewer.map((r, index) => responsible_teacher.push(r.teacher_id))
        const rubric_id = rubric.rubric_id
        const data = new FormData();
        data.append('assignment_title', assignment_title)
        data.append('assignment_detail', assignment_detail)
        data.append('due_date', due_date)
        data.append('due_time', due_time)
        if (user.user_type === "Teacher") {
            data.append("teacher_id", user.user_id)
            data.append("aa_id", "")
        } else {
            data.append("teacher_id", "")
            data.append("aa_id", user.user_id)
        }
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
            const response = await axios.post(`${process.env.REACT_APP_API_BE}/assignments`, data, { headers })
            if (response.status === 200) {
                setIsPreFetch(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Save!',
                    text: 'Edit Success.',
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false
                })

                setTimeout(() => {
                    navigate("/assignments")
                }, 2000);
            }
        } catch (err) {
            console.error('create assignment page',err)
            setIsPreFetch(false)
            Swal.fire({
                icon: 'error',
                title: 'Oop...',
                text: 'Something went wrong, Please Try again later.',

            })
            navigate("/assignments")
        }

    }

    if (isPreFetch) {
        return <><Loading open={isPreFetch} /></>
    }

    return (
        <>
            <Container>

                <Row>
                    <Col xs={12} md={8}>
                        <BreadcrumbNavString
                            pastref="/assignments"
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
                        TiTle: <span className="text-danger">*</span>
                    </Col>
                    <Col sm={8} style={{ marginLeft: 5 }}>
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
                    <Col sm={1} >
                        Description:
                    </Col>
                    <Col sm={8} style={{ marginLeft: 5 }}>
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
                        <Card style={{ marginLeft: 13 }}>
                            <Card.Body>
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
                                        {attachment && attachment.map((f, index) => {
                                            if (f) {
                                                return (
                                                    <>
                                                        <li key={index}>
                                                            &nbsp;
                                                            <FolderIcon className="primary" />
                                                            &nbsp;
                                                            {f.name.substring(0, 25)}
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
                        Due Date:<span className="text-danger">*</span>
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
                        Due Time:<span className="text-danger">*</span>
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
                        Reviewer:<span className="text-danger">*</span>
                        <div style={{ fontSize: '12px' }}>
                            (ผู้ประเมินคะแนน)
                        </div>
                    </Col>

                    <Col sm={2}>
                        <Buttons
                            menu="Add"
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
                    <Col sm={5} style={{ marginLeft: 14 }}>
                        <ReviewerBox title="Reviewer" reviewers={reviewer} />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col sm={1}>
                        Rubric:<span className="text-danger">*</span>
                    </Col>
                    <Col sm={3} style={{ marginLeft: 6 }}>
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
                                <Button variant="outlined" size="small" className={classes.margin}>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => setEdit(rubric.rubric_id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Button>
                        &nbsp;
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
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={8}>
                        {criterion ? (
                            <Card style={{ marginLeft: 13 }}>
                                <Card.Body>
                                    <Table striped bordered hover responsive="sm">
                                        <tbody>
                                            {criterion && criterion.map((data, index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className='table-active' style={{ width: '20%' }}>{data.criteria_name}</td>
                                                            {data.score.map((s, pos) => {
                                                                return (
                                                                    <>
                                                                        <td className="text-center table-light" style={{ width: '15%' }}>
                                                                            {s.value}
                                                                            <br />
                                                                            {s.name}
                                                                        </td>
                                                                    </>
                                                                )
                                                            })}
                                                        </tr>
                                                    </>

                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        ) : (<></>)}


                    </Col>
                </Row>
                <br />
                <hr style={{
                    color: '#C8C8C8',
                    backgroundColor: '#C8C8C8',
                    height: .5,
                    borderColor: '#C8C8C8'
                }} />
                <div className="col-12 mx-auto my-4">
                    <div className="row">
                        <div className="col-12 text-center">
                            <Link className="mr-2" to="/assignments">
                                <Buttons
                                    menu="Cancel"
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

            </Container>
        </>
    )
}