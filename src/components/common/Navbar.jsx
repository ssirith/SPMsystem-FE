import React, { useState, useContext, useEffect, useCallback } from "react"
import Cookie from "js-cookie"
import NotificationsIcon from "@material-ui/icons/Notifications"
import { Link, navigate } from "@reach/router"
import { UserContext } from "../../UserContext"
import Dropdown from "react-bootstrap/Dropdown"
import { DropdownButton, Table } from "react-bootstrap"
import Badge from "@material-ui/core/Badge"
import { DropdownItem } from "react-bootstrap"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
// import Navbar from 'react-bootstrap/Navbar'
import ModalWindowProfileStudent from "./ModalWindowProfileStudent"
import ModalWindowProfileTeacher from "./ModalWindowProfileTeacher"
import axios from "axios"
import DropdownNotiStudent from "./DropdownNotiStudent"
import DropdownNotiTeacher from "./DropdownNotiTeacher"
import DropdownNotiAA from "./DropdownNotiAA"
import dayjs from "dayjs"
export default function Navbars() {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  // let userBeforeParse = JSON.parse(localStorage.getItem("user"))
  // const [user, setUser] = useState(userBeforeParse)
  const { user, setUser } = useContext(UserContext)
  const [isOpenWindow, setIsOpenWindow] = useState(false)
  const [isOpenNotiStd, setIsOpenNotiStd] = useState(false)
  const [notiStudent, setNotiStudent] = useState([])
  const [notiTeacher, setNotiTeacher] = useState([])
  const [notiAA, setNotiAA] = useState([])

  const fetchData = useCallback(async () => {
    try {
      if (user && user.user_type === "Student") {
        // console.log("fetch function")
        const response = await axios.get(
          `${process.env.REACT_APP_API_BE}/notification/student/${user.user_id}`,
          { headers }
        )
        sortNotificationStudent(response.data)
      } else if (user && user.user_type === "Teacher") {
        const responseTeacher = await axios.get(
          `${process.env.REACT_APP_API_BE}/notification/teacher/${user.user_id}`,
          { headers }
        )
        sortNotificationTeacher(responseTeacher.data)
      } else if (user && user.user_type === "AA") {
        const responseAA = await axios.get(
          `${process.env.REACT_APP_API_BE}/notification/aa/${user.user_id}`,
          { headers }
        )
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
      fetchData()
  }, [])

  function logOut() {
    localStorage.removeItem("user")
    setUser(null)
    Cookie.remove("jwt")
    navigate("/")
  }

  function sortNotificationStudent(notification) {
    notification.notification.sort(
      (a, b) =>
        (b.notification_id_fk === null) - (a.notification_id_fk === null)
    )
    notification.notification.sort((a, b) =>
      dayjs(b.created_at).isBefore(a.created_at) ? -1 : 1
    )
    setNotiStudent(notification)
  }
  function sortNotificationTeacher(notification) {
    //  console.log('in sort tttt')
    notification.notification.sort(
      (a, b) =>
        (b.notification_id_fk === null) - (a.notification_id_fk === null)
    )
    notification.notification.sort((a, b) =>
      dayjs(b.created_at).isBefore(a.created_at) ? -1 : 1
    )
    setNotiTeacher(notification)
  }
  // console.log(notiTeacher)
  function sortNotificationAA(notification) {
    notification.notification.sort(
      (a, b) =>
        (b.notification_id_fk === null) - (a.notification_id_fk === null)
    )
    notification.notification.sort((a, b) =>
      dayjs(b.created_at).isBefore(a.created_at) ? -1 : 1
    )
    setNotiAA(notification)
  }
  async function readNotification(notiStudent) {
    if (!notiStudent) {
      return
    }
    let tempNotiStudent = notiStudent.notification
    let readNotification = []
    let filterReadnotification = []
    setIsOpenNotiStd(!isOpenNotiStd)
    tempNotiStudent.filter((unread) => unread.notification_id_fk === null)
    tempNotiStudent.map((t, index) => readNotification.push(t.notification_id))
    filterReadnotification = filterReadNotification(
      readNotification,
      tempNotiStudent
    )
    // console.log("filter read", filterReadnotification)
    const alreadyReadNotification = {
      notification_id: filterReadnotification,
      student_id: user.user_id,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/notification/student`,
        alreadyReadNotification,
        { headers }
      )
      if (response.status === 200) {
        readNotification = []
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function readNotificationTeacher(notiTeacher) {
    let tempNotiTeacher = notiTeacher.notification
    let readNotification = []
    let filterReadnotification = []
    setIsOpenNotiStd(!isOpenNotiStd)
    tempNotiTeacher.filter((unread) => unread.notification_id_fk === null)
    tempNotiTeacher.map((t, index) => readNotification.push(t.notification_id))
    filterReadnotification = filterReadNotification(
      readNotification,
      tempNotiTeacher
    )
    const alreadyReadNotification = {
      notification_id: filterReadnotification,
      teacher_id: user.user_id,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/notification/teacher`,
        alreadyReadNotification,
        { headers }
      )
      if (response.status === 200) {
        readNotification = []
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function readNotificationAA(notiAA) {
    let tempNotiAA = notiAA.notification
    let readNotification = []
    let filterReadnotification = []
    setIsOpenNotiStd(!isOpenNotiStd)
    tempNotiAA.filter((unread) => unread.notification_id_fk === null)
    tempNotiAA.map((t, index) => readNotification.push(t.notification_id))
    filterReadnotification = filterReadNotification(
      readNotification,
      tempNotiAA
    )
    const alreadyReadNotification = {
      notification_id: filterReadnotification,
      aa_id: user.user_id,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/notification/aa`,
        alreadyReadNotification,
        { headers }
      )
      if (response.status === 200) {
        readNotification = []
      }
    } catch (err) {
      console.log(err)
    }
  }

  function filterReadNotification(data, notiFromBE) {
    let filter = data.filter((value, index) => data.indexOf(value) === index)
    //  notiFromBE.foreEach()
    return filter
 }
  return (
    <>
      {user && user.user_type === "Student" && (
        // <Navbar style={{ border: "red 1px solid" }}>
        <Navbar className="navbar navbar-dark sticky-top bg flex-md-nowrap p-0 ">
          <div style={{ marginLeft: 30 }}>
            <Link to="/main">
              <div className="header navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3">
                {/* <div className="header navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3"> */}
                <h2>SPM System</h2>
              </div>
            </Link>
          </div>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <div style={{ marginRight: 42 }}>
              <ul className="navbar-nav px-3">
                <div style={{ marginTop: 7 }}>
                  <li className="nav-item text-nowrap mr-4">
                    <Badge
                      badgeContent={notiStudent.num_of_unread_notification}
                      invisible={
                        notiStudent.num_of_unread_notification != 0
                          ? false
                          : true
                      }
                      color="secondary"
                    >
                      <NotificationsIcon
                        onClick={() => readNotification(notiStudent)}
                        style={{ cursor: "pointer", color: "white" }}
                      />
                    </Badge>

                    <Dropdown
                      className="mr-12"
                      show={isOpenNotiStd}
                      menuAlign={{ lg: "left" }}
                    >
                      <div
                        className="position-absolute bg-light rounded scrollable-menu"
                        style={{
                          zIndex: 99,
                          right: 0,
                          display: isOpenNotiStd ? "" : "none",
                          width: "400px",
                        }}
                      >
                        {notiStudent.notification &&
                          notiStudent.notification.map(
                            (notification, index) => (
                              <DropdownNotiStudent
                                key={index}
                                notification={notification}
                                isOpenNotiStd={isOpenNotiStd}
                              />
                            )
                          )}
                      </div>
                    </Dropdown>
                  </li>
                </div>
                <NavDropdown title={user.name} id="collasible-nav-dropdown">
                  <DropdownItem onClick={() => setIsOpenWindow(true)}>
                    Edit Profile
                  </DropdownItem>
                  <ModalWindowProfileStudent
                    isOpen={isOpenWindow}
                    setIsOpen={setIsOpenWindow}
                  />
                  <DropdownItem onClick={() => logOut()}>Logout</DropdownItem>
                </NavDropdown>
              </ul>
            </div>
          </Nav>
        </Navbar>
      )}
      {user && user.user_type === "Teacher" && (
        <Navbar className="navbar navbar-dark sticky-top bg flex-md-nowrap p-0 ">
          <div style={{ marginLeft: 30 }}>
            <Link to="/main">
              <div className="header navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3">
                {/* <div className="header navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3"> */}
                <h2>SPM System</h2>
              </div>
            </Link>
          </div>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <div style={{ marginRight: 42 }}>
              <ul className="navbar-nav px-3">
                <div style={{ marginTop: 7 }}>
                  <li className="nav-item text-nowrap mr-4">
                    <Badge
                      badgeContent={notiTeacher.num_of_unread_notification}
                      invisible={
                        notiTeacher.num_of_unread_notification != 0
                          ? false
                          : true
                      }
                      color="secondary"
                    >
                      <NotificationsIcon
                        onClick={() => readNotificationTeacher(notiTeacher)}
                        style={{ cursor: "pointer", color: "white" }}
                      />
                    </Badge>

                    <Dropdown
                      className="mr-12"
                      show={isOpenNotiStd}
                      menuAlign={{ lg: "left" }}
                    >
                      <div
                        className="position-absolute bg-light rounded scrollable-menu"
                        style={{
                          zIndex: 99,
                          right: 0,
                          display: isOpenNotiStd ? "" : "none",
                          width: "400px",
                        }}
                      >
                        {notiTeacher.notification &&
                          notiTeacher.notification.map(
                            (notification, index) => (
                              <DropdownNotiTeacher
                                key={index}
                                notification={notification}
                                isOpenNotiStd={isOpenNotiStd}
                              />
                            )
                          )}
                      </div>
                    </Dropdown>
                  </li>
                </div>
                <NavDropdown title={user.name} id="collasible-nav-dropdown">
                  <DropdownItem onClick={() => setIsOpenWindow(true)}>
                    Edit Profile
                  </DropdownItem>
                  <ModalWindowProfileTeacher
                    isOpen={isOpenWindow}
                    setIsOpen={setIsOpenWindow}
                  />
                  <DropdownItem onClick={() => logOut()}>Logout</DropdownItem>
                </NavDropdown>
              </ul>
            </div>
          </Nav>
        </Navbar>
      )}
      {user && user.user_type === "AA" && (
        <Navbar className="navbar navbar-dark sticky-top bg flex-md-nowrap p-0 ">
          <div style={{ marginLeft: 30 }}>
            <Link to="/main">
              <div className="header navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3">
                {/* <div className="header navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3"> */}
                <h2>SPM System</h2>
              </div>
            </Link>
          </div>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <div style={{ marginRight: 42 }}>
              <ul className="navbar-nav px-3">
                <div style={{ marginTop: 7 }}>
                  <li className="nav-item text-nowrap mr-4">
                    <Badge
                      badgeContent={notiAA.num_of_unread_notification}
                      invisible={
                        notiAA.num_of_unread_notification != 0 ? false : true
                      }
                      color="secondary"
                    >
                      <NotificationsIcon
                        onClick={() => readNotificationAA(notiAA)}
                        style={{ cursor: "pointer", color: "white" }}
                      />
                    </Badge>

                    <Dropdown
                      className="mr-12"
                      show={isOpenNotiStd}
                      menuAlign={{ lg: "left" }}
                    >
                      <div
                        className="position-absolute bg-light rounded scrollable-menu"
                        style={{
                          zIndex: 99,
                          right: 0,
                          display: isOpenNotiStd ? "" : "none",
                          width: "400px",
                        }}
                      >
                        {notiAA.notification &&
                          notiAA.notification.map((notification, index) => (
                            <DropdownNotiAA
                              key={index}
                              notification={notification}
                              isOpenNotiStd={isOpenNotiStd}
                            />
                          ))}
                      </div>
                    </Dropdown>
                  </li>
                </div>
                <NavDropdown title={user.name} id="collasible-nav-dropdown">
                  <DropdownItem onClick={() => setIsOpenWindow(true)}>
                    Edit Profile
                  </DropdownItem>
                  <ModalWindowProfileTeacher
                    isOpen={isOpenWindow}
                    setIsOpen={setIsOpenWindow}
                  />
                  <NavDropdown.Divider />
                  <DropdownItem onClick={() => logOut()}>Logout</DropdownItem>
                </NavDropdown>
              </ul>
            </div>
          </Nav>
        </Navbar>
      )}
    </>
  )
}
