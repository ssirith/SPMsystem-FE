import React, { useState } from "react"

export default function Navbar() {
  const [user, setUser] = useState({
    id: 60130500114,
    name: "Suthiwat Sirithanakom",
    year: 3
  })
  
  return (
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/#">
        Logo 
      </a>
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
