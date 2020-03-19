import React,{useState} from "react"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import GroupIcon from '@material-ui/icons/Group';
import BusinessIcon from '@material-ui/icons/Business';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SpeakerIcon from '@material-ui/icons/Speaker';
import Avatar from '@material-ui/core/Avatar';

function Sidebar() {
  const [menuList,setMenuList] = useState([{menu:"My Team",icon:<GroupIcon/>},
  {menu:"Teams",icon:<BusinessIcon/>},{menu:"Assignment",icon:<AssignmentIcon/>},
  {menu:"Appointments",icon:<DateRangeIcon/>},{menu:"Annoucement",icon:<SpeakerIcon/>}])
  return (
    <div>
      <CssBaseline />

      <Drawer variant="permanent" anchor="left">
        <div />
        <Divider />
        <List>
          
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  />
          <p>
          Remy Sharp
          </p>
          {menuList.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.menu} />
            </ListItem>
          ))}
        </List>
        
      </Drawer>
    </div>
  )
}

export default Sidebar
