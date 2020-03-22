import React from 'react';
import Button from '@material-ui/core/Button';


function Buttons(props){
  
    return(
        <>
      <Button variant = 'contained' color = {props.color} onClick = {props.onClick} >
       {props.menu}
      </Button>
        </>
    )
}
export default Buttons