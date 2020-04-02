import React, { useState } from "react"
import Inputtext from "../components/common/Inputtext"
import Topicbox from "../components/common/Topicbox"
import Membersbox from "../components/common/Membersbox"
import Boxitem from "../components/common/Boxitem"
import Buttons from "../components/common/Buttons"
import ModalComponent from "../components/common/Modalcomponent"
import Dropdown from "../components/common/Dropdown"
export default function Createteam() {
  const [departmentList, setDepartmentList] = useState(["IT", "CS", "DSI"])
  const [department, setDepartment] = useState("")
  const [isOpenStudent, setIsOpenStudent] = useState(false)
  const [isOpenAdvisor, setIsOpenAdvisor] = useState(false)
  const [mygroup, setMugroup] = useState({
    name: "",
    advisor: "",
    detail: ""
  })
  const [members, setMember] = useState([
    {
      name: "Suthiwat Sirithanakom",
      id: 60130500114
    },
    {
      name: "Thamrongchai Chalowat",
      id: 60130500125
    },
    {
      name: "Watunyu Panmun",
      id: 60130500082
    }
  ])
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-3">
          <p>Senior Project Topic</p>
        </div>
      </div>
      <div className="row">
        <div className="col-7 my-3">
          <Inputtext
            id="projectname"
            label="Projectname"
            defaultValue={mygroup.name}
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
            <ModalComponent
              isOpen={isOpenStudent}
              setIsOpen={setIsOpenStudent}
              header="Add team members"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Membersbox title="Members" members={members} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-right m-2">
            <Buttons
              menu="Edit"
              color="primary"
              onClick={() => setIsOpenAdvisor(true)}
            />
            <ModalComponent
              isOpen={isOpenAdvisor}
              setIsOpen={setIsOpenAdvisor}
              header="Add advisor"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Boxitem title="Advisor" detail={mygroup.advisor} />
          </div>
        </div>
      </div>

      <div className="col-12 my-3">
        <Inputtext
          id="projectdetail"
          label="Project Detail"
          defaultValue={mygroup.detail}
        />
      </div>

      <div className="col-12 mx-auto">
        <div className="row">
          <div className="col-12 text-center">
            <Buttons
              menu="Cancel"
              color="secondary"
              onClick={() => console.log("Cancel")}
            />
            <Buttons
              menu="Save"
              color="primary"
              onClick={() => console.log("save")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
