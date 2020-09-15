import React, { useCallback, useContext, useEffect, useState } from "react"
import BreadcrumbNavStrings from "../components/common/BreadcrumbNavString"
import { Link, useParams, useNavigate } from "@reach/router"
import { UserContext } from "../UserContext"
import { Card } from "react-bootstrap"
import { CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Table } from "react-bootstrap"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import FolderIcon from "@material-ui/icons/Folder"
import axios from "axios"
import Buttons from "../components/common/Buttons"

export default function ViewAssesment() {
  const { user, setUser } = useContext(UserContext)
  const [assessment, SetAssessment] = useState({})
  const [filefromBE, SetFilefromBE] = useState([])
  const { id } = useParams()
  const { project_id } = useParams()
  const [isPrefetch, setIsPreFetch] = useState(false)
  const [rubric, setRubric] = useState([])
  const [score, setScore] = useState([])
  let navigate = useNavigate()
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
  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      const response = await axios.get(
        `${process.env.REACT_APP_API_BE}/assessment/${id}/${project_id}`
      )
      console.log("response", response.data)
      if (response.status === 200) {
        loopCriterions(response.data.criterions)
        SetAssessment(response.data)
        SetFilefromBE(response.data.send_assignment)
        setIsPreFetch(false)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  function loopCriterions(data) {
    var criterions = []
    data.map((c, index) => {
      let idx = criterions.findIndex(
        (item) => item.criteria_id === c.criteria_id
      )
      if (idx !== -1) {
        //0
        criterions[idx].score.push({
          name: c.criteria_detail,
          value: c.criteria_score,
        })
      } else {
        criterions.push({
          criteria_id: c.criteria_id,
          criteria_name: c.criteria_name,
          score: [
            {
              name: c.criteria_detail,
              value: c.criteria_score,
            },
          ],
        })
      }
    })
    setRubric(criterions)
  }

  const checkRole = useCallback(() => {
    if (user.role === "student" || user.role === "teacher") {
      alert(`You dont'have permission to go this page.`)
      navigate("/")
    }
  })

  useEffect(() => {
    checkRole()
  }, [user])
  if (isPrefetch) {
    return <></>
  }
  return (
    <>
      {/* {console.log("responsible", assessment.responsible_assignment)} */}
      {/* {console.log('responsible',assessment.submission.status)} */}
      {console.log("rubric", rubric)}
      <div className="container">
        <div className="row">
          <div className="col-12 my-3">
            <BreadcrumbNavStrings
              pastref="/assignments"
              past="All Assignment"
              pastsref={`/assignments/${id}`}
              pasts={`Assignment ${id}`}
              current="Assesment"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12  text-center">
            <Card className={classes.root}>
              <CardHeader
                title={`Assignment ${id} : ${assessment.assignment_title} -> ${
                  project_id.substring(0, 3) +
                  "60-" +
                  project_id.substring(project_id.length - 2, project_id.length)
                }`}
              />
            </Card>
          </div>
        </div>
        <div className="container" 
        // style={{ border: "3px solid pink" }}
        >
          <div className="col-12 mt-4" 
          // style={{ border: "3px solid red" }}
          >
            <h2>Students Assignment</h2>
            <div className="col-8" 
            // style={{ border: "3px solid blue" }}
            >
              <p>
                {`Assignment Submission Status: `}
                <FiberManualRecordIcon
                  className={
                    assessment.submission &&
                    assessment.submission.status === "Submitted"
                      ? "successStatus"
                      : "danger"
                  }
                />
                {assessment.submission &&
                assessment.submission.status &&
                assessment.submission.status === "Submitted" ? (
                  <>{`On Time`}</>
                ) : (
                  <>Late</>
                )}
              </p>

              <div
                className=" col-8 fileareaAA"
                // style={{ border: "3px solid Black" }}
              >
                <div className="fileContent ">
                  <ul className="list-unstyled">
                    {filefromBE.map((file, index) => {
                      if (file) {
                        return (
                          <>
                            <li key={index} className="li-Content">
                              {" "}
                              <FolderIcon className="primary" />
                              &nbsp;
                              <span>
                                {file.send_assignment_name.substring(0, 20)}{" "}
                                &nbsp;{"..."}
                              </span>
                            </li>
                          </>
                        )
                      } else {
                        return <></>
                      }
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <hr />
            <div className="col" 
            // style={{ border: "3px solid lime" }}
            >
              <h2>Assessment</h2>
              <Table striped bordered hover responsive="sm">
                <tbody>
                  {rubric &&
                    rubric.map((data, index) => {
                      return (
                        <tr>
                          <td className="table-active" style={{ width: "20%" }}>
                            {data.criteria_name}
                          </td>
                          {data.score.map((s, pos) => {
                            return (
                              <>
                                <td
                                  key={pos}
                                  className="text-center table-light"
                                  style={{ width: "15%" }}
                                >
                                  {s.value}
                                  <br />
                                  {s.name}
                                </td>
                              </>
                            )
                          })}
                        </tr>
                      )
                    })}
                </tbody>
              </Table>
            </div>

            <div className="col-12 my-2" 
            // style={{ border: "3px solid gold" }}
            >
              {assessment.responsible_assignment &&
                assessment.responsible_assignment.map((responsible, index) => {
                  return (
                    <>
                      <div
                        className="col-12"
                        // style={{ border: "3px solid purple" }}
                      >
                        <div className="row my-2">
                          <b>{responsible.teacher_name}</b>
                        </div>
                        <div className="row">
                          <div
                            className=" col-6 ml-4"
                            // style={{ border: "3px solid violet" }}
                          >
                            {rubric &&
                              rubric.map((criteria, index) => {
                                return (
                                  <>
                                    <div className="row ">
                                      <p className="mr-5">
                                        {criteria.criteria_name}
                                      </p>
                                      <div
                                        className="col-sm-auto row "
                                        // style={{ border: "3px solid orange" }}
                                      >
                                        <div className="d-flex">
                                          {assessment.assessment &&
                                            assessment.assessment.map(
                                              (score) => {
                                                let newScore
                                                if (
                                                  score.criteria_id ===
                                                    criteria.criteria_id &&
                                                  score.responsible_assignment_id ===
                                                    responsible.id
                                                ) {
                                                  newScore = score.score
                                                }
                                                return newScore > 0 ? (
                                                  <input
                                                    key={index}
                                                    type="text"
                                                    id="scoreOfcriteria"
                                                    defaultValue={newScore}
                                                    size="4"
                                                    disabled
                                                  />
                                                ) : (
                                                  <></>
                                                )
                                              }
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )
                              })}
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
            </div>
            <hr />
            <div className="row justify-content-center">
              <Link to={`/assignments/${id}`}>
                <Buttons className="grey" menu="Back" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
