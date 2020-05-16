import React, { useState, useCallback, useContext, useEffect } from "react"
import { Modal } from "react-bootstrap"
import axios from "axios"
import Button from "@material-ui/core/Button"
import { useParams,useNavigate } from "@reach/router"
import Dropdown from "./Dropdown"
import DropdownEdit from "./DropdownEdit"
import { UserContext } from "../../UserContext"
export default function ModalWindowProfile(props) {
  const [image, setImage] = useState("")
  const [departmentList, setDepartmentList] = useState(["IT", "CS", "DSI"])
  const [department, setDepartment] = useState()
  const [checkDepartment, setCheckDepartment] = useState()
  const { id } = useParams()
  const [isPreFetch, setIsPreFetch] = useState(false)
  const { user, setUser } = useContext(UserContext)
  let navigate = useNavigate()
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
    const input = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const result = reader.result;
      const img = document.getElementById('img');
      img.src = result;
    }
    reader.readAsDataURL(input);
    setImage(input)
  }
  
  async function handleSave(e) {
    const student_id = user.id;
    if(department){
    try {
      const data = new FormData();//craete form
      data.append("image", image)
      data.append("student_id", student_id)
      data.append("department", department)

      const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile`, data)
      if (res.status === 200) {
        alert("Edit Profile Success.")
        window.location.reload()
        navigate("/")
        props.setIsOpen(false)
      }
    }
    catch (err) {
      alert("Not success, please check your input.")
      console.log(err)
    }
  }else if(checkDepartment){
    try {
      const data = new FormData();//craete form
      data.append("image", image)
      data.append("student_id", student_id)
      data.append("department", checkDepartment)
      const res = await axios.post(`${process.env.REACT_APP_API_BE}/student/edit/profile`, data)
      if (res.status === 200) {
        alert("Edit Profile Success.")
        props.setIsOpen(false)
        console.log(data)
        window.location.reload()
        
      }
    }
    catch (err) {
      alert("Not success, please check your input.")
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
      return(
      <Dropdown
        departmentList={departmentList}
        department={department}
        setDepartment={setDepartment}
        value={department}
      />)
    }
  }
 console.log(image.name.substr(1))
  if (isPreFetch) {
    return <></>
  }
  
  return (
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
            <img id="img"  src={`http://127.0.0.1:8000/storage/images/${user.id}.jpg`} style={{ width: '100px' }} />
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
  )
}