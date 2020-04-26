import React, { useState, useCallback } from "react"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"
import axios from "axios"
import { useEffect } from "react"
import Button from "@material-ui/core/Button"
import {useParams} from "@reach/router"
export default function ModalEditAdvisor(props) {
  const [save, setSave] = useState() //เอาค่ามาจาก axios
  const [teachers, setTeachers] = useState([])
  const [display, setDisplay] = useState([]) //ค่าแสดงบน Add
  const [submit, setSubmit] = useState("") //ค่าที่ส่งไป
  const [isFilter, setIsFilter] = useState([])
  const [search, setSearch] = useState("")
  const { id } = useParams()

  const fetchData = useCallback(async () => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/projects/${id}`)
    const all = await axios.get(`http://127.0.0.1:8000/api/teachers`)
    
    setTeachers(all.data) //{group[{},{},{},project{},teacher{[],}]
    setSave(data.teacher)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const temp = [...teachers]
    if (save) {
      for (let i = 0; i < save.length; i++) {
        console.log(save[i])
        console.log(temp)
        const index = temp.findIndex(temp => temp.teacher_id === save[i].teacher_id)
        if (index > -1) {
          temp.splice(index, 1)
        }
      }
    }
      console.log(temp)
      setIsFilter(
        temp.filter(
          tch => tch.teacher_name.toLowerCase().includes(search.toLowerCase()) )
      )
    console.log(isFilter)

    console.log(isFilter.length)
  }, [search, teachers, save])

  function updateInput(e) {

    setSave([...save, e])
    console.log(save)
    console.log(teachers)
    setSearch("")
  }

  function deleteadvisor(value) {
    props.deleteadvisor(value)
    console.log(value)
    const result = [...save];
    // teachers.sort(sortId)
    const index = result.indexOf(value)
    if (index > -1) {
      result.splice(index, 1)
    }
    console.log(result)
    setSave([...result])
  }

  // function sortId(a, b) {
  //   if (a.teacher_id > b.teacher_id) {
  //     return 1
  //   } else if (a.teacher_id < b.teacher_id) {
  //     return -1
  //   }
  //   return 0
  // }

  async function handleSubmit() {
    await props.addadvisor(save)
    if (props.setIsOpen(false)) {
        
      setTimeout(()=>{
        window.location.reload()
      },2000)
    }
    console.log(save)
  }
  function disSubmit() {
    if (save) {
      if (save.length > 2) {
        return (
          <Button variant="contained" disabled>
            {" "}
            Submit
          </Button>
        )
      } else {
        return (
          <button className="btn btn-primary" onClick={() => handleSubmit()}>
            Submit
          </button>
        )
      }
    } else {
      return (
        <button className="btn btn-primary" onClick={() => handleSubmit()}>
          Submit
        </button>
      )
    }
  }

  return (
    <Modal
      show={props.isOpen}
      onHide={() => {
        props.setIsOpen(false)
      }}
      scrollable="true"
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Inputtext
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className="table table-striped">
          <tbody>
            {isFilter.map((ads, idx) => (
              <tr key={idx} onClick={() => updateInput(ads)}>
                <td>{ads.teacher_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div className="container">
          {save &&
            save.map((data, index) => {
              return (
                <div className="row my-2" key={index}>
                  <div className="col-4">{data.teacher_name}</div>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteadvisor(data)}
                  >
                    Delete
                  </button>
                </div>
              )
            })}
        </div>
        {disSubmit()}
      </Modal.Footer>
    </Modal>
  )
}
