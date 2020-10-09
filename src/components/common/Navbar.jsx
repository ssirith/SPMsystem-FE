import React, { useState, useContext, useEffect, useCallback } from "react"
import NotificationsIcon from "@material-ui/icons/Notifications"
import { Link } from "@reach/router"
import { UserContext } from "../../UserContext"
import Dropdown from "react-bootstrap/Dropdown"
import { DropdownButton } from "react-bootstrap"
import Badge from "@material-ui/core/Badge"
import { DropdownItem } from "react-bootstrap"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import ModalWindowProfileStudent from "./ModalWindowProfileStudent"
import ModalWindowProfileTeacher from "./ModalWindowProfileTeacher"
import axios from "axios"
import DropdownNotiStudent from "./DropdownNotiStudent"
import DropdownNotiTeacher from "./DropdownNotiTeacher"
import DropdownNotiAA from "./DropdownNotiAA"
export default function Navbars() {
  const { user, setUser } = useContext(UserContext)
  const [isOpenWindow, setIsOpenWindow] = useState(false)
  const [isOpenNotiStd, setIsOpenNotiStd] = useState(false)
  const [notiStudent, setNotiStudent] = useState({})
  const [notiTeacher, setNotiTeacher] = useState({})
  const [notiAA, setNotiAA] = useState({})
  const [isPrefetch, setIsPreFetch] = useState(false)

  const fetchData = useCallback(async () => {
    setIsPreFetch(true)
    if(user.role==="student"){
      const response = await axios.get(`${process.env.REACT_APP_API_BE}/notification/student/${user.id}`)
      setNotiStudent(response.data)
    }else if(user.role==="teacher"){
      const responseTeacher = await axios.get(`${process.env.REACT_APP_API_BE}/notification/teacher/${user.id}`)
    setNotiTeacher(responseTeacher.data)
    }else{
      const responseAA = await axios.get(`${process.env.REACT_APP_API_BE}/notification/aa/${user.id}`)
      setNotiAA(responseAA.data)
    }
   
    setIsPreFetch(false)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])
  

  async function readNotification(notiStudent) {
    let tempNotiStudent = notiStudent.notification
    let readNotification = []
    let filterReadnotification = []
    setIsOpenNotiStd(!isOpenNotiStd)
    tempNotiStudent.filter((unread) => unread.notification_id_fk === null)
    tempNotiStudent.map((t, index) => readNotification.push(t.notification_id))
    console.log("read noti", readNotification)
    filterReadnotification = filterReadNotification(
      readNotification,
      tempNotiStudent
    )
    console.log("filter read", filterReadnotification)
    const alreadyReadNotification = {
      notification_id: filterReadnotification,
      student_id: user.id,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/notification/student`,
        alreadyReadNotification
      )
      if (response.status === 200) {
        console.log(response)
        readNotification = []
        console.log("clear read noti", readNotification)
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
    console.log("read noti", readNotification)
    filterReadnotification = filterReadNotification(
      readNotification,
      tempNotiTeacher
    )
    console.log("filter read", filterReadnotification)
    const alreadyReadNotification = {
      notification_id: filterReadnotification,
      teacher_id: user.id,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/notification/teacher`,
        alreadyReadNotification
      )
      if (response.status === 200) {
        console.log(response)
        readNotification = []
        console.log("clear read noti", readNotification)
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function readNotificationAA(notiAA) {
    let tempNotiAA= notiAA.notification
    let readNotification = []
    let filterReadnotification = []
    setIsOpenNotiStd(!isOpenNotiStd)
    tempNotiAA.filter((unread) => unread.notification_id_fk === null)
    tempNotiAA.map((t, index) => readNotification.push(t.notification_id))
    console.log("read noti", readNotification)
    filterReadnotification = filterReadNotification(
      readNotification,
      tempNotiAA
    )
    console.log("filter read", filterReadnotification)
    const alreadyReadNotification = {
      notification_id: filterReadnotification,
      aa_id: user.id,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/notification/aa`,
        alreadyReadNotification
      )
      if (response.status === 200) {
        console.log(response)
        readNotification = []
        console.log("clear read noti", readNotification)
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


  if (isPrefetch) {
    return <></>
  }
  return (
    <>
      {/* {console.log("noti std", notiStudent)} */}
      {user.role == "student" && (
        <Navbar className="navbar navbar-dark sticky-top bg flex-md-nowrap p-0 ">
          <Link to="/">
            <p className="navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3">
              SPM System
            </p>
          </Link>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap mr-4">
                <Badge
                  badgeContent={notiStudent.num_of_unread_notification}
                  invisible={
                    notiStudent.num_of_unread_notification != 0 ? false : true
                  }
                  color="secondary"
                >
                  <NotificationsIcon
                    onClick={() => readNotification(notiStudent)}
                    style={{ cursor: "pointer" }}
                  />
                </Badge>
                <Dropdown
                  className="mr-12"
                  show={isOpenNotiStd}
                  menuAlign={{ lg: "left" }}
                >
                  <div
                    className="position-absolute bg-light rounded"
                    style={{
                      zIndex: 99,
                      right: 0,
                      display: isOpenNotiStd ? "" : "none",
                      width: '400px'
                    }}
                  >
                    {notiStudent.notification &&
                      notiStudent.notification.map((notification, index) => (
                        <DropdownNotiStudent
                          key={index}
                          notification={notification}
                          isOpenNotiStd={isOpenNotiStd}
                        />
                      ))}
                  </div>
                </Dropdown>
              </li>
              <NavDropdown title={user.name} id="collasible-nav-dropdown">
                <DropdownItem onClick={() => setIsOpenWindow(true)}>
                  Edit Profile
                </DropdownItem>
                <ModalWindowProfileStudent
                  isOpen={isOpenWindow}
                  setIsOpen={setIsOpenWindow}
                />
                <DropdownItem>Logout</DropdownItem>
              </NavDropdown>
            </ul>
          </Nav>
        </Navbar>
      )}
      {user.role == "teacher" && (
        <Navbar className="navbar navbar-dark sticky-top bg flex-md-nowrap p-0 ">
          <Link to="/">
            <p className="navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3">
              SPM System
            </p>
          </Link>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap mr-4">
                <Badge
                  badgeContent={notiTeacher.num_of_unread_notification}
                  invisible={
                    notiTeacher.num_of_unread_notification != 0 ? false : true
                  }
                  color="secondary"
                >
                  <NotificationsIcon
                    onClick={() => readNotificationTeacher(notiTeacher)}
                    style={{ cursor: "pointer" }}
                  />
                </Badge>
                <Dropdown
                  className="mr-12"
                  show={isOpenNotiStd}
                  menuAlign={{ lg: "left" }}
                >
                  <div
                    className="position-absolute bg-light rounded"
                    style={{
                      zIndex: 99,
                      right: 0,
                      display: isOpenNotiStd ? "" : "none",
                      width: '400px'
                    }}
                  >
                    {notiTeacher.notification &&
                      notiTeacher.notification.map((notification, index) => (
                        <DropdownNotiTeacher
                          key={index}
                          notification={notification}
                          isOpenNotiStd={isOpenNotiStd}
                        />
                      ))}
                  </div>
                </Dropdown>
              </li>
              <NavDropdown title={user.name} id="collasible-nav-dropdown">
                <DropdownItem onClick={() => setIsOpenWindow(true)}>
                  Edit Profile
                </DropdownItem>
                <ModalWindowProfileTeacher
                  isOpen={isOpenWindow}
                  setIsOpen={setIsOpenWindow}
                />
                <DropdownItem>Logout</DropdownItem>
              </NavDropdown>
            </ul>
          </Nav>
        </Navbar>
      )}
      {user.role == "aa" && (
        <Navbar className="navbar navbar-dark sticky-top bg flex-md-nowrap p-0 ">
          <Link to="/">
            <p className="navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3">
              SPM System
            </p>
          </Link>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <ul className="navbar-nav px-3">
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
                    style={{ cursor: "pointer" }}
                  />
                </Badge>
                <Dropdown
                  className="mr-12"
                  show={isOpenNotiStd}
                  menuAlign={{ lg: "left" }}
                >
                  <div
                    className="position-absolute bg-light rounded"
                    style={{
                      zIndex: 99,
                      right: 0,
                      display: isOpenNotiStd ? "" : "none",
                      width: '400px'
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
              <NavDropdown title={user.name} id="collasible-nav-dropdown">
                <DropdownItem onClick={() => setIsOpenWindow(true)}>
                  Edit Profile
                </DropdownItem>
                <ModalWindowProfileTeacher
                  isOpen={isOpenWindow}
                  setIsOpen={setIsOpenWindow}
                />
                <DropdownItem>Logout</DropdownItem>
              </NavDropdown>
            </ul>
          </Nav>
        </Navbar>
      )}
    </>
  )
}
