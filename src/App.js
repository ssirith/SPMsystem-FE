import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"

import Navbar from "../src/components/common/Navbar"
import Carditem from "../src/components/common/Carditem"
import Boxitem from "../src/components/common/Boxitem"
import Button from "./components/common/Buttons"
import Inputtext from "./components/common/Inputtext"


function App() {
  return (
    <>
      <div>
        <Navbar />
      </div> 
      <div>
      <Carditem />
      <Button
        menu="Test Button"
        color="primary"
        onClick={() => console.log("stesfa")}
      />
      <Boxitem />
        <Inputtext
        id="groupName"
        label="Temp label"
        defaultValue="Chonki Group"
        color="primary"
      />
      </div>
    </>
  )
}

export default App
