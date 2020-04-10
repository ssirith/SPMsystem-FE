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
export default function Membersbox(props) {
  const classes = useStyles()
  
  console.log(props.members)
  
  // function handleDelete(){
  //   setDisplay(props.display.index)
  //   const temp = props.display.index;

  // }
  
    
    const handleDelte = value =>{
      // const result = props.members;
      // const index = result.indexOf(value);
      // if (index > -1) {
      //   result.splice(index, 1);
      // }
      // console.log(result);
      props.deletemember(value) ;

    }
  function checkStudents() {
    if (props.members) {
      if ((props.members.length >= 3)) { // member(submited) = 0 or >3 || ซ้ำกับ submited  **(props.members.length >= 3) ||
        return "The membership limit has been reached !!!!"
      }
      else { // member 0 1 2 3
        return "Can add more members"
      }
    }
    else {
      return "Can add more members"
    }
  }
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <CardHeader title={props.title} />
          <div className="container" >
            {props.members && props.members.map((data, index) => {
              return (
                  <div className="row" key={index}>
                  <div className="col-4">{data.student_id}</div>
                  <div className="col-4">{data.student_name}</div>
                  <div className="col-4"><button className="btn btn-danger"  onClick={()=>handleDelte(data)}>delete</button></div>
                </div>
              )
            })}
          </div>
          {checkStudents()}
          <br />
        </CardContent>
      </Card>
    </>
  )
}
