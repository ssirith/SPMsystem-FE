import React, { useState } from "react"
import { Avatar, ListItemIcon } from "@material-ui/core"
import {
  Group,
  Business,
  Assignment,
  DateRange,
  Speaker
} from "@material-ui/icons"
import {Link} from 'react-router-dom'
export default function Sidebar() {
  const [menuList, setMenuList] = useState([
    { menu: "My Team", icon: <Group />,path:"Myteam"},
    { menu: "Teams", icon: <Business />,path:"Teams" },
    { menu: "Assignment", icon: <Assignment />,path:"Assignment" },
    { menu: "Appointments", icon: <DateRange />,path:"Appointments" },
    { menu: "Annoucement", icon: <Speaker />,path:"Annoucement" }
  ])
  return (
    <nav class="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
      <div class="sidebar-sticky">
        <div>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <p>Remy Sharp</p>
        </div>
        <ul class="nav flex-column mb-2">
          {menuList.map((text, index) => (
            <li class="nav-item">
              <Link to ={ `/${text.path}`} >
              <a class="nav-link" >
                <ListItemIcon>{text.icon}</ListItemIcon>
                {text.menu}
              </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
