import React, { useState, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { CardHeader } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    position: "relative",
    minWidth: 275,
  },
})
export default function MyteamAdvisor(props) {
  const classes = useStyles()
  return (
    <>
      <Card className={classes.root}>
        <CardHeader title={props.title} />
        <CardContent>
          <div className="container">
            {props.advisors &&
              props.advisors.map((adv, index) => {
                return (
                  <>
                    <div className="row"key={index} >
                      <div className="col-6" >{adv.teacher_name}</div>
                    </div>
                  </>
                )
              })}
          </div>
          <br />
        </CardContent>
      </Card>
    </>
  )
}
