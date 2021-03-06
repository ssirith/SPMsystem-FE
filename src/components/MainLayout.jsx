import React, { useCallback, useContext, useEffect } from "react"
import Cookie from "js-cookie"
import Navbar from "./common/Navbar"
import Sidebar from "./common/Sidebar"
import { navigate } from "@reach/router"
import axios from "axios"
import { UserContext } from "../UserContext"
import Swal from 'sweetalert2'
export default function MainLayout(props) {
  const { component: Child } = props
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const { user, setUser } = useContext(UserContext) //Mock data user context
  // const [user,setUser] =useState(null)
  const checkLogin = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BE}/sso/check-me`,
        { headers }
      )
      if (response.status === 200) {
        // console.log('response.data',response.data)
        localStorage.setItem("user", JSON.stringify(response.data))
        let localuser = JSON.parse(localStorage.getItem("user"))
        setUser(localuser)
        // console.log('ggg',user)
      } else if (response.status === 401) {
        navigate("/")
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again later.',
      })
      navigate("/")
      // console.log(err)
    }
  })

  useEffect(() => {
    checkLogin()
  }, [])
  return (
    <>
      {/* {console.log('storage',localStorage.getItem('user'))} */}
      {/* {console.log('ggg',user)} */}
      {user && <Navbar />}
      <div className="container-fluid ">
        <div className="row">
          <Sidebar statusbar={props.statusbar} />
         {user&& <Child {...props} />}
        </div>
      </div>
    </>
  )
}
