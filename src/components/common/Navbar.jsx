import React, { useState, useContext } from "react"
import NotificationsIcon from "@material-ui/icons/Notifications"
import { Link } from "@reach/router"
import { UserContext } from "../../UserContext"
import { DropdownButton } from "react-bootstrap"
import { DropdownItem } from "react-bootstrap"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import ModalWindowProfileStudent from "./ModalWindowProfileStudent"
import ModalWindowProfileTeacher from "./ModalWindowProfileTeacher"
export default function Navbars() {
  const { user, setUser } = useContext(UserContext)
  const [isOpenWindow, setIsOpenWindow] = useState(false)
  return (
    <>
      {user.role == "student" && (
        <Navbar className="navbar navbar-dark sticky-top bg flex-md-nowrap p-0 ">
          <Link to="/">
            <p className="navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3">
              SPM System
         </p>
          </Link>
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
                <NotificationsIcon />
              </li>
              <NavDropdown title={user.name} id="collasible-nav-dropdown">
                <DropdownItem onClick={() => setIsOpenWindow(true)}>
                  Edit Profile
               </DropdownItem>
                <ModalWindowProfileStudent
                  isOpen={isOpenWindow}
                  setIsOpen={setIsOpenWindow}
                />
                <DropdownItem >Logout</DropdownItem>
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
          <Nav className="mr-auto">
          </Nav>
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
                <DropdownItem >Logout</DropdownItem>
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
          <Nav className="mr-auto">
          </Nav>
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
                <DropdownItem >Logout</DropdownItem>
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
