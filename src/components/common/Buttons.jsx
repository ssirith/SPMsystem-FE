import React from 'react';
import Button from '@material-ui/core/Button';


function Buttons(props){
  
    return(
        <>
      <Button  variant = 'contained' color = {props.color} >
       {props.menu}
      </Button>
        </>
    )
}
export default Buttons