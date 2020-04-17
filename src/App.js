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
      <MainLayout path="/" component={Myteam} />
      <MainLayout path="/AllProjects" component={Teams} />
      <MainLayout path="/editteam" component={Editteam} />
      <MainLayout path="/projects/:id" component={Otherteam} />
      <MainLayout path="/createteam" component={Createteam} />
    </Router>
  )
}

export default App
