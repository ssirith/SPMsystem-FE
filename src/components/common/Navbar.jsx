import React, { useState,useContext } from "react"
import {Link} from '@reach/router'
import { UserContext } from "../../UserContext"
export default function Navbar() {
  const {user, setUser} = useContext(UserContext)
  
  return (
    <nav className="navbar navbar-dark sticky-top bg flex-md-nowrap p-0">
      <Link to = '/'>
      <p className="navbar-brand col-sm-3 col-md-2 mr-0">
        Logo
      </p> 
      </Link>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          
          <a className="nav-link" href="/#">
            {user.name}
          </a>
          
        </li>
      </ul>
    </nav>
  )
}
