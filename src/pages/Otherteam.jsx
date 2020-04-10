import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import BreadcrumbNav from "../components/common/BreadcrumbNav"
import Boxitem from "../components/common/Boxitem"
import Membersbox from "../components/common/Membersbox"
import Topicbox from "../components/common/Topicbox"
import Button from "../components/common/Buttons"
export default function Otherteam() {
  const { id } = useParams()
  const [group, setMugroup] = useState({
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
          <BreadcrumbNav pastref="/AllProject" past="All Project" current={`IT-${group.id}`}/>
          </div>
        <div className="col-12 my-3">
          <Topicbox
            title="Senior Project Topic"
            detail={group.name}
            id={group.id}
          />
        </div>

        <div className="col-12 my-3">
          <div className="row">
            <div className="col-8">
              <Membersbox title="Members" members={members} />
            </div>
            <div className="col-4">
              <Boxitem title="Advisor" detail={group.advisor} />
            </div>
          </div>
        </div>

        <div className="col-12 my-3">
          <Boxitem title="Detail" detail={group.detail} />
        </div>
      </div>
    </div>
  )
}
