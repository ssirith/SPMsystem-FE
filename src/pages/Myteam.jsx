import React, { useState, useCallback, useEffect, useContext } from "react"
import Cookie from "js-cookie"
import { Link } from "@reach/router"
import Boxitem from "../components/common/Boxitem"
import MyteamMember from "../components/common/MyteamMember"
import MyteamAdvisor from "../components/common/MyteamAdvisor"
import Topicbox from "../components/common/Topicbox"
import Buttons from "../components/common/Buttons"
import axios from "axios"
import ModalcomponentDelete from "../components/common/ModalcomponentDelete"
import { UserContext } from "../UserContext"
import ModalWindowProfileStudent from "../components/common/ModalWindowProfileStudent"
import Carditem from "../components/common/Carditem"
import Loading from "../components/common/Loading"
import Swal from 'sweetalert2'
export default function Myteam() {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const { user, setUser } = useContext(UserContext) //Mock data user context
  const [stdGroup, setStdGroup] = useState({}) // กลุ่มของนศ.ถูกเก็บเป็น object
  const [group, setGroup] = useState([])
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenwindow, setIsOpenWindow] = useState(true)
  const [checkDepartment, setCheckDepartment] = useState()
  const [isPreFetch, setIsPreFetch] = useState(false)
  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      if (user&&user.user_type === "Student") {
        const dat = await axios.get(
          `https://seniorprojectmanagement.tk/api/group/${user.user_id}`,
          { headers }
        ) //[]https://127.0.0.1:8000/api/projects
        setStdGroup(dat.data)
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BE}/students`,
          {
            headers,
          }
        )
        const dep = data.find((a) => a.student_id === user.user_id)
        setCheckDepartment(dep.department)
      } else if (user&&user.user_type === "Teacher") {
        const data = await axios.get(
          `${process.env.REACT_APP_API_BE}/projects/response/teacher/${user.user_id}`,
          { headers }
        )
        setGroup(data.data)
      } else if (user&&user.user_type === "AA") {
        // console.log("in if student")
        const data = await axios.get(
          `${process.env.REACT_APP_API_BE}/projects/response/aa/${user.user_id}`,
          { headers }
        )
        setGroup(data.data)
      } else {
        return
      }
      setIsPreFetch(false)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again.',
      })
      console.log(err)
    }
  })

  useEffect(() => {
    fetchData()
  }, [user])

  if (isPreFetch) {
    return (
      <>
        <Loading open={isPreFetch} />
      </>
    )
  }

  return (
    <>
      {console.log("user context", user)}
      {user && user.user_type === "Student" && (
        <>
          {user && user.department ? (
            <>
              {stdGroup.project ? (
                <div className="container">
                  <div className="row">
                    <div className="col-12 mt-5 mb-2">
                      {stdGroup && (
                        <Topicbox
                          title="Senior Project Topic"
                          topic={stdGroup.project}
                        />
                      )}
                    </div>

                    <div className="col-12 my-2">
                      <div className="row">
                        <div className="col-7">
                          <MyteamMember
                            title="Members"
                            members={stdGroup.group}
                          />
                        </div>
                        <div className="col-5">
                          <MyteamAdvisor
                            title="Advisor"
                            advisors={stdGroup.teacher}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12 my-3">
                      <Boxitem title="Detail" detail={stdGroup.project} />
                    </div>
                    <div className="col-12 mx-auto">
                      <div className="row">
                        <div className="col-12 text-center">
                          <Link
                            className="mr-2"
                            to={`/editteam/${stdGroup.group[0].project_id}`}
                          >
                            <Buttons menu="Edit" />
                          </Link>
                          <Buttons
                            menu="Delete"
                            color="secondary"
                            onClick={() => setIsOpenDelete(true)}
                          />
                          <ModalcomponentDelete
                            isOpen={isOpenDelete}
                            setIsOpen={setIsOpenDelete}
                            header="Confirmation"
                            toDelete={stdGroup.project}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="container text-center my-auto">
                  <img
                    src="/image/DashboardLogo.jpg"
                    alt="Dashboard logo"
                    className="img-fluid"
                    width="50%"
                    height="auto"
                  />
                  <p>
                    Oops, you don't have any project click Create Project button
                    to create one.
                  </p>
                  <Link to="/createteam">
                    <Buttons menu="Create" color="primary" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <ModalWindowProfileStudent
              isOpen={isOpenwindow}
              setIsOpen={setIsOpenWindow}
            />
          )}
        </>
      )}

      {user && user.user_type === "Teacher" && (
        <>
          {group && group.length > 0 ? (
            <div className="container">
              <div className="row mt-5">
                {group.map((data, index) => {
                  return (
                    <div className="col-3 m-3" key={index}>
                      <Carditem groups={data} />
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="container text-center my-auto">
              <img
                src="/image/myproject.jpg"
                alt="Dashboard logo"
                className="img-fluid"
                width="50%"
                height="auto"
              />
              <p>Oops, you don't have any project.</p>
            </div>
          )}
        </>
      )}
      {user && user.user_type == "AA" && (
        <>
        {group && group.length > 0 ? (
          <div className="container">
            <div className="row mt-5">
              {group.map((data, index) => {
                return (
                  <div className="col-3 m-3" key={index}>
                    <Carditem groups={data} />
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="container text-center my-auto">
            <img
              src="/image/myproject.jpg"
              alt="Dashboard logo"
              className="img-fluid"
              width="50%"
              height="auto"
            />
            <p>Oops, you don't have any project.</p>
          </div>
        )}
      </>
      )}
    </>
  )
}
