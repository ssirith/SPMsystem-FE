import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import "./App.css"

import MainLayout from "./components/MainLayout"
import Myteam from "./pages/Myteam"
import Teams from "./pages/Teams"
import Editteam from "./pages/Editteam"
import Otherteam from "./pages/Otherteam"
import Createteam from "./pages/Createteam"
function App() {
  return (
    <Router>
      <Route exact path="/">
        <MainLayout>
          <Myteam />
        </MainLayout>
      </Route>
      <Route exact path="/teams">
        <MainLayout>
          <Teams />
        </MainLayout>
      </Route>
      <Route exact path="/editteam">
        <MainLayout>
          <Editteam />
        </MainLayout>
      </Route>
      <Route exact path="/otherteam/:id">
        <MainLayout>
          <Otherteam/>
        </MainLayout>
      </Route>
      <Route exact path="/createteam">
        <MainLayout>
          <Createteam/>
        </MainLayout>
      </Route>
    </Router>
  )
}

export default App
