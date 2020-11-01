import React, { useState, useCallback, useContext, useEffect } from "react"
import Cookie from "js-cookie"
import { Modal } from "react-bootstrap"
import axios from "axios"
import Image from "react-bootstrap/Image"
import Button from "@material-ui/core/Button"
import { useParams, useNavigate } from "@reach/router"
import Swal from 'sweetalert2'
import { UserContext } from "../../UserContext"
export default function ModalWindowProfileProfileTeacher(props) {
    const headers = {
        Authorization: `Bearer ${Cookie.get("jwt")}`,
        "Content-Type": "application/json",
        accept: "application/json",
    }
    const [image, setImage] = useState("")
    const [checkDepartment, setCheckDepartment] = useState()
    const [checkImage, setCheckImage] = useState()
    const { id } = useParams()
    const [isPreFetch, setIsPreFetch] = useState(false)
    const { user, setUser } = useContext(UserContext)
    //     const userBeforeParse=JSON.parse(localStorage.getItem('user'))
    //   const  [user, setUser ] = useState(userBeforeParse)
    let navigate = useNavigate()
    const fetchData = useCallback(async () => {
        try {
            setIsPreFetch(true)
            if (user.user_type === "Teacher") {
                const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/teachers`, { headers })
                const check = data.find((temp) => temp.teacher_id === user.user_id)
                setCheckImage(check.image)
            } else {
                const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/aas`, { headers })
                const check = data.find((temp) => temp.aa_id === user.user_id)
                setCheckImage(check.image)
            }
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

    function imageHandler() {
        if (checkImage) {
            return (`https://seniorprojectmanagement.tk/storage/images/${user.user_id}.jpg`)
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
            Swal.fire({
                icon: 'error',
                title: 'Oop...',
                text: "It's not a image, please check your file.",
              })
            return (props.setIsOpen(false))
        }
    }
    async function handleSave(e) {
        if (user.user_type === "Teacher") {
            const teacher_id = user.user_id;
            try {
                const data = new FormData();//craete form
                data.append("image", image)
                data.append("teacher_id", teacher_id)
                const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile/teacher`, data, { headers })
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Save!',
                        text: 'Edit Profile Success.',
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false
                    })

                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                    props.setIsOpen(false)
                }
            }
            catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oop...',
                    text: 'Something went wrong, Please Try again.',
                })
                console.log(err)
            }
        } else {
            const aa_id = user.user_id;
            try {
                const data = new FormData();//craete form
                data.append("image", image)
                data.append("aa_id", aa_id)
                const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile/aa`, data, { headers })
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Save!',
                        text: 'Edit Profile Success.',
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false
                    })

                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                    props.setIsOpen(false)
                }
            }
            catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oop...',
                    text: 'Something went wrong, Please Try again.',
                })
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
                                <Button className="btn btn-danger" onClick={() => props.setIsOpen(false)}>Cancel</Button>
                                {" "}
                                <Button className="btn btn-primary px-3" onClick={() => handleSave()}>Save</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}