import React, { useState, useContext } from "react"
import AssignmentTable from "../components/common/AssignmentTable"
import { UserContext } from "../UserContext"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import dayjs from "dayjs"

export default function Assignments() {
  const { user, setUser } = useContext(UserContext)
  const [assignments, setAssignments] = useState([
    {
      name: "Joel",
      duedate: dayjs().format("MMMM D,YYYY / HH.MM"),
      createdate: dayjs().format("MMMM D,YYYY / HH.MM"),
    },
    {
      name: "Lisa",
      duedate: dayjs().format("MMMM D,YYYY / HH.MM"),
      createdate: dayjs().format("MMMM D,YYYY / HH.MM"),
    },
  ])
  const isPrefetch = useState(false)
  return (
    <>
    {user.role==="student"&&(
       <div className="container mt-5">
      <div className="d-inline my-auto">
        <FiberManualRecordIcon color="primary" />
        <small className="d-inline">Submitted</small>
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
            <AssignmentTable assignment={assignment} index={index+1} />
          ))}
        </tbody>
      </table>
    </div>
    )}
    {user.role==='teacher'&&(
      <p>This is teacher's assignments page</p>
    )}
   
    </>
  )
}
