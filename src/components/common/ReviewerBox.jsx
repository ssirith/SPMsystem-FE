import React, { useState, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card } from "react-bootstrap"
import CardContent from "@material-ui/core/CardContent"
import Buttons from "./Buttons"
import { CardHeader } from "@material-ui/core"
export default function ReviewerBox(props) {

    return (
      <>
        <Card>    
            <Card.Body>   
            <div className="container">
              <ul>
              {props.reviewers &&
                props.reviewers.map((ads, index) => {
                  return (
                    <>
                      <li key={index}>{ads.teacher_name}</li>
                    </>
                  )
                })}
                </ul>
            </div>
            <br />
            </Card.Body>      
        </Card>
      </>
    )
  }
  