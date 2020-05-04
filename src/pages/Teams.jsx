import React, { useState, useCallback, useEffect } from "react"
import Carditem from "../components/common/Carditem"
import axios from "axios"

export default function Teams() {
  const [group, setGroup] = useState([])
  const fetchData = useCallback(async () => {
    const data = await axios.get(`${process.env.REACT_APP_API_BE}/projects`) //[]
    setGroup(data.data) // AllProject
  }, [])
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {group.map((data,index) => {
            return (            
              <div className="col-3 m-3" key={index}>
                <Carditem groups={data} />
              </div>
              
            )
          })}
        </div>
      </div>
    </>
  )
} 
