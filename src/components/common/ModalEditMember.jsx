import React, { useState, useCallback } from "react"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"
import axios from "axios"
import { useEffect } from "react"
import Button from "@material-ui/core/Button"
import {useParams} from "@reach/router"
export default function ModalEditMember(props) {

  const [save, setSave] = useState() //เอาค่ามาจาก axios
  const [students, setStudents] = useState([])
  const [isFilter, setIsFilter] = useState([])
  const [search, setSearch] = useState("")
  const { id } = useParams()

  const fetchData = useCallback(async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/projects/${id}`)
    const all = await axios.get(`${process.env.REACT_APP_API_BE}/students/nogroup`)
    setStudents(all.data) //[{group[{},{},{},project{},teacher{[],}]
    setSave(data.group)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const temp = [...students]// จำลองค่าเพื่อไม่ให้เปลี่ยนที่ DB โดยตรง
      if (save) {
        for (let i = 0; i < save.length; i++) {
          const index = temp.findIndex(temp => temp.student_id === save[i].student_id)
          if (index > -1) {
            temp.splice(index, 1)
          }
        }
      }
        setIsFilter(
          temp.filter(
            std => std.student_name.toLowerCase().includes(search.toLowerCase()) || std.student_id.includes(search))
        )
  }, [search, students, save])

  function updateInput(e) {  
    setSave([...save, e])
    setSearch("")
  }

  function deleteMember(value) {
    props.deleteMember(value)//ส่งค่าตัวที่ลบไปให้
    const result = [...save]
    const index = result.indexOf(value)
    if (index > -1) {
      result.splice(index, 1)
    }
    setSave([...result])
  }

  async function handleSubmit() {
    await props.addMember(save)
    if (props.setIsOpen(false)) {
        
      setTimeout(()=>{
        window.location.reload()
      },2000)
    }
  }
  function disSubmit() {
    if (save) {
      if (save.length == 0 || save.length > 3) {
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
      scrollable='true'
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
                <td>{ads.student_id}</td>
                <td>{ads.student_name}</td>
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
                  <div className="col-4">{data.student_id}</div>
                  <div className="col-4">{data.student_name}</div>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMember(data)}
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
