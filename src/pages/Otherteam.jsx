import React, { useState, useCallback, useEffect, useContext } from "react"
import Cookie from 'js-cookie'
import BreadcrumbNav from "../components/common/BreadcrumbNav"
import { Link, useParams } from "@reach/router"
import Boxitem from "../components/common/Boxitem"
import Topicbox from "../components/common/Topicbox"
import Buttons from "../components/common/Buttons"
import axios from "axios"
import Swal from 'sweetalert2'
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
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const [isPrefetch, setIsPreFetch] = useState(false)
  const { id } = useParams()
  const [group, setGroup] = useState({})
  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      const data = await axios.get(
        `${process.env.REACT_APP_API_BE}/projects/${id}`, { headers }
      )
      setGroup(data.data)
      setIsPreFetch(false)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again later.',
      })
      // console.log(err)
    }
  }, [])
  useEffect(() => {
    fetchData()
  }, [])
  if (isPrefetch) {
    return <><Loading open={isPrefetch} /></>
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
            {user && user.user_type == "AA" ? (
              <>

                <Link to="/allprojects">
                  <Buttons
                    menu="Back"
                  />
                </Link>
                <Link to={`/editteam/${id}`} className="mx-2">
                  <Buttons menu="Edit" color="primary" />
                </Link>
                <br />
              </>

            ) : (
                <>
                  <Link to="/allprojects">
                    <Buttons
                      menu="Back"
                    />
                  </Link>
                  <br />
                </>
              )}

            {/* {user && user.user_type == "AA" && (
              <Link to={`/editteam/${id}`} className="mx-2">
                <Buttons menu="Edit" color="primary" />
              </Link>
            )} */}
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}
