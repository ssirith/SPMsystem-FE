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
  // const [display, setDisplay] = useState([]) //ค่าแสดงบน Add
  // const [submit, setSubmit] = useState("") //ค่าที่ส่งไป
  const [isFilter, setIsFilter] = useState([])
  const [search, setSearch] = useState("")
  const { id } = useParams()

  const fetchData = useCallback(async () => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/projects/${id}`)
    const all = await axios.get(`http://127.0.0.1:8000/api/students/nogroup`)
    setStudents(all.data) //{group[{},{},{},project{},teacher{[],}]
    setSave(data.group)
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

 

  useEffect(() => {
    console.log(save) 
    const temp = [...students]
      if (save) {
        for (let i = 0; i < save.length; i++) {
          console.log(save[i])
          console.log(temp)
          const index = temp.findIndex(temp => temp.student_id === save[i].student_id)
          if (index > -1) {
            temp.splice(index, 1)
          }
        }
      }
        console.log(temp)
        setIsFilter(
          temp.filter(
            std => std.student_name.toLowerCase().includes(search.toLowerCase()) || std.student_id.includes(search))
        )
      
    
    console.log(isFilter)
    console.log(isFilter.length)
  }, [search, students, save])

  function updateInput(e) {  
    // const temp = [...isFilter]
    // const index = temp.indexOf(e)
    // if (index > -1) {
    //   temp.splice(index, 1)
    // }
    // setIsFilter(temp)
    // console.log(isFilter)
    setSave([...save, e])
    console.log(save)
    console.log(students)
    setSearch("")
  }
  console.log(save)

  function deletemember(value) {
    props.deletemember(value)
    const result = [...save]
    const index = result.indexOf(value)
    if (index > -1) {
      result.splice(index, 1)
    }
    console.log(result)
    setSave([...result])
    console.log(save)
  }

  // function sortId(a, b) {
  //   if (a.student_id > b.student_id) {
  //     return 1
  //   } else if (a.student_id < b.student_id) {
  //     return -1
  //   }
  //   return 0
  // }

  async function handleSubmit() {
    await props.addmember(save)
    if (props.setIsOpen(false)) {
        
      setTimeout(()=>{
        window.location.reload()
      },2000)
    }
    console.log(save)
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
                    onClick={() => deletemember(data)}
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
