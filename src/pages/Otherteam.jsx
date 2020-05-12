import React, { useState, useCallback, useEffect, useContext } from "react"
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
import { UserContext } from "../UserContext"

export default function Otherteam(props) {
  const { user, setUser } = useContext(UserContext)
  const { id } = useParams()
  console.log({ id })
  const [group, setGroup] = useState({})
  const fetchData = useCallback(async () => {
    const data = await axios.get(`${process.env.REACT_APP_API_BE}/projects/${id}`) 
    setGroup(data.data) 

  }, [])
  useEffect(() => {
    fetchData()
  }, [])
console.log(group)
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-3">
          {group &&(
            <BreadcrumbNav
              pastref="/AllProjects"
              past="All Project"
              current={group.project}
            />
          )}
        </div>
        <div className="col-12 my-3">
          {group && (
            <Topicbox title="Senior Project Topic" topic={group.project} />
          )}
        </div>

        <div className="col-12 my-3">
          <div className="row">
            <div className="col-8">
              <MyteamMember title="Members" members={group.group} />
            </div>
            <div className="col-4">
              <MyteamAdvisor title="Advisor" advisors={group.teacher} />
            </div>
          </div>
        </div>

        <div className="col-12 my-3">
          <Boxitem title="Detail" detail={group.project} />
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
            {user.role == "aa" && (
              <Link to={`/editteam/${id}`}>
                <Buttons menu="Edit" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
