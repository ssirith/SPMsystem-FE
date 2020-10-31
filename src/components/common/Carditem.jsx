import React from "react"
import { Card } from "react-bootstrap"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import { navigate } from "@reach/router"

const useStyles = makeStyles({
  root: {
    width: "293px",
    height: "220px",
  },
  stickToBottom: {
    bottom: 0,
  },
})

export default function Carditem(props) {
  const classes = useStyles()
  // console.log(props.groups.project_id.length)//DSI-5 IT-4
  return (
    <>
      {/* <div>
        <Card className={classes.root}>
          <CardHeader
            title={`${
              props.groups.project_department
              }60-${props.groups.project_id && (props.groups.project_id.length > 4 ?
                (props.groups.project_id.substring(3)) : (props.groups.project_id.substring(2)))}`}
          />
          <CardContent className="pb-0">
          </CardContent>
        </Card>
         
      </div> */}

      <div>
        <Card style={{ width: "18rem", height: "15rem" }}>
          <Card.Header>
            {`${props.groups.project_department}60-${
              props.groups.project_id &&
              (props.groups.project_id.length > 4
                ? props.groups.project_id.substring(3)
                : props.groups.project_id.substring(2))
            }`}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <div className="text-center">
                <p className="m-0">{props.groups.project_name}</p>
                {props.groups.project_detail ? (
                  props.groups.project_detail === null ? (
                    <p className="my-0 grey">-No Detail-</p>
                  ) : (
                    <p className="my-0">
                      {props.groups.project_detail.substring(0, 80) + "..."}
                    </p>
                  )
                ) : (
                  <p className="my-0 grey">-No Detail-</p>
                )}

                {props.groups.teachers &&
                  (props.groups.teachers.length === 0 ? (
                    <p className="my-0 grey">-No Advisor-</p>
                  ) : (
                    props.groups.teachers.map((a, index) => {
                      return <p className="my-0">Advisor: {a.teacher_name}</p>
                    })
                  ))}
              </div>
            </Card.Text>
          </Card.Body>

          <Card.Link
            className="d-flex justify-content-end m-2"
          >
            <Button size="small" color="primary" onClick={()=>navigate(`/projects/${props.groups.project_id}`)}>
              More
            </Button>
          </Card.Link>
        </Card>
      </div>
    </>
  )
}
