import React, { useState } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import GroupIcon from "@material-ui/icons/Group"
import BusinessIcon from "@material-ui/icons/Business"
import AssignmentIcon from "@material-ui/icons/Assignment"
import DateRangeIcon from "@material-ui/icons/DateRange"
import SpeakerIcon from "@material-ui/icons/Speaker"
import Avatar from "@material-ui/core/Avatar"
import Container from "@material-ui/core/Container"
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}))

function Navbar() {
  const [user, setUser] = useState({
    id: 60130500114,
    name: "Suthiwat Sirithanakom",
    year: 3
  })
  const classes = useStyles()
  const [menuList, setMenuList] = useState([
    { menu: "My Team", icon: <GroupIcon /> },
    { menu: "Teams", icon: <BusinessIcon /> },
    { menu: "Assignment", icon: <AssignmentIcon /> },
    { menu: "Appointments", icon: <DateRangeIcon /> },
    { menu: "Annoucement", icon: <SpeakerIcon /> }
  ])
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            style={{ textAlign: "right", flex: 1 }}
          >
            {user.id}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="permanent">
        <div className={classes.toolbar} style={{marginTop : 41}}>
          <List>
            <Divider />
            <ListItem alignItems="center">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItem>
            <ListItem alignItems="center">
              <p>Remy Sharp</p>
            </ListItem>
          </List>
          <Divider />
          <List>
            {menuList.map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.menu} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  )
}

export default Navbar
