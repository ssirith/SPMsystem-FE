import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import Buttons from "./Buttons"
import Inputtext from "./Inputtext";
import axios from 'axios'
import { useEffect } from "react"
import Button from '@material-ui/core/Button';

export default function ModalMemberEdit(props) {

  const [save, setSave] = useState()//เอาค่ามาจาก axios
  const [students, setStudents] = useState([])
  const [display, setDisplay] = useState([])//ค่าแสดงบน Add
  const [submit, setSubmit] = useState("")//ค่าที่ส่งไป
  const [isFilter, setIsFilter] = useState([])
  const [search, setSearch] = useState("");



  const fetchData = useCallback(
    async () => {    
      const {data} = 
      await axios.get(`http://127.0.0.1:8000/api/projects/IT01`)
      const all = 
      await axios.get(`http://127.0.0.1:8000/api/students`)
      setStudents(all.data)//{group[{},{},{},project{},teacher{[],}]
      setSave(data.group)
      
    },
    [],
  )
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [])
  

  useEffect(() => {
    setIsFilter(
      students.filter(
        std =>std.student_name.toLowerCase().includes(search.toLowerCase())
        ||std.student_id.includes(search)
      )
    )
    console.log(isFilter)
    
    console.log(isFilter.length) 
  }, [search, students, save]);

  function updateInput(e) {
    if (isFilter && isFilter.length > 0) {
      setSubmit(isFilter)
    } else {
      return isFilter;
    } 
    const temp = [...students]
    const index = temp.indexOf(e);
    if (index > -1) {
      temp.splice(index, 1);
    }
    setStudents(temp)
    console.log(isFilter)
    setSave([...save,e])
    console.log(save)
    console.log(students)
    setSearch("")
  }

  function deletemember(value) {
    props.deletemember(value)
    const result = save;
    students.push(value);
    students.sort(sortId)
    const index = save.indexOf(value);
    if (index > -1) {
      result.splice(index, 1);
    }
    console.log(result)
    setSave([...result])
  }

  function sortId(a,b){
      if(a.student_id > b.student_id){
        return 1 ;
      }else if (a.student_id < b.student_id){
        return -1 ;
      }
      return 0 ;
  }

  function handleSubmit() {
    props.addmember(save)
    console.log(save)
  }
  function disSubmit() {
    if (save) {
      if ((save.length == 0) || (save.length > 3)) {
        return <Button variant="contained" disabled> Submit</Button>
      }
      else {
        return <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
      }
    }
    else {
      return <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
    }
  }

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
        <Inputtext
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}

        />
        <div data-spy="scroll" data-offset="0">
          {isFilter.map((ads, idx) => (
            <p key={idx} onClick={() => updateInput(ads)}>
              {ads.student_id}
              {" "}
              {ads.student_name}
            </p>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="container" >
          {save && save.map((data, index) => {
            return (
              <div className="row" key={index} >
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
