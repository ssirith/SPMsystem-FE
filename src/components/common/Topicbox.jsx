import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
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

export default function Topicbox(props) {
  const classes = useStyles()
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <CardHeader title={props.title} />

          <div className="container">
            <div className="row">
              <div className="col-6">
                <p>{`IT60-${props.id} : ${props.detail}`}</p>
              </div>
            </div>
          </div>
          <br />
        </CardContent>
      </Card>
    </>
  )
}