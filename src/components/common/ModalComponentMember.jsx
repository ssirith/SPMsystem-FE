import React, { useState, useCallback, useContext } from "react"
import Cookie from "js-cookie"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"
import axios from "axios"
import { useEffect } from "react"
import Button from "@material-ui/core/Button"
import { useParams } from "@reach/router"
import { SettingContext } from "../../SettingContext"
import { UserContext } from "../../UserContext"
export default function ModalComponentMember(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const { user, setUser } = useContext(UserContext)
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const [isPreFetch, setIsPreFetch] = useState(false)
  const [save, setSave] = useState() //เอาค่ามาจาก axios array
  const [students, setStudents] = useState([])
  const [isFilter, setIsFilter] = useState([])
  const [search, setSearch] = useState("")
  const { settingContext, setSettingContext } = useContext(SettingContext)
  const { id } = useParams()
  const fetchData = useCallback(async () => {
    setIsPreFetch(true)
    if (settingContext.student_one_more_group === false) {
      //false 0
      const {
        data,
      } = await axios.get(`${process.env.REACT_APP_API_BE}/projects/${id}`, {
        headers,
      })
      const all = await axios.get(
        `${process.env.REACT_APP_API_BE}/students/nogroup`,
        { headers }
      )
      setStudents(all.data) //{group[{},{},{},project{},teacher{[],}]
      setSave(data.group)
    } else if (settingContext.student_one_more_group === true) {
      //true 1
      const {
        data,
      } = await axios.get(`${process.env.REACT_APP_API_BE}/projects/${id}`, {
        headers,
      })
      const all = await axios.get(`${process.env.REACT_APP_API_BE}/students`, {
        headers,
      })
      setStudents(all.data) //{group[{},{},{},project{},teacher{[],}]
      setSave(data.group)
    }

    setIsPreFetch(false)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

  console.log(settingContext)
  useEffect(() => {
    const temp = [...students] // จำลองค่า students เพื่อไม่ให้เกิดการเปลี่ยนแปลงโดยตรงที่ students
    if (save) {
      for (let i = 0; i < save.length; i++) {
        const index = temp.findIndex(
          (temp) => temp.student_id === save[i].student_id
        )
        if (index > -1) {
          temp.splice(index, 1)
        }
      }
    }
    const filterUser = temp.findIndex(
      (temp) => temp.student_id === user.user_id
    )
    if (filterUser > -1) {
      temp.splice(filterUser, 1)
    }
    setIsFilter(
      temp.filter(
        (std) =>
          std.student_name.toLowerCase().includes(search.toLowerCase()) ||
          std.student_id.includes(search)
      )
    )
  }, [search, students, save])

  function updateInput(e) {
    //เอาค่าที่แอดไปแสดง
    setSave([...save, e])
    setSearch("")
  }

  function deleteMember(value) {
    const result = save
    const index = save.indexOf(value)
    if (index > -1) {
      result.splice(index, 1)
    }
    setSave([...result]) //สมาชิกที่เหลือหลังจากลบออก
  }

  async function handleSubmit() {
    await props.addMember(save)
    if (props.setIsOpen(false)) {
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }
  function disSubmit() {
    //ฟังก์ชันเพื่อไม่ให้สามารถกดปุ่ม  submit ได้ ถ้าแอดเกินที่กำหนด
    if (save) {
      if (
        save.length < settingContext.number_of_member_min - 1 ||
        save.length > settingContext.number_of_member_max - 1
      ) {
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
  if (isPreFetch) {
    return <></>
  }

  return (
    <Modal
      show={props.isOpen}
      onHide={() => {
        props.setIsOpen(false)
      }}
      scrollable="true"
    >
      {console.log("std", students)}
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
          <tbody style={{ cursor: "pointer" }}>
            {isFilter.map((ads, idx) => (
              <tr key={idx} onClick={() => updateInput(ads)}>
                <td>{ads.student_id}</td>
                <td>{ads.student_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      {user && (
        <Modal.Footer>
          <div className="container">
            <div className="row my-2">
              <div className="col-4">{user.user_id}</div>
              <div className="col-4">{user.name}</div>
            </div>
            &nbsp;
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
      )}
    </Modal>
  )
}
