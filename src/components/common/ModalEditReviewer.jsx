import React, { useState, useCallback, useContext } from "react"
import Cookie from "js-cookie"
import { useParams } from "@reach/router"
import { Modal } from "react-bootstrap"
import Swal from 'sweetalert2'
import Inputtext from "./Inputtext"
import axios from "axios"
import { useEffect } from "react"
import Button from "@material-ui/core/Button"
import { UserContext } from "../../UserContext"
export default function ModalEditReviewer(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const [save, setSave] = useState() //เอาค่ามาจาก axios
  const [resnponsible_teacher, setResnponsible_teacher] = useState() //เอาค่ามาจาก axios
  const [teachers, setTeachers] = useState([])
  const [isFilter, setIsFilter] = useState([])
  const [search, setSearch] = useState("")
  const [isPreFetch, setIsPreFetch] = useState(false)
  const { id } = useParams()
  const { user, setUser } = useContext(UserContext)
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/assignments/${id}`, { headers })
      const res = await axios.get(`${process.env.REACT_APP_API_BE}/teachers`, { headers })
      setTeachers(res.data)
      setResnponsible_teacher(data.resnponsible)
      var newSave = [];
      res.data.map((t) => {
        if (data.resnponsible.some((r) => r.responsible_teacher_id === t.teacher_id)) {
          newSave.push(t)
          setSave(newSave)
        }
      })
      setIsPreFetch(false)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again.',
      })
      console.log(err)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const temp = [...teachers]
    if (save) {
      for (let i = 0; i < save.length; i++) {
        const index = temp.findIndex(temp => temp.teacher_id === save[i].teacher_id)
        if (index > -1) {
          temp.splice(index, 1)
        }
      }

      setIsFilter(
        temp.filter(
          tch => tch.teacher_name.toLowerCase().includes(search.toLowerCase()))
      )
    }

  }, [search, teachers, save])

  function updateInput(e) { //เอาค่าที่แอดไปแสดง
    setSave([...save, e])
    setSearch("")
  }

  function deleteAdvisor(value) {
    props.deleteReviewer(value)
    const result = save
    const index = save.indexOf(value)
    if (index > -1) {
      result.splice(index, 1)
    }
    setSave([...result])//สมาชิกที่เหลือหลังจากลบออก
  }

  async function handleSubmit() {
    await props.addReviewer(save)
    if (props.setIsOpen(false)) {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }
  if (isPreFetch) {
    return <></>
  }
  function disSubmit() { //ฟังก์ชันเพื่อไม่ให้สามารถกดปุ่ม  submit ได้ ถ้าแอดเกินที่กำหนด
    if (save) {
      if (save.length == 0) {
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
          <tbody style={{ cursor: 'pointer' }}>
            {isFilter.map((tch, idx) => (
              <tr className="text-center" key={idx} onClick={() => updateInput(tch)}>
                <td>{tch.teacher_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div className="container">
          <div className="row my-2" >
          </div>
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
