import React from "react"
import TextField from '@material-ui/core/TextField';

function Inputtext(props) {
  return (
        <>
            <TextField id={props.id} label={props.label} defaultValue={props.defaultValue} color={props.color}/>
        </>
  )
}
export default Inputtext
