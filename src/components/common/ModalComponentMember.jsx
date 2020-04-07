import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import Buttons from "./Buttons"
import InputtextFunction from "./InputtextFunction";
import axios from 'axios'
import { useEffect } from "react"
import Button from '@material-ui/core/Button';

export default function ModalComponentMember(props) {

  const [students, setStudents] = useState()
  const [studenttemp, setStudenttemp] = useState()
  const [display, setDisplay] = useState()
  const [submit, setSubmit] = useState("")
 
  
  const fetchData = useCallback(
    async () => {
      const data = await axios.get(`http://127.0.0.1:8000/api/students`)
      setStudents(data.data)
    },
    [],
  )
  useEffect(() => {
    fetchData()
  }, [])
  
  useEffect(() => {
    !display && setDisplay(students)
  })

  function dis() { // fx  disable save button
    if (props.members) {
      if ((submit == 0) || (props.members.includes(submit))||(props.members.length >= 3)) { // member(submited) = 0 or >3 || ซ้ำกับ submited  **(props.members.length >= 3) ||
        return <Button variant="contained" disabled> Save </Button>
      }
      else { // member 0 1 2 3
        return <Buttons color="primary" onClick={() => handleClose()} menu="Save" />
      }
    }
    else {
      return <Buttons color="primary" onClick={() => handleClose()} menu="Save" />
    }
  }
  function filter(value) {
    // console.log(value)
    const temp = students.filter(std => std.student_id == value || std.student_name.toLowerCase() == value.toLowerCase())
    // console.log(temp)
    if (temp.length == 0) {
      return setDisplay(students)
    } else {
      setDisplay(temp) //show ค่าที่เจอ
      setSubmit(temp[0]) // setค่าที่เจอเพื่อเตรียมส่ง 
    }
  }

  function  handleClose() { // หลังกด save
    const temp = students;
    const index = temp.indexOf(submit);
    if (index > -1) {
      temp.splice(index, 1);
    }
    setDisplay(students)
    setStudents(temp);
    props.addmember(submit)
    
  }
  

  // console.log(props)
  // console.log((props.members.includes(submit)))
  // console.log(props.members)

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
      </Modal.Body>
      <Modal.Footer>
        {dis()}
      </Modal.Footer>
    </Modal>
  );
}