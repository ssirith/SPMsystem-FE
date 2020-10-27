import React, { useState, useCallback, useContext, useEffect } from "react"
import Cookie from "js-cookie"
import { Modal } from "react-bootstrap"
import axios from "axios"
import Image from "react-bootstrap/Image"
import Button from "@material-ui/core/Button"
import { useParams, useNavigate } from "@reach/router"
import Dropdown from "./Dropdown"
import DropdownEdit from "./DropdownEdit"
import { UserContext } from "../../UserContext"
import { Avatar } from "@material-ui/core"
export default function ModalWindowProfile(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const [image, setImage] = useState("")
  const [departmentList, setDepartmentList] = useState(["IT", "CS", "DSI"])
  const [department, setDepartment] = useState()
  const [checkDepartment, setCheckDepartment] = useState()
  const [checkImage, setCheckImage] = useState()
  const { id } = useParams()
  const [isPreFetch, setIsPreFetch] = useState(false)
  const { user, setUser } = useContext(UserContext)
  
  let navigate = useNavigate()
  const fetchData = useCallback(async () => {
    setIsPreFetch(true)
    const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/students`,{headers})
    const check = data.find((temp) => temp.student_id === user.user_id)
    setCheckDepartment(check.department)//ค่าจาก db
    setCheckImage(check.image)
    setIsPreFetch(false)

  }, [])
  useEffect(() => {
    fetchData()
  }, [])

  function imageHandler(){
    if(checkImage){
      return (`http://127.0.0.1:8000/storage/images/${user.user_id}.jpg`)
    }else{
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
    const student_id = user.user_id;
    if (department) {
      try {
        const data = new FormData();//craete form
        data.append("image", image)
        data.append("student_id", student_id)
        data.append("department", department)
        const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile/student`, data,{headers})
        if (res.status === 200) {
          alert("Edit Profile Success.")
          window.location.reload()
          props.setIsOpen(false)
        }
      }
      catch (err) {
        alert("Not success, please check your input.")
        console.log(err)
      }
    } else if (checkDepartment) {
      try {
        const data = new FormData();//craete form
        data.append("image", image)
        data.append("student_id", student_id)
        data.append("department", checkDepartment)
        const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile/student`, data,{headers})
        if (res.status === 200) {
          alert("Edit Profile Success.")
          props.setIsOpen(false)
          console.log(data)
          window.location.reload()
        }
      }
      catch (err) {
        alert("It's not success, please check your input.")
        console.log(err)
      }
    }

  }
  function hideCancel() {
    if (checkDepartment) {
      return (<button className="btn btn-danger" onClick={() => props.setIsOpen(false)}>CANCEL</button>)
    } else {
      return (<Button variant="contained" disabled>
        {" "}
            CANCEL
      </Button>)
    }
  }
  function disSave() {
    if (department || checkDepartment) {
      return (<button className="btn btn-primary px-3" onClick={() => handleSave()}>SAVE</button>)
    } else {
      return (<Button variant="contained" disabled>
        {" "}
            SAVE
      </Button>)
    }
  }
  function disOnHide() {
    if (checkDepartment) {
      return (() => { props.setIsOpen(false) })
    } else {
      return (<></>)
    }
  }
  function DropdownHandler() {
    if (checkDepartment) {
      return (<DropdownEdit
        disabled={true}
        departmentList={departmentList}
        checkDepartment={checkDepartment}
        setDepartment={setDepartment}
        value={checkDepartment}
      />)
    } else {
      return (
        <Dropdown
          departmentList={departmentList}
          department={department}
          setDepartment={setDepartment}
          value={department}
        />)
    }
  }
  if (isPreFetch) {
    return <></>
  }
  return (
    <>
    <Modal
      show={props.isOpen}
      onHide={disOnHide()}
    >
      <Modal.Header closeButton={disOnHide()}>
        <Modal.Title id="contained-model-title-vcenter">Profile</Modal.Title>
      </Modal.Header >
      <Modal.Body>
        <div className="row">
          <div className="col-7 my-3">
            <Image id="img" src={imageHandler()} className="mb-2" style={{ width: '100px', height: '50%' }} roundedCircle />
            <input type="file" id="file-input" name="file" accept=".jpg,.jpeg,.png" onChange={(e) => uploadImage(e)} /> <br />
            <p>Upload your image. (Supported File Type: .jpg, .jpeg, .png)</p>
          </div>
          <div className="col-5 my-3">
            <div className="row">
              {DropdownHandler()}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="col-12 mx-auto">
          <div className="row">
            <div className="col-12 text-center">
              {hideCancel()}
              {" "}
              {disSave()}
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
    </>
  )
}