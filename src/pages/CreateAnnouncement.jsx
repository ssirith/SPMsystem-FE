import React, { useState, useEffect, useCallback, useContext, useRef } from "react"
import Cookie from 'js-cookie'
import { makeStyles } from "@material-ui/core/styles"
import Inputtext from "../components/common/Inputtext"
import BreadcrumbNavStrings from "../components/common/BreadcrumbNavString"
import { Container, Row, Col } from 'reactstrap';
import { Card } from "react-bootstrap"
import axios from "axios"
import Textarea from "../components/common/Textarea"
import Buttons from "../components/common/Buttons"
import { Link, useNavigate, Redirect, Router } from "@reach/router"
import { UserContext } from "../UserContext"
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from "@material-ui/icons/Folder";
import dayjs from "dayjs"
const useStyles = makeStyles({
    root: {
        position: "relative",
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})
export default function CreateAnnouncement() {
    const headers = {
        Authorization: `Bearer ${Cookie.get("jwt")}`,
        "Content-Type": "application/json",
        accept: "application/json",
      }
    const classes = useStyles()
    const inputRef = useRef()
    let navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const [announcement_Title, setAnnoucement_Title] = useState()
    const [announcement_Description, setAnnoucement_Description] = useState()
    const [attachment, setAttachment] = useState([])
    const [today, setDate] = useState(new Date())
    const checkRole = useCallback(() => {
        if (user.role === "student") {
            alert(`You dont'have permission to go this page.`)
            navigate("/main")
        }
    })

    useEffect(() => {
        checkRole()
    }, [user])
    function handleAnnouncementTitle(event) {
        setAnnoucement_Title(event.target.value)
    }

    function handleDescription(event) {
        setAnnoucement_Description(event.target.value)
    }
    function handleClickAdd() {
        inputRef.current.click()
    }
    function uploadFiles(event) {
        if (event.target.files[0]) {
            let files = event.target.files[0]
            setAttachment([...attachment, files])
        }
    }
    const deleteFilesUpload = (data, index) => {
        attachment.splice(index, 1)
        setAttachment([...attachment])
    }
    
    async function handleSubmit() {
        var date = dayjs(today).format('YYYY-MM-DD');
        setDate(date)
        const data = new FormData();
        data.append("announcement_title", announcement_Title)
        data.append("announcement_detail", announcement_Description)
        data.append("announcement_date", date)
        if (user.role === "teacher") {
            data.append("teacher_id", user.id)
            data.append("aa_id", "")
        } else {
            data.append("teacher_id", "")
            data.append("aa_id", user.id)
        }
        if (attachment.length !== 0) {
            for (const acceptFile of attachment) {
                data.append('attachment[]', acceptFile)
            }
        } else {
            data.append('attachment[]', [])
        }
        for (var value of data.values()) {
            console.log(value);
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BE}/announcement`, data,{headers})
            if (response.status === 200) {
                alert("Create Success.")
                navigate("/announcements")

            }
        } catch (err) {
            alert("It's not success, Please check your input")
            console.error(err)
        }

    }
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <BreadcrumbNavStrings
                            pastref="/announcements"
                            past="Annoucement"
                            current="Create Announcement"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        <h5>Create Announcement</h5>
                    </Col>
                </Row>
                <br />
                <Row style={{ alignItems: "center" }}>
                    <Col sm={1.5}>
                        TiTle: <span className="text-danger">*</span>
                    </Col>
                    <Col sm={8} style={{ marginLeft: 47 }}>
                        <Inputtext
                            id="announcementname"
                            label="Input Announcement Name"
                            // defaultValue={assignment_title}
                            onChange={(event) => handleAnnouncementTitle(event)}
                        />

                    </Col>
                </Row>
                <br />
                <Row >
                    <Col sm={1.5}  >
                        Description: <span className="text-danger">*</span>
                    </Col>
                    <Col sm={8} >
                        <Textarea
                            id="description"
                            label="Input Announcement Description"
                            // defaultValue={assignment_detail}
                            onChange={(event) => handleDescription(event)}
                        />
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col sm={1.5} >
                        Attachment:
                    </Col>
                    <Col style={{ marginLeft: 390}}>
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
                                                            {f.name.substring(0, 30)}
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
                            <Link className="mr-2" to="/announcements">
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