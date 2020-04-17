import React, { useState } from "react"
import {Link} from 'react-router-dom'
export default function Navbar() {
  const [user, setUser] = useState({
    id: 60130500114,
    name: "Suthiwat Sirithanakom",
    year: 3
  })
  
  return (
    <nav class="navbar navbar-dark sticky-top bg flex-md-nowrap p-0">
      <Link to = '/'>
      <a class="navbar-brand col-sm-3 col-md-2 mr-0">
        Logo
      </a> 
      </Link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          
          <a class="nav-link" href="/#">
            {user.id}
          </a>
          
        </li>
      </ul>
    </nav>
  )
}
