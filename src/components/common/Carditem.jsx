import React, { useState } from "react"
import {Link} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
})
function Carditem(props) {
  const classes = useStyles()
  console.log(props.groups)
 
  return (
    <>
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                 {props.groups.project_id} : {props.groups.project_name}
            </Typography>
            
            <Typography variant="body2" color="textSecondary" component="p">
            
                 {props.groups.teachers && (props.groups.teachers.map((a,index) =>{
                   return(
                     <p key={index}>                    
                       Advisor: {a.teacher_name}                                          
                     </p>
                   )
                 }))}
                      
            </Typography>
          </CardContent>

          <CardActions>
            <Link to = {`/projects/${props.groups.project_id}`} >
            <Button size="small" color="primary" >
            Learn More
            </Button></Link>
          </CardActions>
        </Card>
      </div>
    </>
  )
}
export default Carditem
