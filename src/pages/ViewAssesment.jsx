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
import { Container, Row, Col } from 'reactstrap';
import Loading from "../components/common/Loading"
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
      navigate("/main")
    }
  })

  useEffect(() => {
    checkRole()
  }, [user])
  if (isPrefetch) {
    return <><Loading open={isPrefetch}/>/</>
  }
  return (
    <>
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
                title={`Assignment ${id} : ${assessment.assignment_title} -> ${project_id.substring(0, 3) +
                  "60-" +
                  project_id.substring(project_id.length - 2, project_id.length)
                  }`}
              />
            </Card>
          </div>
        </div>
        <Row style={{ alignItems: "center" }, { marginLeft: 20 }}>
          <Col  >
            <br />
            <h4>
              Student Assignment
                                             </h4>
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
            <p>

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
          </Col>
        </Row>

        <Row>
          <Col sm={4} style={{ marginLeft: 60 }}>
            <Card className="fileareaAA" style={{ marginLeft: 13 }}>
              <Card.Body>
                {filefromBE.map((file, index) => {
                  if (file) {
                    return (
                      <>
                        <a
                          href={`http://127.0.0.1:8000/storage/${file.send_assignment}`}
                          download
                          target="_blank">
                          <FolderIcon className="primary" />
                              &nbsp;

                            {file.send_assignment_name.substring(0, 25)}
                          <br />  <br />

                        </a>
                      </>
                    )
                  } else {
                    return <></>
                  }
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <hr />

        <Row style={{ alignItems: "center" }, { marginLeft: 25 }}>
          <Col  >
            <br />
            <h4>
              Assessment
                                             </h4>
            <br />
          </Col>
        </Row>
        <Row>
          <Col sm={10} style={{ marginLeft: 60 }}>
            <Card style={{ marginLeft: 13 }}>
              <Card.Body>
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
              </Card.Body>
            </Card>
            <br />
          </Col>
        </Row>

        <div
          className="col-12 my-2"
        // style={{ border: "3px solid gold" }}
        >
          {assessment.responsible_assignment &&
            assessment.responsible_assignment.map((responsible, index) => {
              return (
                <>
                  <Row>
                    <Col sm={3} style={{ marginLeft: 50 }}>
                      <b>{responsible.teacher_name}</b>
                    </Col>
                  </Row>
                  <br/>
                  {/* <div
                    className="col-12"
                  // style={{ border: "3px solid purple" }}
                  > */}
                  {/* <div className="row my-2">
                      <b>{responsible.teacher_name}</b>
                    </div> */}
                  {/* <div className="row"> */}
                  {/* <div
                        className=" col-6 ml-4"
                     style={{ border: "3px solid violet" }}
                      > */}
                  {rubric &&
                    rubric.map((criteria, index) => {
                      let newscore = assessment.assessment.find(
                        (score) =>
                          score.criteria_id ===
                          criteria.criteria_id &&
                          score.responsible_assignment_id ===
                          responsible.id
                      )
                      return (
                        <>
                          <Row  style={{ marginLeft: 78 }}>
                            <Col sm={3}  style={{ marginTop: 4 }}>
                              <div>
                                <p>{criteria.criteria_name}</p>
                              </div>
                            </Col>
                            <Col sm={2}>
                              {/* {console.log("new", newscore)} */}
                              {newscore ? (
                                <div key={index}>
                                  {`:`}&nbsp;
                                  <input
                                    type="text"
                                    id="scoreOfcriteria"
                                    defaultValue={newscore.score}
                                    size="4"
                                    disabled
                                  />
                                </div>
                              ) : (
                                  <div key={index}>
                                    {`:`}&nbsp;
                                    <input
                                      type="text"
                                      id="scoreOfcriteria"
                                      defaultValue=""
                                      size="4"
                                      disabled
                                    />
                                  </div>
                                )}
                            </Col>
                          </Row>

                        </>
                      )
                    })}
                  {/* </div> */}
                  {/* </div>
                  </div> */}
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

        <br />
      </div>
    </>
  )
}
{/* <div className="row ">
<p className="mr-5">
  {criteria.criteria_name}
</p>
<div
  className="col-sm-auto row "
 style={{ border: "3px solid orange" }}
>
  <div className="d-flex"> */}
{/* {assessment.assessment &&
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
              return newScore >= 0 ? ( */}
// {newscore ? (
//   <input
//     key={index}
//     type="text"
//     id="scoreOfcriteria"
//     defaultValue={newscore.score}
//     size="4"
//     disabled
//   />
// ) : (
//     <input
//       key={index}
//       type="text"
//       id="scoreOfcriteria"
//       defaultValue=""
//       size="4"
//       disabled
//     />
//   )}

{/* ) : (
                 <></>
               ) */}
{/* } */ }
{/* )} */ }
//   </div>
// </div>
// </div>