import React, { useState, useCallback, useEffect, useContext } from "react"
import Cookie from "js-cookie"
import BreadcrumbNavStrings from "../components/common/BreadcrumbNavString"
import { Link, useParams, useNavigate } from "@reach/router"
import Buttons from "../components/common/Buttons"
import axios from "axios"
import Inputtext from "../components/common/Inputtext"
import { UserContext } from "../UserContext"
import { Card } from "react-bootstrap"
import { CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import FolderIcon from "@material-ui/icons/Folder"
import { Table } from "react-bootstrap"
import { Container, Row, Col } from "reactstrap"
import Textarea from "../components/common/Textarea"
import Loading from "../components/common/Loading"

export default function Assesment(props) {
  const { user, setUser } = useContext(UserContext)
  //     const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  //   const  [user, setUser ] = useState(userBeforeParse)
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const [isPreFetch, setIsPreFetch] = useState(false)
  const { assignment_id } = useParams()
  const { id } = useParams()
  const [assesmentScore, setAssesmentScore] = useState([])
  const [isAssesment, setIsAssesment] = useState()
  const [criterions, setCriterions] = useState()
  const [feedback, setFeedback] = useState([])
  const [projectID, setPorjectID] = useState()
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
    setIsPreFetch(true)
    const res = await axios.get(
      `${process.env.REACT_APP_API_BE}/assessment/${assignment_id}/${id}`,
      { headers }
    )
    var criterions = []
    res.data.criterions.map((c, index) => {
      let idx = criterions.findIndex(
        (item) => item.criteria_id === c.criteria_id
      )
      if (idx !== -1) {
        criterions[idx].criteria_detail.push({
          criteria_detail_id: c.criteria_detail_id,
          name: c.criteria_detail,
          value: c.criteria_score,
        })
        criterions[idx].criteria_detail.sort((a, b) => {
          return a.value - b.value
        })
      } else {
        criterions.push({
          criteria_id: c.criteria_id,
          criteria_name: c.criteria_name,
          delete_criteria_deteail: [],
          criteria_detail: [
            {
              criteria_detail_id: c.criteria_detail_id,
              name: c.criteria_detail,
              value: c.criteria_score,
            },
          ],
        })
      }
    })
    var newProjectID = ""
    if (id.length) {
      if (id.length > 4) {
        newProjectID =
          id.substring(0, 3) + "60-" + id.substring(id.length - 2, id.length)
      } else {
        newProjectID =
          id.substring(0, 2) + "60-" + id.substring(id.length - 2, id.length)
      }
    }
    setPorjectID(newProjectID)
    setCriterions(criterions)
    setIsAssesment(res.data)

    let filterTeacher = res.data.responsible_assignment.find(
      (r) => r.teacher_id === user.user_id
    ) //2
    const newAssessment = res.data.assessment.filter(
      (a) => a.responsible_assignment_id === filterTeacher.id
    )
    setAssesmentScore(newAssessment)

    if (res.data.feedback.length !== 0) {
      let checkFeedback = res.data.feedback.find(
        (f) => f.teacher_id === user.user_id
      )
      if (checkFeedback) {
        setFeedback(checkFeedback.feedback_detail) //[]
      }
    } else {
      setFeedback("")
    }
    setIsPreFetch(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [user])

  const checkRole = useCallback(() => {
    if (user) {
      if ((user && user.user_type === "Student") || user.user_type === "AA") {
        alert(`You dont'have permission to go this page.`)
        navigate("/main")
      }
    }
  })
  useEffect(() => {
    checkRole()
  }, [user])

  function handleAssesment(event, index, data) {
    // 0, 1

    let teacher = isAssesment.responsible_assignment.find(
      (t) => t.teacher_id === user.user_id
    )
    if (assesmentScore.some((item) => item.criteria_id === data.criteria_id)) {
      let newAss = [...assesmentScore]
      newAss[index] = { ...newAss[index], score: parseInt(event.target.value) }
      setAssesmentScore(newAss)
    } else {
      setAssesmentScore([
        ...assesmentScore,
        { criteria_id: data.criteria_id, score: parseInt(event.target.value) },
      ])
    }
  }

  function handleFeedback(event, index) {
    setFeedback(event.target.value)
  }

  async function handleSubmit() {
    if (assesmentScore.length === criterions.length) {
      let teacher = isAssesment.responsible_assignment.find(
        (t) => t.teacher_id === user.user_id
      ) //teacher.id ===2
      let assessment = []
      assesmentScore.map((item) => {
        if (item.responsible_assignment_id === teacher.id) {
          assessment.push({
            criteria_id: item.criteria_id,
            score: parseInt(item.score),
          })
        }
      })

      let responsible_assignment_id = ""
      if (isAssesment.responsible_assignment.length !== 0) {
        responsible_assignment_id = isAssesment.responsible_assignment.find(
          (item) => item.responsible_teacher_id === user.user_id
        )
      }

      let data
      if (feedback === "") {
        data = {
          assignment_id: parseInt(assignment_id),
          project_id: id,
          rubric_id: isAssesment.rubric_id,
          responsible_assignment: responsible_assignment_id.id + "",
          assessment: assesmentScore,
          feedback: "-",
        }
      } else {
        data = {
          assignment_id: parseInt(assignment_id),
          project_id: id,
          rubric_id: isAssesment.rubric_id,
          responsible_assignment: responsible_assignment_id.id + "",
          assessment: assesmentScore,
          feedback: feedback,
        }
      }
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BE}/assessment`,
          data,{ headers }
        )
        if (response.status === 200) {
          alert("Success.")
          navigate(`/assignments/${assignment_id}`)
        }
      } catch (err) {
        alert("It's not success, Please check your input")
        console.error(err)
      }
    } else {
      alert("Check your input!!")
    }
  }
  if (isPreFetch) {
    return (
      <>
        <Loading open={isPreFetch} />
      </>
    )
  }
  return (
    <>
      {user && user.user_type === "Teacher" && (
        <>
          {isAssesment && (
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  <BreadcrumbNavStrings
                    pastref="/assignments"
                    past="All Assignment"
                    pastsref={`/assignments/${assignment_id}`}
                    pasts={`Assignment ${assignment_id}`}
                    current="Assesment"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12  text-center">
                  <Card className={classes.root}>
                    <CardHeader
                      title={`Assignment ${assignment_id} : ${isAssesment.assignment_title} -> ${projectID}`}
                    />
                  </Card>
                </div>
              </div>
              <Row style={({ alignItems: "center" }, { marginLeft: 20 })}>
                <Col>
                  <br />
                  <h4>Student Assignment</h4>
                  <br />
                </Col>
              </Row>

              <Row>
                <Col sm={3.5}>
                  <p style={{ marginLeft: 90 }}>
                    Assignment Submission Status:
                  </p>
                </Col>
                <Col sm={2}>
                  {isAssesment.submission.status === "Submitted" ? (
                    <p>
                      <FiberManualRecordIcon className="successStatus" />
                      <medium className="d-inline">On time</medium>
                    </p>
                  ) : (
                    <p>
                      <FiberManualRecordIcon color="secondary" />
                      <medium className="d-inline">Late</medium>
                    </p>
                  )}
                </Col>
              </Row>

              <Row>
                <Col sm={4} style={{ marginLeft: 60 }}>
                  <Card className="fileareaAA" style={{ marginLeft: 13 }}>
                    <Card.Body>
                      {isAssesment.send_assignment.map((a, index) => {
                        return (
                          <a
                            href={`http://127.0.0.1:8000/storage/${a.send_assignment}`}
                            download
                            target="_blank"
                          >
                            <FolderIcon className="primary" />
                            &nbsp;&nbsp;
                            {a.send_assignment_name.substring(0, 25)}
                            <br /> <br />
                          </a>
                        )
                      })}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <br />
              <hr />

              <Row style={{ alignItems: "center", marginLeft: 25 }}>
                <Col>
                  <br />
                  <h4>Assessment</h4>
                  <br />
                </Col>
              </Row>
              <Row>
                <Col sm={10} style={{ marginLeft: 60 }}>
                  <Card style={{ marginLeft: 13 }}>
                    <Card.Body>
                      <Table striped bordered hover responsive="sm">
                        <tbody>
                          {criterions &&
                            criterions.map((data, index) => {
                              return (
                                <>
                                  <tr>
                                    <td
                                      className="table-active"
                                      style={{ width: "20%" }}
                                    >
                                      {data.criteria_name}
                                    </td>
                                    {data.criteria_detail.map((s, pos) => {
                                      return (
                                        <>
                                          <td
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
                                </>
                              )
                            })}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
              </Row>

              {criterions &&
                criterions.map((data, index) => {
                  let teacher = isAssesment.responsible_assignment.find(
                    (t) => t.teacher_id === user.user_id
                  )
                  let temp = assesmentScore.find(
                    (item) =>
                      item.criteria_id === data.criteria_id &&
                      item.responsible_assignment_id === teacher.id
                  ) // (item.responsible_assignment_id === teacher.id)

                  return (
                    <Row style={{ alignItems: "center" }}>
                      <Col sm={3} style={{ marginLeft: 78 }}>
                        <div key={index}>
                          {" "}
                          {`Score Of ${data.criteria_name}`}
                          <span className="text-danger">*</span>
                        </div>
                      </Col>
                      <Col sm={2} style={{ marginTop: 25 }}>
                        {temp ? (
                          <div key={index}>
                            {`:`}&nbsp;
                            <input
                              type="text"
                              size="4"
                              defaultValue={temp.score}
                              onChange={(event) =>
                                handleAssesment(event, index, data)
                              }
                            />
                          </div>
                        ) : (
                          <div key={index}>
                            {": "}&nbsp;
                            <input
                              type="text"
                              size="4"
                              onChange={(event) =>
                                handleAssesment(event, index, data)
                              }
                            />
                          </div>
                        )}
                        <br />
                      </Col>
                    </Row>
                  )
                })}

              <Row style={({ alignItems: "center" }, { marginLeft: 40 })}>
                <Col>
                  <br />
                  <h4>Feedback</h4>
                  <br />
                </Col>
              </Row>
              <Row>
                <Col sm={8} style={{ marginLeft: 70 }}>
                  <Textarea
                    id="feedback"
                    defaultValue={feedback}
                    label="Input feedback"
                    onChange={(event) => handleFeedback(event)}
                  />
                </Col>
              </Row>

              <br />
              <div className="col-12 mx-auto">
                <div className="row">
                  <div className="col-12 text-center">
                    <Link className="mr-2" to={`/assignments/${assignment_id}`}>
                      <Buttons menu="Cancel" />
                    </Link>

                    <Buttons
                      menu="Save"
                      color="primary"
                      onClick={(event) => handleSubmit(event)}
                    />
                  </div>
                </div>
              </div>
              <br />
            </div>
          )}
        </>
      )}
    </>
  )
}
