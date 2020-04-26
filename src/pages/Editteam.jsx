import React, { useState, useCallback, useEffect } from "react"
import Inputtext from "../components/common/Inputtext"
import Topicbox from "../components/common/Topicbox"
import Membersbox from "../components/common/Membersbox"
import Advisorbox from "../components/common/Advisorbox"
import Boxitem from "../components/common/Boxitem"
import Buttons from "../components/common/Buttons"
import ModalEditMember from "../components/common/ModalEditMember"
import ModalEditAdvisor from "../components/common/ModalEditAdvisor"
import Dropdown from "../components/common/Dropdown"
import axios from 'axios'
import { Link,useParams } from "@reach/router"
import BreadcrumbNav from "../components/common/BreadcrumbNav"

export default function Editteam(props) {
  const [departmentList, setDepartmentList] = useState(["IT", "CS", "DSI"])
  const [department, setDepartment] = useState([])
  const [isOpenStudent, setIsOpenStudent] = useState(false);
  const [isOpenAdvisor, setIsOpenAdvisor] = useState(false);
  const [project, setProject] = useState()// name & detail
  const [member, setMember] = useState()//members
  const [advisor, setAdvisor] = useState()//advisor
  const [memberForDelete, setMemberForDelete] = useState([])//รอส่งเข้าdbไปลบ
  const [advisorForDelete, setAdvisorForDelete] = useState([])//รอส่งเข้าdbไปลบ
  const fetchData = useCallback(
    async () => {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/projects/${props.id}`)
      setProject(data.project)
      setMember(data.group)
      setAdvisor(data.teacher)
      setDepartment(data.group[0].department)
      console.log(data)
    },
    [],
  )
  useEffect(() => {
    fetchData()
  }, [])


  const handleProjectName = (event) => {
    console.log(event.target.value)
    setProject({
      ...project,
      project_name: event.target.value
    })

    console.log(project)
  }
  const handleProjectDetail = (event) => {
    console.log(event.target.value)
    setProject({
      ...project,
      project_detail: event.target.value
    })
    console.log(project)

  }
  function addmember(value) {
    console.log(value)
    let temp = []
    temp.push(value)
    setMember(...temp)
    console.log(member)
  }

  function addadvisor(value) {
    let temp = []
    temp.push(value)
    setAdvisor(...temp)
  }
  function deletemember(value){
    console.log(value.student_id)
    let temp = memberForDelete
    temp.push(value.student_id)
    setMemberForDelete(temp)
    console.log(memberForDelete)
  }

  function deleteadvisor(value){
    console.log(value.teacher_id)
    let temp = advisorForDelete
    temp.push(value.teacher_id)
    setAdvisorForDelete(temp)
    console.log(advisorForDelete)
  }

  
  const handleSubmit = async (event) => {
    console.log(project)
    const project_id = project.project_id;
    const group_id = member[0].group_id;
    const project_name = project.project_name;
    const project_detail = project.project_detail;
    const delete_student_id = memberForDelete;
    console.log(memberForDelete)
    const delete_teacher_id = advisorForDelete;
    const add_student_id = [];
    member.map(m => add_student_id.push(m.student_id));
    const add_teacher_id = [];
    advisor.map(a => add_teacher_id.push(a.teacher_id));
    
    const temp = {
      project_id: project_id,
      group_id: group_id,
      department: department,
      project_name: project_name,
      delete_student_id: delete_student_id,
      delete_teacher_id: delete_teacher_id,
      add_student_id: add_student_id,
      add_teacher_id: add_teacher_id,
      project_detail: project_detail
    }
    console.log(temp)
    try{
     const response=await axios.
     put(`http://127.0.0.1:8000/api/projects/edit/${project_id}`, temp)
     console.log(response)
     if(response.status===200){
       window.location.reload()
     }
    }catch(err){
      console.log(err)
    }
    
  }


  return (
    <div className="container">
      <div className="row">
      <div className="col-12 my-3">
          <BreadcrumbNav
            pastref="/"
            past="Home"
            current="Edit Project"
          />
        </div>
        <div className="col-12 my-3">
          <p>Senior Project Topic</p>
        </div>
      </div>
      <div className="row">
        <div className="col-7 my-3">
          {project &&
            <Inputtext
              id="projectname"
              label="Project Name"
              defaultValue={project.project_name}
              onChange={(event) => handleProjectName(event)}
            />}
        </div>
        <div className="col-5 my-3">
          {<div className="row">
            <Dropdown disabled={true}
              departmentList={departmentList}
              department={department}
              setDepartment={setDepartment}
              value={department}
            />
          </div>}
        </div>
      </div>
      {/*Member*/}
      <div className="col-12 my-3">
        <div className="row">
          <div className="col-12 text-right m-2">
            <Buttons
              menu="Edit"
              color="primary"
              onClick={() => setIsOpenStudent(true)}
            />
            <ModalEditMember
              isOpen={isOpenStudent}
              setIsOpen={setIsOpenStudent}
              addmember={addmember}
              deletemember={deletemember}
              header="Add team members"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Membersbox title="Members" members={member} />
          </div>
        </div>

        {/* Advisor */}
        <div className="row">
          <div className="col-12 text-right m-2">
            <Buttons
              menu="Edit"
              color="primary"
              onClick={() => setIsOpenAdvisor(true)}
            />

            <ModalEditAdvisor
              isOpen={isOpenAdvisor}
              setIsOpen={setIsOpenAdvisor}
              addadvisor={addadvisor}
              deleteadvisor={deleteadvisor}
              // advisors={advisor}
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
      {/*Detail */}
      <div className="col-12 my-3">
        {project &&
          <Inputtext
            id="projectdetail"
            label="Projectdetail"
            defaultValue={project.project_detail}
            onChange={(event) => handleProjectDetail(event)}
          />}
      </div>
      {/*Cancel / Save*/}
      <div className="col-12 mx-auto">
        <div className="row">
          <div className="col-12 text-center">
            <Link to="/">
              <Buttons menu="Cancel"
                color="secondary" />
            </Link>
            <Link to="/">
            <Buttons
              menu="Save"
              color="primary"
              onClick={() => console.log("Save")}
              onClick={(event) => handleSubmit(event)}/>
              </Link>
            
          </div>
        </div>
      </div> 
    </div>
  )
}
