import React, { useState, useCallback, useContext, useEffect } from "react"
import { Modal } from "react-bootstrap"
import axios from "axios"
import Button from "@material-ui/core/Button"
import { useParams } from "@reach/router"
import DropdownProfile from "./DropdownProfile"
import DropdownEditProfile from "./DropdownEditProfile"
// import Dropdown from "./Dropdown"
import { UserContext } from "../../UserContext"
export default function ModalWindowProfile(props) {
  const [image, setImage] = useState("")
  const [departmentList, setDepartmentList] = useState(["IT", "CS", "DSI"])
  const [department, setDepartment] = useState()
  const [checkDepartment, setCheckDepartment] = useState()
  const { id } = useParams()
  const [isPreFetch, setIsPreFetch] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const fetchData = useCallback(async () => {
    setIsPreFetch(true)
    const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/students`)
    const dep = data.find((a) => a.student_id === user.id)
    setCheckDepartment(dep.department)//ค่าจาก db
    setIsPreFetch(false)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])
  const uploadImage = async e => {
    // const files = e.target.files[0];
    // const data = new FormData();
    // data.append('file',file)
    // setImage(data)
    // console.log(image)
    const input = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const result = reader.result;
      const img = document.getElementById('img');
      img.src = result;
    }
    reader.readAsDataURL(input);
    setImage(input)
    console.log(input)
  }

  async function handleSave(e) {
    if(department){
    try {
      const data = {
        student_id: user.id,
        department: department,
        image: image
      }
      const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile`, data)
      if (res.status === 200) {
        alert("Edit Profile Success.")
        props.setIsOpen(false)
        console.log(data)
      }
    }
    catch (err) {
      console.log(err)
    }
  }else if(checkDepartment){
    try {
      const data = {
        student_id: user.id,
        department: checkDepartment,
        image: image
      }
      const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile`, data)
      if (res.status === 200) {
        alert("Edit Profile Success.")
        props.setIsOpen(false)
        console.log(data)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  }
  function hideCancel() {
    if (checkDepartment) {
      return (<button className="btn btn-danger" onClick={() => props.setIsOpen(false)}>Cancel</button>)
    } else {
      return (<button variant="contained" disabled>
        {" "}
            Cancel
      </button>)
    }
  }
  function disSave() {
    if (department || checkDepartment) {
      return (<button className="btn btn-primary" onClick={() => handleSave()}>Save</button>)
    } else {
      return (<button variant="contained" disabled>
        {" "}
            Save
      </button>)
    }
  }
  function disOnHide() {
    if (checkDepartment) {
      return (() => { props.setIsOpen(false) })
    } else {
      return (<></>)
    }
  }
  console.log('checkDepartment==>>', checkDepartment)
  function DropdownHandler() {
    if (checkDepartment) {
      return (<DropdownEditProfile
        disabled={true}
        departmentList={departmentList}
        checkDepartment={checkDepartment}
        setDepartment={setDepartment}
        value={checkDepartment}
      />)
    } else {
      return(
      <DropdownProfile
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
    <Modal
      show={props.isOpen}
      onHide={disOnHide()}
    >
      <Modal.Header >
        <Modal.Title id="contained-model-title-vcenter">Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-7 my-3">
            <img id="img" src={image / user.png} style={{ width: '100px' }} />
            <input type="file" id="file-input" name="file" onChange={(e) => uploadImage(e)} /> <br />
            <p>Upload your image. (Supported File Type: .jpg, .jpeg, .png)</p>
          </div>
          <div className="col-5 my-3">
            <div className="row">
              {DropdownHandler()}
              {/* <DropdownProfile
                departmentList={departmentList}
                department={department}
                setDepartment={setDepartment}
                value={department}
              /> */}
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
  )
}