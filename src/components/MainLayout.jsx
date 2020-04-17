import React from "react"

import Navbar from "./common/Navbar"
import Sidebar from "./common/Sidebar"

export default function MainLayout(props) {
  const { component:Child } = props
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <Child {...props}/>
        </div>
      </div>
    </>
  )
}
