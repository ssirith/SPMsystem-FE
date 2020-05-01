import React, { useState, useContext } from "react"
import { UserContext } from "../../UserContext"
import { Avatar, ListItemIcon } from "@material-ui/core"
import SettingsIcon from '@material-ui/icons/Settings';
import {
  Group,
  Business,
  Assignment,
  DateRange,
  Speaker,
} from "@material-ui/icons"
import { Link } from "@reach/router"
export default function Sidebar(props) {
  const { user, setUser } = useContext(UserContext) //mock data from UserContext
  return (
    <>
      {user.role == "student" && (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
          <div className="sidebar-sticky">
            <div className="container">
              <div className="row">
                <div className="mx-auto mt-5 mb-2">
                  <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
                </div>
              </div>
              <div className="row text-center">
                <div className="mx-auto">
                  <p>{user.name}</p>
                  <p>{user.role}</p>
                </div>
              </div>
            </div>
            <ul className="nav flex-column mb-2">
              <li
                className={`nav-item ${
                  props.statusbar === 1 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Group />
                    </ListItemIcon>
                    My Project
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 2 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/AllProjects">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Business />
                    </ListItemIcon>
                    All Projects
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 3 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Assignments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    Assignments
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 4 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Appointments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <DateRange />
                    </ListItemIcon>
                    Appointments
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 5 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Annoucements">
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

      {user.role == "teacher" && (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
          <div className="sidebar-sticky">
            <div className="container">
              <div className="row">
                <div className="mx-auto mt-5 mb-2">
                  <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
                </div>
              </div>
              <div className="row">
                <div className="mx-auto">
                  <p>{user.name}</p>
                  <p>{user.role}</p>
                </div>
              </div>
            </div>
            <ul className="nav flex-column mb-2">
              <li
                className={`nav-item ${
                  props.statusbar === 1 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Group />
                    </ListItemIcon>
                    My Project
                  </div>
                </Link>
              </li>
              <li
                class={`nav-item ${
                  props.statusbar === 2 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/AllProjects">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Business />
                    </ListItemIcon>
                    All Projects
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 3 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Assignments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    Assignments
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 4 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Appointments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <DateRange />
                    </ListItemIcon>
                    Appointments
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 5 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Annoucements">
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
      {user.role === "aa" && (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
          <div className="sidebar-sticky">
            <div className="container">
              <div className="row">
                <div className="mx-auto mt-5 mb-2">
                  <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
                </div>
              </div>
              <div className="row">
                <div className="mx-auto">
                  <p>{user.name}</p>
                  <p>{user.role}</p>
                </div>
              </div>
            </div>
            <ul className="nav flex-column mb-2">
              <li
                className={`nav-item ${
                  props.statusbar === 1 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Business />
                    </ListItemIcon>
                    All Projects
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 3 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Assignments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    Assignments
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 4 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Appointments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <DateRange />
                    </ListItemIcon>
                    Appointments
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 5 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Annoucements">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Speaker />
                    </ListItemIcon>
                    Annoucement
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 6 ? "bg-white" : "bg-light"
                } rounded`}
              >
                <Link to="/Setting">
                  <div className="nav-link">
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    Setting
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
