import React from "react"
import Cookie from "js-cookie"
import { Modal } from "react-bootstrap"
import Buttons from "./Buttons"
import Swal from 'sweetalert2'
import axios from "axios"
import { useNavigate } from "@reach/router"
export default function ModalChangeRubric(props) {
    let navigate = useNavigate()
    async function handleSubmit() {
        const assignment_id = props.assignment.assignment_id
        let sendReviewer = []
        if (props.reviewerFromBE.length !== 0) {
            props.reviewer.map(r => {
                if (!props.reviewerFromBE.some(item => item.teacher_id === r.teacher_id)) {
                    sendReviewer.push(r.teacher_id)

                }
            })
        }
        const headers = {
            Authorization: `Bearer ${Cookie.get("jwt")}`,
            "Content-Type": "application/json",
            accept: "application/json",
          }
        const teacher_id = props.userId
        const rubric_id = props.rubric.rubric_id

        const data = new FormData();
        data.append('assignment_id', assignment_id)//assignment_id

        if (sendReviewer.length !== 0) {//responsible_teacher
            for (const acceptResponsible_teacher of sendReviewer) {
                data.append('responsible_teacher[]', acceptResponsible_teacher)
            }
        } else {
            data.append('responsible_teacher[]', [])
        }

        if (props.delete_responsible_teacher.length !== 0) {//delete_responsible_teacher
            for (const acceptDelete_responsible_teacher of props.delete_responsible_teacher) {
                data.append('delete_responsible_teacher[]', acceptDelete_responsible_teacher)
            }
        } else {
            data.append('delete_responsible_teacher[]', [])
        }

        if (props.selectAttachment.length !== 0) {//selectAttachment
            for (const acceptFile of props.selectAttachment) {
                data.append('attachment[]', acceptFile)
            }
        } else {
            data.append('attachment[]', [])
        }

        if (props.delete_attachment.length !== 0) {//delete_attachment
            for (const acceptDelete_attachment of props.delete_attachment) {
                data.append('delete_attachment[]', acceptDelete_attachment)
            }
        } else {
            data.append('delete_attachment[]', [])
        }

        data.append('assignment_title', props.assignment_title)//assignment_title
        data.append('assignment_detail', props.assignment_detail)//assignment_detail
        data.append('due_date', props.due_date)//due_date
        data.append('due_time', props.due_time)//due_time
        data.append('teacher_id', teacher_id)//teacher_id
        data.append('rubric_id', rubric_id)//rubric_id

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BE}/assignments/edit`, data,{headers})
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Save!',
                    text: 'Edit Success.',
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false
                  })
          
                  setTimeout(() => {
                    navigate(`/assignments/${props.id}`)
                  }, 2000);
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oop...',
                text: 'Something went wrong, Please Try again later.',
              })
            console.error(err)
        }
    }

    return (

        <Modal
            show={props.isOpen}
            onHide={() => { props.setIsOpen(false) }}>
            <Modal.Header closeButton>
                <Modal.Title>{props.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body><p>Are you sure to chage or remove this rubric?</p>
                <p className="text-danger">If rubric has been change or remove, The assessment will be remove</p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <div className="mx-2">
                    <Buttons onClick={() => props.setIsOpen(false)} menu="Cancle" />
                </div>
                <div className="mx-2">
                    <Buttons
                        color="primary"
                        onClick={(event) => handleSubmit(event)}
                        menu="Confirm"
                    />
                </div>
            </Modal.Footer>
        </Modal>
    )
}
