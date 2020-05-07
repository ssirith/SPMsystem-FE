import React, { useState, useMemo,useEffect, useCallback } from "react"
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
import Setting from "./pages/Setting"
import dayjs from 'dayjs';
import { SettingYearContext } from "./SettingYearContext"
import { SettingContext } from "./SettingContext"
import axios from "axios"

function App() {
  const [settingYearContext, setSettingYearContext] = useState(dayjs().format('YYYY'))// อิงตาม ปฏิทิน
  // const [settingYearContext, setSettingYearContext] = useState(dayjs().format('2019'))
  const [settingContext,setSettingContext] =useState({})
  const settingYearValue = useMemo(
    () => ({ settingYearContext, setSettingYearContext }),
    [settingYearContext, setSettingYearContext]
  )
  const settingValue = useMemo(
    () => ({ settingContext,setSettingContext }),
    [settingContext,setSettingContext]
  )

  const [user, setUser] = useState({
    id: "60130500082", //เวลา demo  เปลี่ยนที่นี่
    name: "Watunyu",
    role: "student", //เวลา demo  เปลี่ยนที่นี่
  })
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser])

  const fetchData = useCallback(async ()=>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_BE}/config/${settingYearContext}`)
      setSettingContext(response.data)
    }catch(err){
      console.log(err)
    }
  })

  useEffect(()=>{
    fetchData()
  },[settingYearContext])

  return (
    <SettingYearContext.Provider value={settingYearValue}>
    <SettingContext.Provider value={settingValue}>
      <UserContext.Provider value={userValue}>
        <Router>
          <MainLayout path="/" component={Myteam} statusbar={1} />
          <MainLayout path="/editteam/:id" component={Editteam} statusbar={1} />
          <MainLayout path="/createteam" component={Createteam} statusbar={1} />
          <MainLayout path="/AllProjects" component={Teams} statusbar={2} />
          <MainLayout
            path="/projects/:id"
            component={Otherteam}
            statusbar={2}
          />
          <MainLayout
            path="/Assignments"
            component={Assignments}
            statusbar={3}
          />
          <MainLayout
            path="/Appointments"
            component={Appointments}
            statusbar={4}
          />
          <MainLayout
            path="/Annoucements"
            component={Annoucements}
            statusbar={5}
          />
          <MainLayout path="/Setting" component={Setting} statusbar={6} />
        </Router>
      </UserContext.Provider>
    </SettingContext.Provider>
    </SettingYearContext.Provider>
  )
}

export default App
