import React, { useState, useEffect, useCallback, useContext } from "react"
import Cookie from 'js-cookie'
import Inputtext from "../components/common/Inputtext"
import Membersbox from "../components/common/Membersbox"
import Advisorbox from "../components/common/Advisorbox"
import Buttons from "../components/common/Buttons"
import ModalComponentMember from "../components/common/ModalComponentMember"
import ModalComponentAdvisor from "../components/common/ModalComponentAdvisor"
import Dropdown from "../components/common/Dropdown"
import axios from "axios"
import { Link, useNavigate } from "@reach/router"
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import Textarea from "../components/common/Textarea"
import { UserContext } from "../UserContext"
import Loading from "../components/common/Loading"
export default function Createteam() {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const { user, setUser } = useContext(UserContext)
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  let navigate = useNavigate()
  const [isPreFetch, setIsPreFetch] = useState(false)
  const [departmentList, setDepartmentList] = useState(["SIT", "IT", "CS", "DSI"])
  const [department, setDepartment] = useState("")
  const [isOpenStudent, setIsOpenStudent] = useState(false)
  const [isOpenAdvisor, setIsOpenAdvisor] = useState(false)
  const [students, setStudents] = useState([])
  const [mygroup, setMygroup] = useState({
    name: "",
    detail: "",
  })
  const [member, setMember] = useState([])
  const [advisor, setAdvisor] = useState([])
  const fetchData = useCallback(async () => {
    setIsPreFetch(true)
    const all = await axios.get(`${process.env.REACT_APP_API_BE}/students`,{headers})
    setStudents(all.data)
    setIsPreFetch(false)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

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
    const student_id = []//array
    member.map((m) => student_id.push(m.student_id))
    const value = students.find((std) => std.student_id === user.user_id)//no std.id
    if (value) {
      student_id.push(value.student_id)
    }
    const teacher_id = []
    advisor.map((a) => teacher_id.push(a.teacher_id))
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BE}/projects`, {
        project_name,
        project_detail,
        student_id,
        teacher_id,
        department,
      },{headers})
      if (response.status === 200) {
        alert("Create Success.")
        navigate("/main")
        window.location.reload()
      }
    } catch (err) {
      alert("It's not success, Please check your input")
      console.error(err)
    }
  }
  if (isPreFetch) {
    return <><Loading open={isPreFetch}/></>
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
          <b>Senior Project Topic</b>
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
      <br />
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
      <br />
    </div>
  )
}
