import React, { useState, useContext, useCallback, useEffect } from "react"
import Cookie from 'js-cookie'
import AssignmentTable from "../components/common/AssignmentTable"
import { UserContext } from "../UserContext"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import { Link, navigate, useParams } from "@reach/router"
import { makeStyles } from "@material-ui/core/styles"
import dayjs from "dayjs"
import axios from "axios"
import Buttons from "../components/common/Buttons"
import Inputtext from "../components/common/Inputtext"
import AssignmentTopicBox from "../components/common/AssignmentTopicBox"
import AssignmentTopicBoxAA from "../components/common/AssignmentTopicBoxAA"
import FilterAssignmentBox from "../components/common/FilterAssignmentBox"
import Loading from "../components/common/Loading"
import Swal from 'sweetalert2'
export default function Assignments() {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const useStyles = makeStyles({
    root: {
      position: "relative",
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  })
  const classes = useStyles()
  const { user, setUser } = useContext(UserContext)
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const [sortassignments, setSortAssignments] = useState([])
  const [isPrefetch, setIsPreFetch] = useState(false)
  const [teacher_assignments, setTeacher_Assignments] = useState()
  // const [aa_assignment, setAa_Assignments] = useState()
  const [responsible, setResponsible] = useState()
  const [checkFilter, setCheckFilter] = useState(false)
  const [search, setSearch] = useState("")
  const fetchData = useCallback(async () => {
    try {

      setIsPreFetch(true)
      const response = await axios.get(
        `${process.env.REACT_APP_API_BE}/assignments`, { headers }
      )
      // console.log('res data',response.data)
      const temp = []
      response.data.map((data, index) => {
        temp.push({ ...data, data })
        // console.log('temp',temp)
      })
      sortAssignments(temp)
      const ass = await axios.get(`${process.env.REACT_APP_API_BE}/assignments`, { headers })
      const tch = await axios.get(`${process.env.REACT_APP_API_BE}/assignments/responsible/teacher/${user.user_id}`, { headers })
      setTeacher_Assignments(ass.data)
      // setAa_Assignments(ass.data)
      setResponsible(tch.data)
      setIsPreFetch(false)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again later.',
      })
      // console.log(err)
      navigate('/main')
    }
  }, [])

  function sortAssignments(assignments) {
    let newAssignment = assignments
    newAssignment.sort((a, b) => (dayjs(b.date_time).isBefore(a.date_time) ? 1 : -1))
    setSortAssignments(newAssignment)
  }

  useEffect(() => {
    fetchData()
  }, [user])
  if (isPrefetch) {
    return <>
      <Loading open={isPrefetch} />
    </>
  }

  return (
    <>
      {/* {console.log('sort',sortassignments)} */}
      {user && user.user_type === "Student" && (
        <div className="container mt-5">
          <div className="d-inline my-auto">
            <FiberManualRecordIcon className="successStatus" />
            <small className="d-inline">Submitted</small>&nbsp;&nbsp;
            <FiberManualRecordIcon className='warning' />
            <small className="d-inline">Submitted Late</small>&nbsp;&nbsp;
            <FiberManualRecordIcon color="disabled" />
            <small className="d-inline">Not submitted</small>&nbsp;&nbsp;
            <FiberManualRecordIcon color="secondary" />
            <small className="d-inline">Late</small>
          </div>

          <table class="table" style={{ outlineStyle: 'solid', outlineWidth: '1px', outlineColor: '#C4C4C4' }}>
            <thead class="thead-primary">
              <tr>
                <th colSpan="8" style={{ fontSize: '28px' }}>Assignments</th>
              </tr>
            </thead>
            <tbody>
              {sortassignments.map((assignment, index) => (
                <AssignmentTable assignment={assignment} user={user} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user && user.user_type === "Teacher" && (
        <div className="container">
          <br />
          <div className="row">
            <div className="col-12 my-3">
              <div className="row">
                <div className="col-8 my-3">
                  <Inputtext
                    type="text"
                    placeholder="Search Assignment Topic"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Link to="/createassignment">
                  <div className="col-10 my-4">
                    <Buttons
                      style={{ backgroundColor: 'green' }}
                      className="success"
                      menu="Create Assignment"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 my-3">
              <div className="row">
                <div className="col-8">
                  <AssignmentTopicBox
                    assignments={teacher_assignments}
                    responsible={responsible}
                    search={search}
                    checkFilter={checkFilter}
                  />
                </div>
                <div className="col-3">
                  <FilterAssignmentBox
                    setCheckFilter={setCheckFilter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && user.user_type === "AA" && (
        <div className="container">
          <div className="row">
            <div className="col-12 my-3">
              <div className="row">
                <div className="col-8 my-3">
                  <Inputtext
                    type="text"
                    placeholder="Search Assignment Topic"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Link to="/createassignment">
                  <div className="col-10 my-4">
                    <Buttons
                      style={{ backgroundColor: 'green' }}
                      className="success"
                      menu="Create Assignment"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 my-3">
              <div className="row">
                <div className="col-8">
                  <AssignmentTopicBoxAA
                    assignments={teacher_assignments}
                    search={search}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  )
}
