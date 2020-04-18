import React, { useState, useCallback, useEffect } from "react"
import { Link } from "@reach/router"
import Carditem from "../components/common/Carditem"
import Boxitem from "../components/common/Boxitem"
import Inputtext from "../components/common/Inputtext"
import MyteamMember from "../components/common/MyteamMember"
import MyteamAdvisor from "../components/common/MyteamAdvisor"
import Topicbox from "../components/common/Topicbox"
import Buttons from "../components/common/Buttons"
import axios from "axios"
import ModalcomponentDelete from "../components/common/ModalcomponentDelete"
export default function Myteam() {
  const [role, setRole] = useState("student")//Mock data
  const [teacher_id, setTeacher_id]=useState(1)//Mock data
  const [team, setTeam] = useState({})
  const [group, setGroup] = useState([])
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const fetchData = useCallback(async () => {
    if (role == "student") {
      const data = await axios.get(`http://127.0.0.1:8000/api/projects/IT01`) //[]
      setTeam(data.data) //{group[{},{},{}], project{}, teacher[{}]}
    }else if(role=="teacher"){
      const data= await axios.get(`http://127.0.0.1:8000/api/projects/response/${teacher_id}`)
      setGroup(data.data)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  console.log(team)
  console.log(team.project)

  return (
    <>
      {role == "student" && (
        <>
          {team.project ? (
            <div className="container">
              <div className="row">
                <div className="col-12 mt-5 mb-2">
                  {team && (
                    <Topicbox
                      title="Senior Project Topic"
                      topic={team.project}
                    />
                  )}
                </div>

                <div className="col-12 my-2">
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
                <div className="col-12 mx-auto">
                  <div className="row">
                    <div className="col-12 text-center">
                      <Link to={`/editteam/${team.group[0].project_id}`}>
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
                        toDelete={team.project}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container text-center my-auto">
              <p>
                Oops,you don't have any project click Create Project button to
                create one.
              </p>

              <Link to="/createteam">
                <Buttons
                  menu="Create"
                  color="primary"
                  onClick={() => console.log("Create")}
                />
              </Link>
            </div>
          )}
        </>
      )}

      {role == "teacher" && (
        <>
          <div className="container">
            <div className="row mt-5">
              {group.map((data) => {
                return (
                  <div className="col-3 my-3">
                    <Carditem groups={data} />
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
      {role == "aa" && (
        <>
          <div className="container">
            <div className="row mt-5">
              {group.map((data) => {
                return (
                  <div className="col-3 my-3">
                    <Carditem groups={data} />
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
     
    </>
  )
}
