import React, { useState } from "react"
import Inputtext from "../components/common/Inputtext"
import Topicbox from "../components/common/Topicbox"
import Membersbox from "../components/common/Membersbox"
import Boxitem from "../components/common/Boxitem"
import Buttons from "../components/common/Buttons"

export default function Editteam() {
  const [mygroup, setMugroup] = useState({
    name: "Senior Project Management System (SPM system)",
    id: 14,
    advisor: "Dr.Siam Yamsaengsung",
    detail:
      "sdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhksdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhksdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhksdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhksdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhksdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhksdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhksdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhksdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhksdassjadshjahasdjkhjasdhjksdhjsdhjkasdjhk"
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
        <div className="col-12 my-3">
          <Inputtext
            id="projectname"
            label="projectname"
            defaultValue={mygroup.name}
          />
        </div>
      </div>
      <div className="col-12 my-3">
        <div className="row">
          <div className="col-12 text-right m-2">

          <Buttons menu="Edit" color="primary" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Membersbox title="Members" members={members} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-right m-2">

          <Buttons menu="Edit" color="primary" />
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
    </div>
  )
}
