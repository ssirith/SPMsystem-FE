import React, { useState, useContext, useCallback, useEffect } from "react"
import AssignmentTable from "../components/common/AssignmentTable"
import { UserContext } from "../UserContext"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import dayjs from "dayjs"
import axios from "axios"

export default function Assignments() {
  const { user, setUser } = useContext(UserContext)
  const [assignments, setAssignments] = useState([])
  const [isPrefetch, setIsPreFetch] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      const response = await axios.get(
        `${process.env.REACT_APP_API_BE}/assignments`
      )
      // console.log('res data',response.data)
      const temp = []

      response.data.map((data, index) => {
        temp.push({...data,data})
        // console.log('temp',temp)
      })
      setAssignments(temp)
      setIsPreFetch(false)
      // console.log('ass',assignments)
    } catch (err) {
      console.log(err)
    }
  })

  useEffect(() => {
    fetchData()
  }, [])

  if (isPrefetch) {
    return <></>
  }

  return (
    <>
      {user.role === "student" && (
        <div className="container mt-5">
          <div className="d-inline my-auto">
            <FiberManualRecordIcon color="primary" />
            <small className="d-inline">Submitted</small>
            <FiberManualRecordIcon className='warning' />
            <small className="d-inline">Submitted Late</small>
            <FiberManualRecordIcon color="disabled" />
            <small className="d-inline">Not submitted</small>
            <FiberManualRecordIcon color="secondary" />
            <small className="d-inline">Late</small>
          </div>

          <table class="table">
            <thead class="thead-primary">
              <tr>
                <th colSpan="7">Assignments</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <AssignmentTable assignment={assignment} user={user} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user.role === "teacher" && <p>This is teacher's assignments page</p>}
    </>
  )
}
