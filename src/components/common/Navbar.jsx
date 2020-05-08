import React, { useState, useContext } from "react"
import { Link } from '@reach/router'
import { UserContext } from "../../UserContext"
import { DropdownButton } from "react-bootstrap"
import {DropdownItem} from "react-bootstrap"
import ModalWindowProfile from "./ModalWindowProfile"
export default function Navbar() {
  const { user, setUser } = useContext(UserContext)
  const [isOpenWindow, setIsOpenWindow] = useState(false)
  return (
    <nav className="navbar navbar-dark sticky-top bg flex-md-nowrap p-0 ">
      <Link to='/'>
        <p className="navbar-brand col-sm-3 col-md-2 p-0 ml-3 mt-3">
          SPM System
      </p>
      </Link>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
        
          <a className="nav-link" href="/#">
            <DropdownButton id="dropdown-basic-button" title={user.name}>
              <DropdownItem href="#/action-1" onClick={() => setIsOpenWindow(true)}>Edit Profile</DropdownItem>
              <ModalWindowProfile
               isOpen={isOpenWindow}
               setIsOpen={setIsOpenWindow}
               />
              <DropdownItem href="#/action-2">Logout</DropdownItem>
            </DropdownButton>

          </a>

        </li>
      </ul>
    </nav>
  )
}
