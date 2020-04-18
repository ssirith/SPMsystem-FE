import React, { useState } from "react"
import {Link} from '@reach/router'
export default function Navbar() {
  const [user, setUser] = useState({
    id: 60130500114,
    name: "Suthiwat Sirithanakom",
    year: 3
  })
  
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
            {user.id}
          </a>
          
        </li>
      </ul>
    </nav>
  )
}
