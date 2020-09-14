import React, { useCallback, useContext, useEffect, useState } from "react"
import BreadcrumbNavStrings from "../components/common/BreadcrumbNavString"
import { Link, useParams, useNavigate } from "@reach/router"
import { UserContext } from "../UserContext"
import { Card } from "react-bootstrap"
import { CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

export default function ViewAssesment() {
  const { user, setUser } = useContext(UserContext)
  const { id } = useParams()
  const { project_id } = useParams()
  const [isPrefetch, setIsPreFetch] = useState(false)
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
  const fetchData = useCallback(async () => {}, [])
  useEffect(() => {
    fetchData()
  }, [])
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
                title={`Assignment ${id} : Test 1 -> ${project_id}`}
              />
            </Card>
          </div>
        </div>
        <div className="container" style={{ border: "3px solid pink" }}>
          <div className="col-12" style={{ border: "3px solid red" }}>
              <h2>Students Assignment</h2>
              <div className="col-8" style={{ border: "3px solid blue" }}>
                    <p>{`Assignment Submission Status: `}</p>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
