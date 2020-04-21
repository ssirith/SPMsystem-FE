import React from "react"
import "./App.css"
import { Router } from "@reach/router"
import MainLayout from "./components/MainLayout"
import Myteam from "./pages/Myteam"
import Teams from "./pages/Teams"
import Editteam from "./pages/Editteam"
import Otherteam from "./pages/Otherteam"
import Createteam from "./pages/Createteam"
function App() {
  return (
    <Router>
      <MainLayout path="/" component={Myteam} statusbar={1} />
      <MainLayout path="/AllProjects" component={Teams} statusbar={2}  />
      <MainLayout path="/editteam/:id" component={Editteam} statusbar={3}  />
      <MainLayout path="/projects/:id" component={Otherteam} statusbar={4}  />
      <MainLayout path="/createteam" component={Createteam} statusbar={5} />
    </Router>
  )
}

export default App
