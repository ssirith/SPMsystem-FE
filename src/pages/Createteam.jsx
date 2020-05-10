import React, { useState, useEffect, useCallback } from "react"
import Inputtext from "../components/common/Inputtext"
import Membersbox from "../components/common/Membersbox"
import Advisorbox from "../components/common/Advisorbox"
import Buttons from "../components/common/Buttons"
import ModalComponentMember from "../components/common/ModalComponentMember"
import ModalComponentAdvisor from "../components/common/ModalComponentAdvisor"
import Dropdown from "../components/common/Dropdown"
import axios from "axios"
import { Link,useNavigate } from "@reach/router"
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import Textarea from "../components/common/Textarea"

export default function Createteam() {
  let navigate = useNavigate()
  const [departmentList, setDepartmentList] = useState(["SIT","IT", "CS", "DSI"])
  const [department, setDepartment] = useState("")
  const [isOpenStudent, setIsOpenStudent] = useState(false)
  const [isOpenAdvisor, setIsOpenAdvisor] = useState(false)
  const [mygroup, setMygroup] = useState({
    name: "",
    detail: "",
  })
  const [member, setMember] = useState([])
  const [advisor, setAdvisor] = useState([])

  function addMember(value) {
    let temp = []
    temp.push(value)
    setMember(...temp)
  }

  function addAdvisor(value) {
    let temp = []
    temp.push(value)
    setAdvisor(...temp)
  }

  const handleProject = (event) => {
    setMygroup({ ...mygroup, name: event.target.value })
  }

  const handleDetail = (event) => {
    setMygroup({ ...mygroup, detail: event.target.value })
  }

  
  const handleSubmit = async (event) => {
    const project_name = mygroup.name
    const project_detail = mygroup.detail
    const student_id = []
    member.map((m) => student_id.push(m.student_id))
    const teacher_id = []
    advisor.map((a) => teacher_id.push(a.teacher_id))
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BE}/projects`, {
        project_name,
        project_detail,
        student_id,
        teacher_id,
        department,
      })
      if(response.status === 200){ 
        alert("Create Success.")
        navigate("/")
        window.location.reload()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-3">
          <BreadcrumbNavString
            pastref="/"
            past="My Project"
            current="Create Project"
          />
        </div>
        <div className="col-12 my-3">
          <p>Senior Project Topic</p>
        </div>
      </div>
      <div className="row">
        <div className="col-7 my-3">
          <Inputtext
            id="projectname"
            label="Project Name"
            defaultValue={mygroup.name}
            onChange={(event) => handleProject(event)}
          />
        </div>
        <div className="col-5 my-3">
          <div className="row">
            <Dropdown
              departmentList={departmentList}
              department={department}
              setDepartment={setDepartment}
            />
          </div>
        </div>
      </div>
      <div className="col-12 my-3">
        <div className="row">
          <div className="col-12 text-right m-2">
            <Buttons
              menu="Edit"
              color="primary"
              onClick={() => setIsOpenStudent(true)}
            />
            {/*กล่อง addmember*/}
            <ModalComponentMember
              isOpen={isOpenStudent}
              setIsOpen={setIsOpenStudent}
              addMember={addMember}
              header="Add team members"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Membersbox title="Members" members={member} />
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-right m-2">
            <Buttons
              menu="Edit"
              color="primary"
              onClick={() => setIsOpenAdvisor(true)}
            />
            {/*กล่อง addvisor*/}
            <ModalComponentAdvisor
              isOpen={isOpenAdvisor}
              setIsOpen={setIsOpenAdvisor}
              addAdvisor={addAdvisor}
              header="Add advisor"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Advisorbox title="Advisor" advisors={advisor} />
          </div>
        </div>
      </div>

      <div className="col-12 my-3">
        <Textarea
          id="projectdetail"
          label="Project Detail"
          defaultValue={mygroup.detail}
          onChange={(event) => handleDetail(event)}
        />
      </div>

      <div className="col-12 mx-auto">
        <div className="row">
          <div className="col-12 text-center">
            <Link className="mr-2" to="/">
              <Buttons 
                menu="Cancel"
                color="secondary"
                onClick={() => console.log("Cancel")}
              />
            </Link>
            
              <Buttons
                menu="Create"
                color="primary"
                onClick={() => console.log("save")}
                onClick={(event) => handleSubmit(event)}
              />
            
          </div>
        </div>
      </div>
    </div>
  )
}
