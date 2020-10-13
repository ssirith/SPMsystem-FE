import React, { useState, useCallback, useContext } from "react"
import Cookie from "js-cookie"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Buttons from "./Buttons"
import { CardHeader } from "@material-ui/core"
import { useEffect } from "react"
import { UserContext } from "../../UserContext"
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
export default function Membersbox(props) {
  const { user, setUser } = useContext(UserContext)
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const classes = useStyles()
  return (
    <>
      <Card className={classes.root}>
        <CardHeader title={props.title} />
        <CardContent>
          <div className="container">
            <p>{user.user_id} {user.name}</p>
            
            {props.members &&
              props.members.map((std, index) => {
                return (
                  <>
                    <p key={index}>
                      {std.student_id} {std.student_name}
                    </p>
                  </>
                )
              })}
          </div>
         
        </CardContent>
      </Card>
    </>
  )
}
