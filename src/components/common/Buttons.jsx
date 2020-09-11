import React from 'react';
import Button from '@material-ui/core/Button';


function Buttons(props){
  
    return(
        <>
      <Button className={props.className} variant = 'contained' color = {props.color} onClick={props.onClick} fullWidth={props.fullWidth} >
       {props.menu}
      </Button>
        </>
    )
}
export default Buttons