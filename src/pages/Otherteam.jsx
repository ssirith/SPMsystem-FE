import React, { useState, useCallback, useEffect } from "react"
import BreadcrumbNav from "../components/common/BreadcrumbNav"
import { Link, useParams } from "@reach/router"
import Boxitem from "../components/common/Boxitem"
import Membersbox from "../components/common/Membersbox"
import Topicbox from "../components/common/Topicbox"
import Button from "../components/common/Buttons"
import Buttons from "../components/common/Buttons"
import axios from "axios"
import Inputtext from "../components/common/Inputtext"
import MyteamMember from "../components/common/MyteamMember"
import MyteamAdvisor from "../components/common/MyteamAdvisor"

export default function Otherteam(props) {
  // learnmore={props.group}
  const { id } = useParams()
  console.log({ id })
  const [team, setTeam] = useState({})
  const fetchData = useCallback(async () => {
    const data = await axios.get(`http://127.0.0.1:8000/api/projects/${id}`) //[]
    setTeam(data.data)

    //{group[{},{},{}], project{}, teacher[{}]}
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-3">
          <BreadcrumbNav
            pastref="/AllProjects"
            past="All Project"
            current={`IT-${id}`}
          />
        </div>
        <div className="col-12 my-3">
          {team && (
            <Topicbox title="Senior Project Topic" topic={team.project} />
          )}
        </div>

        <div className="col-12 my-3">
          <div className="row">
            <div className="col-8">
              <MyteamMember title="Members" members={team.group} />
            </div>
            <div className="col-4">
              <MyteamAdvisor title="Advisor" advisors={team.teacher} />
            </div>
          </div>
        </div>

        <div className="col-12 my-3">
          <Boxitem title="Detail" detail={team.project} />
        </div>
      </div>
      <div className="col-12 mx-auto">
        <div className="row">
          <div className="col-12 text-center">
            <Link to="/AllProjects">
              <Buttons
                menu="Back"
                color="secondary"
                onClick={() => console.log("Back")}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
