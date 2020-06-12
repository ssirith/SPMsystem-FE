import React, { useState, useCallback, useEffect } from "react"
import Carditem from "../components/common/Carditem"
import axios from "axios"

export default function Teams() {
  const [group, setGroup] = useState([])
  const fetchData = useCallback(async () => {
    const data = await axios.get(`http://127.0.0.1:8000/api/projects`) //[]
    setGroup(data.data) // AllProject
  }, [])
  useEffect(() => {
    fetchData()
  }, [])
  console.log(group)
  return (
    <>

      {group && group.length > 0 ? (
        <div className="container">
          <div className="row mt-5">
            {group.map((data, index) => {
              return (
                <div className="col-3 m-3" key={index}>
                  <Carditem groups={data} />
                </div>
              )
            })}
          </div>
        </div>
      ) : (
          <div className="container text-center my-auto">
            <img src='/image/allproject.jpg' alt='Dashboard logo' className='img-fluid' width='50%' height='auto' />
            <br/>
            <br/>
            <p>
              Oops, you don't have any project.
          </p>
          </div>
        )
      }

    </>
  )
} 
