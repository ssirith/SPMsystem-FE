import React, { useState } from "react"
import { Link } from "@reach/router"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardActions, CardHeader, CardContent } from "@material-ui/core"
import Button from "@material-ui/core/Button"


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
})
function Carditem(props) {
  const classes = useStyles()
  return (
    <>
      <div>
        <Card className={classes.root}>
          <CardHeader title={`${props.groups.department}60-${props.groups.project_id.substring(2)}`} />
          <CardContent>
            <div className="text-center">
                {props.groups.project_name}
                {props.groups.teachers &&
                  props.groups.teachers.map((a, index) => {
                    return <p key={index}>Advisor: {a.teacher_name}</p>
                  })}
              
            </div>
          </CardContent>
          <CardActions>
            <Link to={`/projects/${props.groups.project_id}`}>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </>
  )
}
export default Carditem
