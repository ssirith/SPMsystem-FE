import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import Sidebar from "./components/common/Sidebar"
import Navbar from "../src/components/common/Navbar"
import Carditem from "../src/components/common/Carditem"
import Approvebutton from "./components/common/butttons/Approvebutton"
import Denybutton from "../src/components/common/butttons/Denybutton"
import Boxitem from "../src/components/common/Boxitem"
function App() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <Carditem />
      <Approvebutton />
      <Denybutton />
      <Boxitem />
    </div>
  )
}

export default App
