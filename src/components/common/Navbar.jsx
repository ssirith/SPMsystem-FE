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
export default function Navbars() {
  const { user, setUser } = useContext(UserContext)
  const [isOpenWindow, setIsOpenWindow] = useState(false)
  const [isOpenNotiStd, setIsOpenNotiStd] = useState(false)
  const [notiStudent, setNotiStudent] = useState({})

  async function readNotification(notiStudent) {
    let tempNotiStudent = notiStudent.notification
    let readNotification = []
    let filterReadnotification = []
    setIsOpenNotiStd(!isOpenNotiStd)
    tempNotiStudent.filter((unread) => unread.notification_id_fk === null)
    tempNotiStudent.map((t, index) => readNotification.push(t.notification_id))
    // console.log("read noti", readNotification)
    filterReadnotification = filterReadNotification(readNotification)
    // console.log("filter read", filterReadnotification)
    const alreadyReadNotification = {
      notification_id: filterReadnotification,
      student_id: user.id,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/notification`,
        alreadyReadNotification
      )
      if (response.status === 200) {
        console.log("Already read")
        readNotification = []
        console.log("clear read noti", readNotification)
      }
    } catch (err) {
      console.log(err)
    }
  }
  function filterReadNotification(data) {
     let filter =data.filter((value, index) => data.indexOf(value) === index)
     return filter
  }
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BE}/notification/${user.id}`
      )
      setNotiStudent(response.data)
    } catch (err) {
      console.log(err)
    }
  })

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      {console.log("noti std", notiStudent)}
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
                <Dropdown show={isOpenNotiStd} menuAlign={{ lg: "left" }}>
                  <Dropdown.Menu>
                    {notiStudent.notification &&
                      notiStudent.notification.map((notification, index) => (
                        <DropdownNotiStudent
                          key={index}
                          notification={notification}
                          isOpenNotiStd={isOpenNotiStd}
                        />
                      ))}
                  </Dropdown.Menu>
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
              <li className="nav-item text-nowrap">
                <NotificationsIcon />
              </li>
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
              <li className="nav-item text-nowrap">
                <NotificationsIcon />
              </li>
            </ul>
          </Nav>
        </Navbar>
      )}
    </>
  )
}
