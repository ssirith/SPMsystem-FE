import React, { useState, useCallback, useEffect, useContext } from "react"
import Cookie from 'js-cookie'
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
import Loading from "../components/common/Loading"

export default function Otherteam(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const { user, setUser } = useContext(UserContext)
  const [isPrefetch,setIsPreFetch]=useState(false)
  const { id } = useParams()
  const [group, setGroup] = useState({})
  const fetchData = useCallback(async () => {
    setIsPreFetch(true)
    const data = await axios.get(
      `${process.env.REACT_APP_API_BE}/projects/${id}`,{headers}
    )
    setGroup(data.data)
    setIsPreFetch(false)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])
  if(isPrefetch){
    return<><Loading open={isPrefetch}/></>
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-3">
          {group && (
            <BreadcrumbNav
              pastref="/allprojects"
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
            <div className="col-7">
              <MyteamMember title="Members" members={group.group} />
            </div>
            <div className="col-5">
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
            {user.role == "aa" ? (
              <Link to="/allprojects">
                <Buttons
                  menu="Back"
                />
              </Link>
            ) : (
              <Link to="/allprojects">
                <Buttons
                  menu="Back"
                /> 
              </Link>
            )}

            {user.role == "aa" && (
              <Link to={`/editteam/${id}`} className="mx-2">
                <Buttons menu="Edit" color = "primary" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
