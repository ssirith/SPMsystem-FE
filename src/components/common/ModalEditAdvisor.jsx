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
    const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/projects/${id}`)
    const all = await axios.get(`${process.env.REACT_APP_API_BE}/teachers`)
    
    setTeachers(all.data) //{group[{},{},{},project{},teacher{[],}]
    setSave(data.teacher)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const temp = [...teachers] //จำลองค่าเพื่อไม่ให้เปลี่ยนที่ DB โดยตรง
    if (save) {
      for (let i = 0; i < save.length; i++) {
        const index = temp.findIndex(temp => temp.teacher_id === save[i].teacher_id)
        if (index > -1) {
          temp.splice(index, 1)
        }
      }
    }
      setIsFilter(
        temp.filter(
          tch => tch.teacher_name.toLowerCase().includes(search.toLowerCase()) )
      )
  }, [search, teachers, save])

  function updateInput(e) {
    setSave([...save, e])
    setSearch("")
  }

  function deleteAdvisor(value) {
    props.deleteAdvisor(value)
    const result = [...save];
    const index = result.indexOf(value)
    if (index > -1) {
      result.splice(index, 1)
    }
    setSave([...result])
  }

  async function handleSubmit() {
    await props.addAdvisor(save)
    if (props.setIsOpen(false)) {
        
      setTimeout(()=>{
        window.location.reload()
      },1000)
    }
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
          <tbody style={{cursor: 'pointer'}}>
            {isFilter.map((ads, idx) => (
              <tr className="text-center" key={idx} onClick={() => updateInput(ads)}>
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
                <div className="row my-2 text-center ml-4" key={index}>
                  <div className="col-7">{data.teacher_name}</div>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteAdvisor(data)}
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
