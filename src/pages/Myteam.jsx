import React, { useState } from "react"
import Carditem from "../components/common/Carditem"
import Boxitem from "../components/common/Boxitem"
import Buttons from "../components/common/Buttons"
import Inputtext from "../components/common/Inputtext"
import Membersbox from "../components/common/Membersbox"
import Topicbox from "../components/common/Topicbox"
import Button from "../components/common/Buttons"
export default function Myteam() {
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
        <div className="ml-auto mt-2"><Button menu="Edit" color="Primary"/></div>
      </div>
      <div className="row">
        <div className="col-12 my-3">
          <Topicbox
            title="Senior Project Topic"
            detail={mygroup.name}
            id={mygroup.id}
          />
        </div>

        <div className="col-12 my-3">
          <div className="row">
            <div className="col-8">
              <Membersbox title="Members" members={members} />
            </div>
            <div className="col-4">
              <Boxitem title="Advisor" detail={mygroup.advisor} />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <Boxitem title="Detail" detail={mygroup.detail} />
        </div>
      </div>
    </div>
  )
}
