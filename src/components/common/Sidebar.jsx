import React, { useState } from "react"
import { Avatar, ListItemIcon } from "@material-ui/core"
import {
  Group,
  Business,
  Assignment,
  DateRange,
  Speaker
} from "@material-ui/icons"

export default function Sidebar() {
  const [menuList, setMenuList] = useState([
    { menu: "My Team", icon: <Group /> },
    { menu: "Teams", icon: <Business /> },
    { menu: "Assignment", icon: <Assignment /> },
    { menu: "Appointments", icon: <DateRange /> },
    { menu: "Annoucement", icon: <Speaker /> }
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
              <a class="nav-link" href="/dasd">
                <ListItemIcon>{text.icon}</ListItemIcon>
                {text.menu}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
