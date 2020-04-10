import React, { useState } from "react"
import { Link } from "react-router-dom"
import Carditem from "../components/common/Carditem"
import Boxitem from "../components/common/Boxitem"
import Inputtext from "../components/common/Inputtext"
import Membersbox from "../components/common/Membersbox"
import Topicbox from "../components/common/Topicbox"
import Button from "../components/common/Buttons"
import Buttons from "../components/common/Buttons"
export default function Myteam() {
  const [mygroup, setMugroup] = useState()
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
  console.log(mygroup)
  if (mygroup) {
    return (
      <div className="container">
        <div className="row">
          <div className="ml-auto mt-2">
            <Link to="/editteam">
              <Button menu="Edit" color="Primary" />
            </Link>
          </div>
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
  } else {
    return (
      <div className="container text-center my-auto" >
        <p>Oops, you don't have any project right click Create button to create one.</p>
          <Link to="/createteam">
            <Buttons
              menu="Create Project"
              color="primary"
              onClick={() => console.log("Create")}
            />
          </Link>
        </div>
      
    )
  }
}
