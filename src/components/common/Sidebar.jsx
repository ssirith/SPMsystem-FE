import React, { useState, useContext } from "react"
import { UserContext } from "../../UserContext"
import { Avatar, ListItemIcon } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
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
        <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100 p-0">
          <div className="sidebar-sticky">
            <div className="container">
              <div className="row">
                <div className="mx-auto mt-5 mb-2">
                  <Avatar alt={user.name} src={`http://127.0.0.1:8000/storage/images/${user.id}.jpg`} />
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
                    <ListItemIcon className='ml-3' >
                      <Group />
                      <p className="mb-0 ml-4 text">My Project</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 2 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/allprojects">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Business className='ml-3' />
                      <p className="mb-0 ml-4 text">All Projects</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 3 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/assignments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Assignment className='ml-3' />
                      <p className="mb-0 ml-4 text">Assignments</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 4 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/appointments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <DateRange className='ml-3' />
                      <p className="mb-0 ml-4 text">Appointments</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 5 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/annoucements">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Speaker className='ml-3' />
                      <p className="mb-0 ml-4 text">Annoucement</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}

      {user.role == "teacher" && (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100 p-0">
          <div className="sidebar-sticky">
            <div className="container">
              <div className="row">
                <div className="mx-auto mt-5 mb-2">
                  <Avatar alt={user.name}  src={`http://127.0.0.1:8000/storage/images/${user.id}.jpg`} />
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
                      <Group className='ml-3' />
                      <p className="mb-0 ml-4 text">My Project</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                class={`nav-item ${
                  props.statusbar === 2 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/allprojects">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Business className='ml-3' />
                      <p className="mb-0 ml-4 text">All Projects</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 3 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/assignments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Assignment className='ml-3' />
                      <p className="mb-0 ml-4 text">Assignments</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 4 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/appointments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <DateRange className='ml-3' />
                      <p className="mb-0 ml-4 text">Appointments</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 5 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/annoucements">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Speaker className='ml-3' />
                      <p className="mb-0 ml-4 text">Annoucement</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              
            </ul>
          </div>
        </nav>
      )}
      {user.role === "aa" && (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100 p-0">
          <div className="sidebar-sticky">
            <div className="container">
              <div className="row">
                <div className="mx-auto mt-5 mb-2">
                  <Avatar alt={user.name}  src={`http://127.0.0.1:8000/storage/images/${user.id}.jpg`} />
                </div>
              </div>
              <div className="row">
                <div className="mx-auto text-center">
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
                      <Business className='ml-3' />
                      <p className="mb-0 ml-4 text">All Projects</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 3 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/assignments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Assignment className='ml-3' />
                      <p className="mb-0 ml-4 text">Assignments</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 4 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/appointments">
                  <div className="nav-link">
                    <ListItemIcon>
                      <DateRange className='ml-3' />
                      <p className="mb-0 ml-4 text">Appointments</p>
                    </ListItemIcon>
                  </div>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  props.statusbar === 5 ? "bg-white" : "bg-light"
                  } rounded`}
              >
                <Link to="/annoucements">
                  <div className="nav-link">
                    <ListItemIcon>
                      <Speaker className='ml-3' />
                      <p className="mb-0 ml-4 text">Annoucement</p>
                    </ListItemIcon>
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
                      <SettingsIcon className='ml-3' />
                      <p className="mb-0 ml-4 text">Setting</p>
                    </ListItemIcon>
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
