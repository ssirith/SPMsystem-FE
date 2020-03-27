import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Buttons from "./Buttons"
import { CardHeader } from "@material-ui/core"

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

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <CardHeader title={props.title}/>
          <div className="container">
            {props.members.map((data, index) => {
              return (
                <div className="row">
                  <div className="col-6">{data.name}</div>
                  <div className="col-6">{data.id}</div>
                </div>
              )
            })}
          </div>
          <br />
        </CardContent>
      </Card>
    </>
  )
}
