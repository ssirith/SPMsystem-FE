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
  const [role, setRole] = useState("student") //Mock data
  return (
    <>
      {role == "student" && (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
          <div className="sidebar-sticky">
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
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <Link to="/">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Group />
                    </ListItemIcon>
                    My Project
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AllProjects">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Business />
                    </ListItemIcon>
                    All Projects
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Assignment">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    Assignments
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Appointments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <DateRange />
                    </ListItemIcon>
                    Appointments
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Annoucement">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Speaker />
                    </ListItemIcon>
                    Annoucement
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}

      {role == "teacher" && (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
          <div className="sidebar-sticky">
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
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <Link to="/">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Group />
                    </ListItemIcon>
                    My Project
                  </div>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/AllProjects">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Business />
                    </ListItemIcon>
                    All Projects
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Assignment">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    Assignments
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Appointments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <DateRange />
                    </ListItemIcon>
                    Appointments
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Annoucement">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Speaker />
                    </ListItemIcon>
                    Annoucement
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
      {role === "aa" && (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
          <div className="sidebar-sticky">
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
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <Link to="/">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Business />
                    </ListItemIcon>
                    All Projects
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Assignment">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    Assignments
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Appointments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <DateRange />
                    </ListItemIcon>
                    Appointments
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Annoucement">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Speaker />
                    </ListItemIcon>
                    Annoucement
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  )
}
