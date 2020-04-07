import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import Buttons from "./Buttons"
import InputtextFunction from "./InputtextFunction";
import axios from 'axios'
import { useEffect } from "react"
import Button from '@material-ui/core/Button';

export default function ModalComponentAdvisor(props) {

  const [advisors, setAdvisors] = useState()
  const [display, setDisplay] = useState()
  const [submit, setSubmit] = useState("")

  const fetchData = useCallback(
    async () => {
      const data = await axios.get(`http://127.0.0.1:8000/api/teachers`)
      setAdvisors(data.data)
    },
    [],
  )
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    !display && setDisplay(advisors)
  })
  // console.log(advisors)
  function dis() { // fx  disable save button
    if (props.advisors) {
      if ((submit == 0) || (props.advisors.includes(submit)) || (props.advisors.length >= 2)) {
        return <Button variant="contained" disabled> Save</Button>
      }
      else { // ads 0 1 2 
        return <Buttons color="primary" onClick={() => handleClose()} menu="Save" />
      }
    }
    else {
      return <Buttons color="primary" onClick={() => handleClose()} menu="Save" />
    }
  }

  function filter(value) {
    // console.log(value)
    const temp = advisors.filter(ads=>ads.teacher_name.toLowerCase() == value.toLowerCase())
    // console.log(temp)
    if (temp.length == 0) {
      return setDisplay(advisors)
    } else {
      setDisplay(temp)
      setSubmit(temp[0])
    }
  }


  function handleClose() { // หลังกด save

    const temp = advisors;

    const index = temp.indexOf(submit);
    if (index > -1) {
      temp.splice(index, 1);
    }
    setDisplay(advisors)
    setAdvisors(temp);
    props.addadvisor(submit);

  }

  // console.log(props.advisors)

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
      </Modal.Body>
      <Modal.Footer>
        {dis()}
      </Modal.Footer>
    </Modal>
  );
}
