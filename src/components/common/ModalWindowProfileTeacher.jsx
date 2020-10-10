import React, { useState, useCallback, useContext, useEffect } from "react"
import { Modal } from "react-bootstrap"
import axios from "axios"
import Image from "react-bootstrap/Image"
import Button from "@material-ui/core/Button"
import { useParams, useNavigate } from "@reach/router"
import Dropdown from "./Dropdown"
import DropdownEdit from "./DropdownEdit"
import { UserContext } from "../../UserContext"
export default function ModalWindowProfileProfileTeacher(props) {
    const [image, setImage] = useState("")
    const [checkDepartment, setCheckDepartment] = useState()
    const [checkImage, setCheckImage] = useState()
    const { id } = useParams()
    const [isPreFetch, setIsPreFetch] = useState(false)
    const { user, setUser } = useContext(UserContext)
    let navigate = useNavigate()
    const fetchData = useCallback(async () => {
        setIsPreFetch(true)
        if (user.role === "teacher") {
            const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/teachers`)
            const check = data.find((temp) => temp.teacher_id === user.id)
            setCheckImage(check.image)
        } else {
            const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/aas`)
            const check = data.find((temp) => temp.aa_id === user.id)
            setCheckImage(check.image)
        }
        setIsPreFetch(false)

    }, [])
    useEffect(() => {
        fetchData()
    }, [])

    function imageHandler() {
        if (checkImage) {
            return (`http://127.0.0.1:8000/storage/images/${user.id}.jpg`)
        } else {
            return (`/image/userimage.png`)
        }
    }
    const uploadImage = async e => {
        const input = e.target.files[0];
        const ImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        const acceptedImageTypes = input && ImageTypes.includes(input['type'])
        if (acceptedImageTypes === true) {
            const reader = new FileReader();
            reader.onload = function () {
                const result = reader.result;
                const img = document.getElementById('img');
                img.src = result;
            }
            reader.readAsDataURL(input);
            setImage(input)
        }
        else {
            alert("It's not a image, please check your file.")
            return (props.setIsOpen(false))
        }
    }
    async function handleSave(e) {
        if (user.role === "teacher") {
            const teacher_id = user.id;
            try {
                const data = new FormData();//craete form
                data.append("image", image)
                data.append("teacher_id", teacher_id)
                const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile/teacher`, data)
                if (res.status === 200) {
                    alert("Edit Profile Success.")
                    window.location.reload()
                    navigate("/main")
                    props.setIsOpen(false)
                }
            }
            catch (err) {
                alert("Not success, please check your input.")
                console.log(err)
            }
        } else {
            const aa_id = user.id;
            try {
                const data = new FormData();//craete form
                data.append("image", image)
                data.append("aa_id", aa_id)
                const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile/aa`, data)
                if (res.status === 200) {
                    alert("Edit Profile Success.")
                    window.location.reload()
                    navigate("/main")
                    props.setIsOpen(false)
                }
            }
            catch (err) {
                alert("Not success, please check your input.")
                console.log(err)
            }
        }

    }

    if (isPreFetch) {
        return <></>
    }
    return (
        <>
            <Modal
                show={props.isOpen}
                onHide={() => { props.setIsOpen(false) }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-model-title-vcenter">Profile</Modal.Title>
                </Modal.Header >
                <Modal.Body>
                    <div className="col-12 mx-auto">
                        
                        <div className="col-12 text-center">
                            <Image id="img" src={imageHandler()} className="mb-2" style={{ width: '150px', height: '50%' }} roundedCircle />
                            {" "}
                            <input type="file" id="file-input" name="file" accept=".jpg,.jpeg,.png" onChange={(e) => uploadImage(e)} /> <br />
                            <p>Upload your image (Supported File Type: .jpg, .jpeg, .png)</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-12 mx-auto">
                        <div className="row">
                            <div className="col-12 text-center">
                                <button className="btn btn-danger" onClick={() => props.setIsOpen(false)}>Cancel</button>
                                {" "}
                                <button className="btn btn-primary" onClick={() => handleSave()}>Save</button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}