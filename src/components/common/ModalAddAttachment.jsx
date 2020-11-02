import React, { useState, useCallback } from "react"
import Cookie from "js-cookie"
import { useParams } from "@reach/router"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"
import axios from "axios"
import { useEffect } from "react"
import Button from "@material-ui/core/Button"

export default function ModalAddAttachment(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const [save, setSave] = useState() //เอาค่ามาจาก axios
  const [teachers, setTeachers] = useState([])
  const [isFilter, setIsFilter] = useState([])
  const [search, setSearch] = useState("")
  const { id } = useParams()
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/projects/${id}`, { headers })
      const all = await axios.get(`${process.env.REACT_APP_API_BE}/teachers`, { headers })
      setTeachers(all.data) //[{group[{},{},{},project{},teacher{[],}]
      setSave(data.teacher)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again.',
      })
      navigate("/main")
      // console.log(err)
    }
    
  }, [])
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    const temp = [...teachers] // จำลองค่าteachers เพื่อไม่ให้เกิดการเปลี่ยนแปลงโดยตรงที่ teachers
    if (save) {
      for (let i = 0; i < save.length; i++) {

        const index = temp.findIndex(temp => temp.teacher_name === save[i].teacher_name)
        if (index > -1) {
          temp.splice(index, 1)
        }
      }
    }

    setIsFilter(
      temp.filter(
        tch => tch.teacher_name.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, teachers, save])

  function updateInput(e) { //เอาค่าที่แอดไปแสดง
    setSave([...save, e])
    setSearch("")
  }

  function deleteAdvisor(value) {
    const result = save
    const index = save.indexOf(value)
    if (index > -1) {
      result.splice(index, 1)
    }
    setSave([...result])//สมาชิกที่เหลือหลังจากลบออก
  }

  async function handleSubmit() {
    await props.addAdvisor(save)
    if (props.setIsOpen(false)) {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }

  function disSubmit() { //ฟังก์ชันเพื่อไม่ให้สามารถกดปุ่ม  submit ได้ ถ้าแอดเกินที่กำหนด
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
            {isFilter.map((tch, idx) => (
              <tr key={idx} onClick={() => updateInput(tch)}>
                <td>{tch.teacher_name}</td>
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
