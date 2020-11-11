import React from "react"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>({
  margin: {
    margin: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap'
  }
}))
function Inputtext(props) {
  const classes = useStyles()
  return (
        <>
            <TextField className={classes.margin} id={props.id} label={props.label} defaultValue={props.defaultValue} color={props.color} 
            variant="outlined" placeholder={props.placeholder} onChange={props.onChange} required={props.required}/>
        </>
  )
}
export default Inputtext
