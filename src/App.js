import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import "./App.css"

import MainLayout from "./components/MainLayout"
import Test from "./pages/Test"
import Teams from "./pages/Teams"

function App() {
  return (
    <Router>
      <Route exact path="/">
        <MainLayout>
          <Test />
        </MainLayout>
      </Route>
      <Route exact path="/teams">
        <MainLayout>
          <Teams/>
        </MainLayout>
      </Route>
    </Router>
  )
}

export default App
