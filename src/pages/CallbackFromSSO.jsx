import React, { useCallback, useState } from "react"
import Cookie from "js-cookie"
import * as queryString from "query-string"
import { useEffect } from "react"
import axios from "axios"
import { navigate } from "@reach/router"
import { useContext } from "react"
import { UserContext } from "../UserContext"
import Loading from "../components/common/Loading"

export default function CallbackFromSSO(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const { user, setUser } = useContext(UserContext)

  const fetchUserData = useCallback(async () => {
    const queryParams = queryString.parse(props.location.search)
    try {
      if (queryParams.state === "SPMlogin") {
        const auth = {
          auth_code: queryParams.code,
        }
        const response = await axios.post(
          `${process.env.REACT_APP_API_BE}/sso/check-authentication`,
          auth,
          { headers }
        )
        if (response.status === 200) {
          setUser(response.data)
          Cookie.set("jwt", response.data.token)
          navigate("/main")
        }
      } else {
        alert("Something went wrong please contract support")
        navigate("/")
      }
    } catch (err) {
      alert(err)
    }
  }, [props.location.search])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return <Loading open={true} />
}
