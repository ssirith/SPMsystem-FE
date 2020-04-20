import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import Buttons from "./Buttons"
import Inputtext from "./Inputtext";
import axios from 'axios'
import { useEffect } from "react"
import Button from '@material-ui/core/Button';

export default function ModalMemberEdit(props) {

  const [save, setSave] = useState()//เอาค่ามาจาก axios
  const [teachers, setTeachers] = useState([])
  const [display, setDisplay] = useState([])//ค่าแสดงบน Add
  const [submit, setSubmit] = useState("")//ค่าที่ส่งไป
  const [isFilter, setIsFilter] = useState([])
  const [search, setSearch] = useState("");



  const fetchData = useCallback(
    async () => {    
      const {data} = 
      await axios.get(`http://127.0.0.1:8000/api/projects/IT01`)
      const all = 
      await axios.get(`http://127.0.0.1:8000/api/teachers`)
      setTeachers(all.data)//{group[{},{},{},project{},teacher{[],}]
      setSave(data.teacher)
      
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
        teachers.filter(
        ads =>ads.teacher_name.toLowerCase()
        .includes(search.toLowerCase())
      )
    )
    console.log(isFilter)
    
    console.log(isFilter.length) 
  }, [search, teachers, save]);

  function updateInput(e) {
    if (isFilter && isFilter.length > 0) {
      setSubmit(isFilter)
    } else {
      return isFilter;
    } 
    const temp = [...teachers]
    const index = temp.indexOf(e);
    if (index > -1) {
      temp.splice(index, 1);
    }
    setTeachers(temp)
    console.log(isFilter)
    setSave([...save,e])
    console.log(save)
    console.log(teachers)
    setSearch("")
  }

  function deleteadvisor(value) {
    props.deleteadvisor(value)
    console.log(value)
    const result = save;
    teachers.push(value);
    teachers.sort(sortId)
    const index = save.indexOf(value);
    if (index > -1) {
      result.splice(index, 1);
    }
    console.log(result)
    setSave([...result])
  }

  function sortId(a,b){
      if(a.teacher_id > b.teacher_id){
        return 1 ;
      }else if (a.teacher_id< b.teacher_id){
        return -1 ;
      }
      return 0 ;
  }

  function handleSubmit() {
    props.addadvisor(save)
    console.log(save)
  }
  function disSubmit() {
    if (save) {
      if ((save.length == 0) || (save.length > 2)) {
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
              {ads.teacher_name}
            </p>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="container" >
          {save && save.map((data, index) => {
            return (
              <div className="row" key={index} >
                <div className="col-6">{data.teacher_name}</div>
                <button className="btn btn-danger" onClick={() => deleteadvisor(data)}>Delete</button>
              </div>
            )
          })}

        </div>
        {disSubmit()}
      </Modal.Footer>
    </Modal>
  );
}
