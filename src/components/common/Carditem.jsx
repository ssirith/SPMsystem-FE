import React, { useState } from "react"
import { Link } from "@reach/router"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardActions, CardHeader, CardContent } from "@material-ui/core"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles({
  root: {
    width: '293px',
    height: '220px'
  },
})
function Carditem(props) {
  const classes = useStyles()
  return (
    <>
      <div>
        <Card className={classes.root}>
          <CardHeader
            title={`${
              props.groups.project_department
            }60-${props.groups.project_id.substring(2)}`}
          />
          <CardContent className='pb-0'>
            <div className="text-center">
              <p className='m-0'>{props.groups.project_name}</p>
              <p>{props.groups.project_detail}</p>
              {props.groups.teachers &&
                props.groups.teachers.map((a, index) => {
                  return (
                    <p className="my-0" key={index}>
                      Advisor: {a.teacher_name}
                    </p>
                  )
                })}
            </div>
          </CardContent>
          <CardActions className='d-flex justify-content-end mt-2'>
              <Link to={`/projects/${props.groups.project_id}`}>
                <Button size="small" color="primary">
                  More
                </Button>
              </Link>
            
          </CardActions>
        </Card>
      </div>
    </>
  )
}
export default Carditem
