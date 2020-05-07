import React, { useState, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Buttons from "./Buttons"
import { CardHeader } from "@material-ui/core"
import axios from "axios"
import { useEffect } from "react"

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
export default function Advisorbox(props) {
  const classes = useStyles()

  console.log(props.advisors)
  return (
    <>
      <Card className={classes.root}>
        <CardHeader title={props.title} />
        <CardContent>
          <div className="container">
            {props.advisors &&
              props.advisors.map((ads, index) => {
                return (
                  <>
                    <p key={index}>{ads.teacher_name}</p>
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
