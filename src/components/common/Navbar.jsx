import React,{useState} from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


function Navbar() {
    const [user,setUser] = useState({id : 60130500114,name : 'Suthiwat Sirithanakom',year : 3})
  return (
    <div>
      <AppBar >
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" style={{textAlign : 'right',flex : 1}}>
            
            {user.id}
            
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
