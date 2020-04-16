import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import Buttons from "./Buttons"
import InputtextFunction from "./InputtextFunction";
import axios from 'axios'
import { useEffect } from "react"
import Button from '@material-ui/core/Button';

export default function ModalMemberEdit(props) {

  const [save, setSave] = useState()//เอาค่ามาจาก axios
  const [students, setStudents] = useState([])
  const [display, setDisplay] = useState([])//ค่าแสดงบน Add
  const [submit, setSubmit] = useState("")//ค่าที่ส่งไป



  const fetchData = useCallback(
    async () => {    
      const {data} = 
      await axios.get(`http://127.0.0.1:8000/api/projects/IT01`)
      const all = 
      await axios.get(`http://127.0.0.1:8000/api/students`)
      setStudents(all.data)//{group[{},{},{},project{},teacher{[],}]
      setDisplay(all.data)
      setSave(data.group)
      
    },
    [],
  )
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    !display && setDisplay(students)
  })
    console.log(students)
    console.log(display)

  function filter(value) {
    const temp = students.filter(
      std => std.student_id == value ||
        std.student_name.toLowerCase() == value.toLowerCase()
    )
    if (temp.length == 0) {
      console.log(students)
      return setDisplay(students)
    } else {
      setDisplay(temp) //show ค่าที่เจอ
      setSubmit(temp[0]) // setค่าที่เจอเพื่อเตรียมส่ง 
    }
  }
  function addToShow() {
    const index = students.indexOf(submit);//เทียบ array ของค่าที่มีกับค่าที่ส่ง
    if (index > -1) {
        students.splice(index, 1);//ลบตำแหน่งที่ array ซ้ำกัน
    }
    console.log(students)
    setDisplay(students)
    console.log(display)
    save.push(submit)
    console.log(save)
  
  }

  function deletemember(value) { //data
    console.log(value)
    props.deletemember(value)
    const result = save;
    students.push(value);
    const index = save.indexOf(value);
    if (index > -1) {
      result.splice(index, 1);
    }
    console.log(result)
    setSave([...result])
    
  }

  function disAdd() { // fx  disable save button
    if (display) {
      if ((submit.length == 0) || (display == 0) || (save.includes(submit)) || (save.length >= 3)) { // member(submited) = 0 or >3 || ซ้ำกับ submited  **(props.members.length >= 3) ||
        return <Button variant="contained" disabled> Add</Button>
      }
      else { // member 0 1 2 3
        return <button className="btn btn-primary" onClick={() => addToShow()}>Add</button>
      }
    }
    else {
      return <button className="btn btn-primary" onClick={() => addToShow()}>Add</button>
    }
  }

  function handleSubmit() {
    props.addmember(save)
    console.log(save)
  }
  function disSubmit(){
    if (save) {
      if ((save == 0)) { // member(submited) = 0 or >3 || ซ้ำกับ submited  **(props.members.length >= 3) ||
        return <Button variant="contained" disabled> Submit</Button>
      }
      else { // member 0 1 2 3
        return <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
      }
    }
    else {
      return <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  return (
    <Modal
      show={props.isOpen}
      onHide={() => {
        props.setIsOpen(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputtextFunction id="member" color='primary' placeholder="Search by name or ID"
          filter={filter} />
        {display && (display.map((std, index) => {
          return (
            <>
              <p key={index}>
                {std.student_id}
                {" "}
                {std.student_name}
              </p>
            </>
          )
        }))}
        {disAdd()}
      </Modal.Body>
      <Modal.Footer>
        <div className="container" >
          {save && save.map((data, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-6">{data.student_id}</div>
                <div className="col-6">{data.student_name}</div>
                <button className="btn btn-danger" onClick={() => deletemember(data)}>Delete</button>
              </div>
            )
          })}
        </div>
        {disSubmit()}
      </Modal.Footer>
    </Modal>
  );
}
