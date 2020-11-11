import React, { useState, useMemo, useEffect, useCallback } from "react"
import "./App.css"
import { UserContext } from "./UserContext"
import { Router } from "@reach/router"
import MainLayout from "./components/MainLayout"
import Landing from './pages/Landing'
import Myteam from "./pages/Myteam"
import Teams from "./pages/Teams"
import Editteam from "./pages/Editteam"
import Otherteam from "./pages/Otherteam"
import Createteam from "./pages/Createteam"
import Assignment from "./pages/Assignment"
import Assignments from "./pages/Assignments"
import CreateAssignment from "./pages/CreateAssignment"
import EditAssignment from "./pages/EditAssignment"
import CreateRubric from "./pages/CreateRubric"
import EditRubric from "./pages/EditRubric"
import Assesment from "./pages/Assesment"
import Announcements from "./pages/Announcements"
import CreateAnnouncement from "./pages/CreateAnnouncement"
import EditAnnouncement from "./pages/EditAnnouncement"
import ViewAssesment from "./pages/ViewAssesment"
import Setting from "./pages/Setting"
import dayjs from 'dayjs';
import { SettingYearContext } from "./SettingYearContext"
import { SettingContext } from "./SettingContext"
import axios from "axios"
import CallbackFromSSO from "./pages/CallbackFromSSO"
import Swal from 'sweetalert2'
function App() {
  const [settingYearContext, setSettingYearContext] = useState(dayjs().format('YYYY') - 1)// อิงตาม ปฏิทิน 2020
  // const [settingYearContext, setSettingYearContext] = useState(dayjs().format('2019'))
  const [settingContext, setSettingContext] = useState({})
  const settingYearValue = useMemo(
    () => ({ settingYearContext, setSettingYearContext }),
    [settingYearContext, setSettingYearContext]
  )
  const settingValue = useMemo(
    () => ({ settingContext, setSettingContext }),
    [settingContext, setSettingContext]
  )
  // const { user, setUser } = useContext(UserContext) 
  const [user, setUser] = useState(null)


  // id: "1", 
  // name: "Siam Yamsaengsung", 
  // role: "teacher",

  // id: "11", 
  // name: "Pornthip Yamsaengsung", 
  // role: "aa",

  // id: "60130500114", 
  // name: "Suthiwat Sirithanakom",
  // role: "Student", 

  // 1 Siam Yamsaengsung
  // 2 Umaporn Supasitthimethee
  // 9 Pichet Limvachiranan


  const userValue = useMemo(() => ({ user, setUser }), [user, setUser])

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BE}/config/${settingYearContext}`)
      // const test = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      // console.log('response',response)
      // console.log('test',test)
      // console.log('response true false from database',response.data.student_one_more_group)
      // setSettingContext(response.data)
      if (parseInt(response.data.student_one_more_group)) {
        // console.log('In if')
        setSettingContext({ ...response.data, student_one_more_group: true })
      } else {
        // console.log('In else')
        setSettingContext({ ...response.data, student_one_more_group: false })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again later.',
      })
      // console.log(err)
    }
  })
  //  console.log('app',settingContext)
  useEffect(() => {
    fetchData()
  }, [settingYearContext])

  return (
    <SettingYearContext.Provider value={settingYearValue}>
      <SettingContext.Provider value={settingValue}>
        <UserContext.Provider value={userValue}>
          <Router>
            <CallbackFromSSO path='/checkAuth' />
            <Landing
              path="/" />
            <MainLayout
              path="/main"
              component={Myteam}
              statusbar={1} />
            <MainLayout
              path="/editteam/:id"
              component={Editteam}
              statusbar={1} />
            <MainLayout
              path="/createteam"
              component={Createteam}
              statusbar={1} />
            <MainLayout
              path="/allprojects"
              component={Teams}
              statusbar={2} />
            <MainLayout
              path="/projects/:id"
              component={Otherteam}
              statusbar={2}
            />
            <MainLayout
              path="/assignments"
              component={Assignments}
              statusbar={3}
            />
            <MainLayout
              path="/createassignment"
              component={CreateAssignment}
              statusbar={3}
            />
            <MainLayout
              path="/editassignment/:id"
              component={EditAssignment}
              statusbar={3}
            />
            <MainLayout
              path="/assignments/:id"
              component={Assignment}
              statusbar={3}
            />
            <MainLayout
              path="/send_assignment/:assignment_id/teacher/:id"
              component={Assesment}
              statusbar={3}
            />
            <MainLayout
              path="/assesment/:id/:project_id"
              component={ViewAssesment}
              statusbar={3}
            />
            <MainLayout
              path="/createrubric"
              component={CreateRubric}
              statusbar={3}
            />
            <MainLayout
              path="/editrubric/:id"
              component={EditRubric}
              statusbar={3}
            />
            <MainLayout
              path="/announcements"
              component={Announcements}
              statusbar={5}
            />
            <MainLayout
              path="/createannouncement"
              component={CreateAnnouncement}
              statusbar={5}
            />
            <MainLayout
              path="/editannouncement/:id"
              component={EditAnnouncement}
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
