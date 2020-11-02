import React, { useState, useCallback, useEffect } from "react"
import Cookie from 'js-cookie'
import Carditem from "../components/common/Carditem"
import axios from "axios"
import Loading from "../components/common/Loading"
import Swal from 'sweetalert2'

export default function Teams() {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const [group, setGroup] = useState([])
  const [isPrefetch, setIsPreFetch] = useState(false)
  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      const data = await axios.get(`${process.env.REACT_APP_API_BE}/projects`, { headers }) //[]
      setGroup(data.data) // AllProject
      setIsPreFetch(false)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again.',
      })
      // console.log(err)
    }
  }, [])
  useEffect(() => {
    fetchData()
  }, [])
  if (isPrefetch) {
    return <><Loading open={isPrefetch} /></>
  }

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
            <br />
            <br />
            <p>
              Oops, you don't have any project.
          </p>
          </div>
        )
      }

    </>
  )
} 
