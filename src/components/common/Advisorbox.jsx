import React, { useState, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Buttons from "./Buttons"
import { CardHeader } from "@material-ui/core"
import axios from 'axios'
import { useEffect } from "react"

const useStyles = makeStyles({
  root: {
    position: "relative",
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})
export default function Advisorbox(props) {
  const classes = useStyles()

  console.log(props.advisors)
  const handleDelte = value =>{
     
      props.deleteadvisor(value) 

    }

  function checkAdvisors() {
    if (props.advisors) {
      if ((props.advisors.length >= 2)) { // member(submited) = 0 or >3 || ซ้ำกับ submited  **(props.members.length >= 3) ||
        return "The advisors limit has been reached !!!!"
      }
      else { // member 0 1 2 
        return "Can add more advisors"
      }
    }
    else {
      return "Can add more advisors"
    }
  }
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <CardHeader title={props.title}/>
          <div className="container">
            {props.advisors && props.advisors.map((data, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-6">{data.teacher_name}</div>
                  <button className="btn btn-danger"  onClick={()=>handleDelte(data)}>delete</button>
                </div>
              )
            })}
          </div>
          {checkAdvisors()}
          <br />
        </CardContent>
      </Card>
    </>
  )
}
