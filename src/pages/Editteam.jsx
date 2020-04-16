import React, { useState, useCallback, useEffect } from "react"
import Inputtext from "../components/common/Inputtext"
import Topicbox from "../components/common/Topicbox"
import Membersbox from "../components/common/Membersbox"
import Advisorbox from "../components/common/Advisorbox"
import Boxitem from "../components/common/Boxitem"
import Buttons from "../components/common/Buttons"
import ModalComponentMember from "../components/common/ModalComponentMember"
import ModalComponentAdvisor from "../components/common/ModalComponentAdvisor"
import ModalMemberEdit from "../components/common/ModalMemberEdit"
import ModalAdvisorEdit from "../components/common/ModalAdvisorEdit"
import Dropdown from "../components/common/Dropdown"
import axios from 'axios'
import { Link } from "react-router-dom"

export default function Editteam() {
  const [departmentList, setDepartmentList] = useState(["IT", "CS", "DSI"])
  const [department, setDepartment] = useState([])
  const [isOpenStudent, setIsOpenStudent] = useState(false);
  const [isOpenAdvisor, setIsOpenAdvisor] = useState(false);
  const [project, setProject] = useState()// name & detail
  const [member, setMember] = useState()//members
  const [advisor, setAdvisor] = useState()//advisor
  const [memberfordelete, setMemberForDelete] = useState([])//รอส่งเข้าdbไปลบ
  const [advisorfordelete, setAdvisorForDelete] = useState([])//รอส่งเข้าdbไปลบ
  const fetchData = useCallback(
    async () => {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/projects/IT01`)
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
    console.log(event.target.value)//กรณี ไม่เป็น array
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
    let temp = memberfordelete
    temp.push(value.student_id)
    setMemberForDelete(temp)
    console.log(memberfordelete)
  }

  function deleteadvisor(value){
    console.log(value.teacher_id)
    let temp = advisorfordelete
    temp.push(value.teacher_id)
    setAdvisorForDelete(temp)
    console.log(advisorfordelete)
  }

  member&&console.log(member[0].group_id)
  const handleSubmit = (event) => {
    console.log(project)
    const project_id = project.project_id;
    const group_id = member[0].group_id;
    const project_name = project.project_name;
    const project_detail = project.project_detail;

    const delete_student_id = memberfordelete;
    console.log(memberfordelete)
    // memberfordelete.map(m => delete_student_id.push(m.student_id));

    const delete_teacher_id = advisorfordelete;
    // advisorfordelete.map(a => delete_teacher_id.push(a.teacher_id));

    const add_student_id = [];
    member.map(m => add_student_id.push(m.student_id));

    const add_teacher_id = [];
    advisor.map(a => add_teacher_id.push(a.teacher_id));

   
    //Edit require {project_id "IT-01",group_id "1",department}`เปลี่ยนไม่ได้ 
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
    
    // const data = JSON.stringify(temp)
    console.log(temp)
    axios.put(`http://127.0.0.1:8000/api/projects/edit/${project_id}`, temp)
    console.log(temp)
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-3">
          <p>Senior Project Topic</p>
        </div>
      </div>
      <div className="row">
        <div className="col-7 my-3">
          {project &&
            <Inputtext
              id="projectname"
              label="Projectname"
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
            <ModalMemberEdit
              isOpen={isOpenStudent}
              setIsOpen={setIsOpenStudent}
              addmember={addmember}
              deletemember={deletemember}
              // members={member}
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

            <ModalAdvisorEdit
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
        {/* {project.map((data, id) => (
          <Inputtext
            id="projectndetail"
            label="Projectdetail"
            defaultValue={data.project_detail}
            onChange={(event) => handleProjectDetail(event)}
            key={id}
          />
        ))} */}
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
