import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import Sidebar from "./components/common/Sidebar"
import Navbar from "../src/components/common/Navbar"
import Carditem from "../src/components/common/Carditem"
import Boxitem from "../src/components/common/Boxitem"
import Button from "./components/common/Buttons"



function App() {
  return (
    <div>
      {/* <Sidebar /> */}
      {/* <Navbar /> */}
      <Carditem />
      <Button menu = "Test Button" color ='primary'/>
      <Boxitem />
    </div>
  )
}

export default App
