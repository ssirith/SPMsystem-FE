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
import { Link, useNavigate, Redirect, Router, useParams } from "@reach/router"
import { UserContext } from "../UserContext"
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from "@material-ui/icons/Folder";
import dayjs from "dayjs";
import Loading from "../components/common/Loading";
import Swal from 'sweetalert2'
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
    const { id } = useParams()
    const { user, setUser } = useContext(UserContext)
    //     const userBeforeParse=JSON.parse(localStorage.getItem('user'))
    //   const  [user, setUser ] = useState(userBeforeParse)
    const [announcement, setAnnouncement] = useState()
    const [today, setDate] = useState(new Date())
    const [attachmentFromBE, setAttachmentFromBE] = useState([])
    const [selectAttachment, setSelectAttachment] = useState([])
    const [delete_attachment, setDelete_attachment] = useState([])
    const [announcement_Title, setAnnoucement_Title] = useState()
    const [announcement_Description, setAnnoucement_Description] = useState()
    const [attachment, setAttachment] = useState([])
    const [isPrefetch, setIsPreFetch] = useState(false)

    const fetchData = useCallback(async () => {
        try {
            setIsPreFetch(true)
            const resposne = await axios.get(`${process.env.REACT_APP_API_BE}/announcement/${id}`, { headers })
            setAnnouncement(resposne.data)// ได้ array ของ rubric ทั้งหมด
            setAttachmentFromBE(resposne.data.attachment)
            setAnnoucement_Title(resposne.data.announcement_title)
            setAnnoucement_Description(resposne.data.announcement_detail)
            setIsPreFetch(false)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oop...',
                text: 'Something went wrong, Please Try again.',
            })
            console.log(err)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [])
    const checkRole = useCallback(() => {
        if (user.user_type === "Student") {
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
            const newSelectAttachment = [...selectAttachment]
            newSelectAttachment.push(files)
            setSelectAttachment(newSelectAttachment)
        }
    }
    const deleteSelectFile = (data, index) => {
        selectAttachment.splice(index, 1)
        setSelectAttachment([...selectAttachment])
    }

    function deleteFilesFromBE(data) {
        const newDeleteSeletedFile = [...delete_attachment]
        const newAttachmentFromBE = [...attachmentFromBE]

        newDeleteSeletedFile.push(data.announcement_file_id) // del fileFromBE
        const seletedFile = newAttachmentFromBE.filter(
            (files) => files.announcement_file_id !== data.announcement_file_id
        )

        setAttachmentFromBE(seletedFile) //แทนที่ค่าเก่าใน BE ด้วยค่า selectfile ใหม่
        setDelete_attachment(newDeleteSeletedFile)
    }

    async function handleSubmit() {
        const data = new FormData();
        data.append("announcement_id", parseInt(id))
        data.append("announcement_title", announcement_Title)
        data.append("announcement_detail", announcement_Description)
        var date = dayjs(today).format('YYYY-MM-DD');
        setDate(date)
        data.append("announcement_date", date)
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
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BE}/announcement/edit`, data, { headers })
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Save!',
                    text: 'Edit Success.',
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false
                })

                setTimeout(() => {
                    navigate("/announcements")
                }, 2000);
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oop...',
                text: 'Something went wrong, Please Try again.',

            })
            console.error(err)
        }
    }
    if (isPrefetch) {
        return <><Loading open={isPrefetch} /></>
    }
    return (
        <>
            {announcement && (
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
                                defaultValue={announcement.announcement_title}
                                onChange={(event) => handleAnnouncementTitle(event)}
                            />

                        </Col>
                    </Row>
                    <br />
                    <Row >
                        <Col sm={1.5} >
                            Description: <span className="text-danger">*</span>
                        </Col>
                        <Col sm={8}>
                            <Textarea
                                id="description"
                                label="Input Announcement Description"
                                defaultValue={announcement.announcement_detail}
                                onChange={(event) => handleDescription(event)}
                            />
                        </Col>
                    </Row>

                    <br />
                    <Row>
                        <Col sm={1.5}>
                            Attachment:
                </Col>
                        <Col style={{ marginLeft: 390 }}>
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
                                            {attachmentFromBE && attachmentFromBE.map((f, index) => {
                                                if (f) {
                                                    return (
                                                        <>
                                                            <li key={index}>
                                                                &nbsp;
                                                        <FolderIcon className="primary" />
                                                        &nbsp;
                                                        {f.announcement_file_name.substring(0, 25)}
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
                                                            {file.name.substring(0, 25)}
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
                                    menu="Edit"
                                    color="primary"
                                    onClick={(event) => handleSubmit(event)}
                                />

                            </div>
                        </div>
                    </div>
                </Container>
            )}

        </>
    )
}