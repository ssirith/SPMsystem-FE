import React, { useState, useCallback, useContext } from "react"
import Cookie from "js-cookie"
import { Modal } from "react-bootstrap"
import Swal from 'sweetalert2'
import Inputtext from "./Inputtext"
import axios from "axios"
import { useEffect } from "react"
import Button from "@material-ui/core/Button"
import { useParams } from "@reach/router"
import { SettingContext } from "../../SettingContext"
import { UserContext } from "../../UserContext"
export default function ModalEditMember(props) {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const [isPreFetch, setIsPreFetch] = useState(false)
  const [save, setSave] = useState() //เอาค่ามาจาก axios
  const [students, setStudents] = useState([])
  const [isFilter, setIsFilter] = useState([])
  const [search, setSearch] = useState("")
  const { id } = useParams()
  const { settingContext, setSettingContext } = useContext(SettingContext)
  const { user, setUser } = useContext(UserContext)
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      if (settingContext.student_one_more_group === false) {//false 0
        const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/projects/${id}`, { headers })
        const all = await axios.get(`${process.env.REACT_APP_API_BE}/students/nogroup`, { headers })
        setStudents(all.data) //{group[{},{},{},project{},teacher{[],}]
        setSave(data.group)
      } else if (settingContext.student_one_more_group === true) {//true 1
        const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/projects/${id}`, { headers })
        const all = await axios.get(`${process.env.REACT_APP_API_BE}/students`, { headers })
        setStudents(all.data) //{group[{},{},{},project{},teacher{[],}]
        setSave(data.group)
      }
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
    const temp = [...students]// จำลองค่าเพื่อไม่ให้เปลี่ยนที่ DB โดยตรง
    if (save) {
      for (let i = 0; i < save.length; i++) {
        const index = temp.findIndex(temp => temp.student_id === save[i].student_id)
        if (index > -1) {
          temp.splice(index, 1)
        }
      }
    }
    // if(save){
    //   const filterUser = save.findIndex(save => save.student_id === user.user_id)
    //   if (filterUser > -1) {
    //     save.splice(filterUser, 1)
    //   }
    // }
    let toShow = (temp) => temp.filter((v, i) => temp.indexOf(v) === i)
    setIsFilter(
      toShow(temp).filter(
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
    setStudents([...students, value])
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
    if (save) {
      if (save.length < settingContext.number_of_member_min || save.length > settingContext.number_of_member_max) {
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

  function disDeleteButton() {

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
          <tbody style={{ cursor: 'pointer' }}>
            {isFilter && isFilter.map((ads, idx) => (
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
          {/* <div className="row my-2" >
            <div className="col-4">{user.user_id}</div>
            <div className="col-4">{user.name}</div>
          </div>
          <br />substring(0, 10) + "..." */ }
          {save &&
            save.map((data, index) => {
              return (
                <div className="row my-2" key={index}>
                  <div className="col-4">{data.student_id}</div>
                  <div className="col-4">
                    {data.student_name && data.student_name.length > 11 ? (data.student_name.substring(0, 10) + "...") : (data.student_name)}
                  </div>
                  {data.student_id !== user.user_id ?
                    <div style={{ height: "20px", width: "50px", textAlign: "center" }}>
                      <button

                        className="btn btn-danger"
                        onClick={() => deleteMember(data)}
                      >
                        Delete
                </button>
                    </div>
                    :
                    <>
                    </>
                  }
                  <br />
                  <br />
                </div>

              )
            })
          }

        </div>
        {disSubmit()}
      </Modal.Footer>
    </Modal>
  )
}
