import React, { useCallback, useEffect } from "react"
import Cookie from "js-cookie"
import Navbar from "./common/Navbar"
import Sidebar from "./common/Sidebar"
import { navigate } from "@reach/router"
import axios from "axios"

export default function MainLayout(props) {
  const { component: Child } = props
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const checkLogin = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BE}/sso/check-me`,
        {headers}
      )
      if (response.status === 200) {
        localStorage.setItem("user", response.data)
        // console.log(response.data)
      } else if (response.status === 401) {
        navigate("/")
      } else {
        alert(response.status)
      }
    } catch (err) {
      alert(err)
    }
  })
  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <>
      <Navbar />
      <div className="container-fluid ">
        <div className="row">
          <Sidebar statusbar={props.statusbar} />

          <Child {...props} />
        </div>
      </div>
    </>
  )
}
