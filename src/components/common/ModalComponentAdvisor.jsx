import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import Buttons from "./Buttons"
import InputtextFunction from "./InputtextFunction";
import axios from 'axios'
import { useEffect } from "react"
import Button from '@material-ui/core/Button';

export default function ModalComponentMember(props) {

  const [advisors, setAdvisors] = useState([])//เอาค่ามาจาก axios
  const [save, setSave] = useState([])
  const [display, setDisplay] = useState()//ค่าแสดงบน Add
  const [submit, setSubmit] = useState("")//ค่าที่ส่งไป
  


  const fetchData = useCallback(
    async () => {
      const data = await axios.get(`http://127.0.0.1:8000/api/teachers`)
      setAdvisors(data.data)
      setDisplay(data.data)

    },
    [],
  )
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    !display && setDisplay(advisors)
  })
  
  function filter(value) {
    const temp = advisors.filter(
      ads => ads.teacher_name.toLowerCase() == value.toLowerCase()
      )
    if (temp.length == 0) {
      console.log(advisors)
      return setDisplay(advisors)
    } else {
      setDisplay(temp) //show ค่าที่เจอ
      setSubmit(temp[0]) // setค่าที่เจอเพื่อเตรียมส่ง 
    }
  }
  function addToShow() {
    const index = advisors.indexOf(submit);//เทียบ array ของค่าที่มีกับค่าที่ส่ง
    if (index > -1) {
      advisors.splice(index, 1);//ลบตำแหน่งที่ array ซ้ำกัน
    }
    console.log(advisors)
    setDisplay(advisors)
    console.log(display)
    save.push(submit)
    // setSave([...save, submit])
    console.log(save)
    // addmember(submit)
  }
  // function addmember(value) {
  //   console.log(value)
  //setSave([...save, value])
  // }

  function deleteadvisor(value) {

    const result = save ;
    advisors.push(value);
    const index = save.indexOf(value);
    if (index > -1) {
        result.splice(index, 1);
    }
    console.log(result)
    setSave([...result])

  }

  function disAdd() { // fx  disable save button
    if (display) {
      if ((submit.length == 0)||(display == 0) || (save.includes(submit)) || (save.length >= 2)) { // advisor(submited) = 0 or >2 || ซ้ำกับ submited  **(advisor.length >= 2)
        return <Button variant="contained" disabled> Add</Button>
      }
      else { // member 0 1 2 3
        return <button className="btn btn-primary" onClick={() =>addToShow()}>Add</button>
      }
    }
    else {
      return <button className="btn btn-primary" onClick={() => addToShow()}>Add</button>
    }
  }
  function handleSubmit(){
    props.addadvisor(save)
    console.log(save)
  }
  function disSubmit(){
    if (save) {
      if ((save == 0)) {
        return <Button variant="contained" disabled> Submit</Button>
      }
      else { // member 0 1 2 3
        return <button className="btn btn-primary" onClick={() => handleSubmit()} >Submit</button>
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
        {display && (display.map((ads, index) => {
          return (
            <>
              <p key={index}>
                {ads.teacher_name}
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
                <div className="col-6">{data.teacher_name}</div>
                <button className="btn btn-danger" onClick={() => deleteadvisor(data)} >Delete</button>
              </div>
            )
          })}
        </div>
        {disSubmit()}       
      </Modal.Footer>
    </Modal>
  );
}
