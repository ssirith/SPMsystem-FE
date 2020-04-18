import React, { useState } from "react"
import { Avatar, ListItemIcon } from "@material-ui/core"
import {
  Group,
  Business,
  Assignment,
  DateRange,
  Speaker,
} from "@material-ui/icons"
import { Link } from "@reach/router"
export default function Sidebar() {
  const [role,setRole] = useState("student") //Mock data
  return (
    <>
      {role == "student"&&(
        <nav class="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
        <div class="sidebar-sticky">
          <div className="container">
            <div className="row">
              <div className="mx-auto mt-5 mb-2">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </div>
            </div>
            <div className="row">
              <div className="mx-auto">
                <p>Remy Sharp</p>
              </div>
            </div>
          </div>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <Link to="/">
                <a class="nav-link">
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  My Project
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/AllProjects">
                <a class="nav-link">
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  All Projects
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Assignment">
                <a class="nav-link">
                  <ListItemIcon>
                    <Assignment />
                  </ListItemIcon>
                  Assignments
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Appointments">
                <a class="nav-link">
                  <ListItemIcon>
                    <DateRange />
                  </ListItemIcon>
                  Appointments
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Annoucement">
                <a class="nav-link">
                  <ListItemIcon>
                    <Speaker />
                  </ListItemIcon>
                  Annoucement
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      )}
      
      {role == "teacher"&&(
        <nav class="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
        <div class="sidebar-sticky">
          <div className="container">
            <div className="row">
              <div className="mx-auto mt-5 mb-2">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </div>
            </div>
            <div className="row">
              <div className="mx-auto">
                <p>Remy Sharp</p>
              </div>
            </div>
          </div>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <Link to="/">
                <a class="nav-link">
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  My Project
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/AllProjects">
                <a class="nav-link">
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  All Projects
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Assignment">
                <a class="nav-link">
                  <ListItemIcon>
                    <Assignment />
                  </ListItemIcon>
                  Assignments
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Appointments">
                <a class="nav-link">
                  <ListItemIcon>
                    <DateRange />
                  </ListItemIcon>
                  Appointments
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Annoucement">
                <a class="nav-link">
                  <ListItemIcon>
                    <Speaker />
                  </ListItemIcon>
                  Annoucement
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      )}
      {role == "aa"&&(
        <nav class="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
        <div class="sidebar-sticky">
          <div className="container">
            <div className="row">
              <div className="mx-auto mt-5 mb-2">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </div>
            </div>
            <div className="row">
              <div className="mx-auto">
                <p>Remy Sharp</p>
              </div>
            </div>
          </div>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <Link to="/">
                <a class="nav-link">
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  All Projects
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Assignment">
                <a class="nav-link">
                  <ListItemIcon>
                    <Assignment />
                  </ListItemIcon>
                  Assignments
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Appointments">
                <a class="nav-link">
                  <ListItemIcon>
                    <DateRange />
                  </ListItemIcon>
                  Appointments
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Annoucement">
                <a class="nav-link">
                  <ListItemIcon>
                    <Speaker />
                  </ListItemIcon>
                  Annoucement
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      )}
    </>
  )
}
