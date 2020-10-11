import React, { useCallback, useState } from "react"
import Cookie from 'js-cookie'
import * as queryString from "query-string"
import { useEffect } from "react"
import axios from "axios"
import { navigate } from "@reach/router"

export default function CallbackFromSSO(props) {
    const headers = {
        Authorization: `Bearer ${Cookie.get("jwt")}`,
        "Content-Type": "application/json",
        accept: "application/json",
      }
  const fetchUerData = useCallback(async () => {
    const queryParams = queryString.parse(props.location.search)
    // console.log('queryParams',queryParams)
    try {
        const auth ={
            auth_code:queryParams.code
        }
        const response=await axios.post(`${process.env.REACT_APP_API_BE}/sso/check-authentication`,auth,{headers})
        if(response.status===200){
            console.log('user',response.data)
            Cookie.set('jwt',response.data.token)
            navigate('/main')

        }
    } catch (err) {
      alert(err)
    }
  }, [props.location.search])

  useEffect(() => {
    fetchUerData()
  }, [fetchUerData])

  return (
    <div className='text-center vh-100'>
      <h1 className='my-auto'>CHECKING......</h1>
    </div>
  )
}
