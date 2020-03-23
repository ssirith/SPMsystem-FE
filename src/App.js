import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import "./App.css"

import MainLayout from "./components/MainLayout"
import Test from "./pages/Test"
import Zompongpage from "./pages/Zompongpage"

function App() {
  return (
    <Router>
      <Route exact path="/">
        <MainLayout>
          <Test />
        </MainLayout>
      </Route>
      <Route exact path="/2">
        <MainLayout>
          <Zompongpage />
        </MainLayout>
      </Route>
    </Router>
  )
}

export default App
