import React,{useState,useMemo} from "react"
import "./App.css"
import { UserContext } from "./UserContext"
import { Router } from "@reach/router"
import MainLayout from "./components/MainLayout"
import Myteam from "./pages/Myteam"
import Teams from "./pages/Teams"
import Editteam from "./pages/Editteam"
import Otherteam from "./pages/Otherteam"
import Createteam from "./pages/Createteam"
import Assignments from "./pages/Assignments"
import Appointments from "./pages/Appointments"
import Annoucements from "./pages/Annoucements"
function App() {
  const [user,setUser]=useState({
        id: "60130500114",//เวลา demo  เปลี่ยนที่นี่
        name: "Suthiwat",
        role:"student"//เวลา demo  เปลี่ยนที่นี่
  })
  const value=useMemo(()=>({ user,setUser }), [user,setUser])
  return (
      <UserContext.Provider value={value}>
    <Router>
      <MainLayout path="/" component={Myteam} statusbar={1} />
      <MainLayout path="/editteam/:id" component={Editteam} statusbar={1}  />
      <MainLayout path="/createteam" component={Createteam} statusbar={1} />
      <MainLayout path="/AllProjects" component={Teams} statusbar={2}  />
      <MainLayout path="/projects/:id" component={Otherteam} statusbar={2}  />
      <MainLayout path="/Assignments" component={Assignments} statusbar={3} />
      <MainLayout path="/Appointments" component={Appointments} statusbar={4} />
      <MainLayout path="/Annoucements" component={Annoucements} statusbar={5} />
    </Router>
      </UserContext.Provider>
  )
}

export default App
