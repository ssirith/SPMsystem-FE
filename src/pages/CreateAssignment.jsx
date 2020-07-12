import React, { useState, useCallback, useEffect, useContext } from "react"
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import Inputtext from "../components/common/Inputtext"
import Textarea from "../components/common/Textarea"
import { Card } from "react-bootstrap"
import Button from "@material-ui/core/Button"
import Buttons from "../components/common/Buttons"
import ModalPublicDate from "../components/common/ModalPublicDate"
import ModalDueDate from "../components/common/ModalDueDate"
import DropdownRubric from "../components/common/DropdownRubric"
import CreateRubric from "../components/common/CreateRubric"
import ModalAddAttachment from "../components/common/ModalAddAttachment"
import { FaCalendarAlt } from "react-icons/fa"
import { Link, useNavigate } from "@reach/router"
export default function CreateAssignment() {
    const [isOpenAttachment, setIsOpenAttachment] = useState(false)

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 my-3">
                        <BreadcrumbNavString
                            pastref="/Assignments"
                            past="All Assignment"
                            current="Create Assignment"
                        />
                    </div>
                    <div className="col-12 my-3">
                        <p>Create New Assigment</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10 my-3">
                        TiTle:
                        <Inputtext
                            id="assignmentname"
                            label="Assignment Name"
                            defaultValue={""}
                            onChange={""}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-10 my-3">
                        Description:
                    <Textarea
                            id="description"
                            label=""
                            defaultValue={""}
                            onChange={""}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-5">
                        Attachment:
                    <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-12 text-center m-2">
                                        <Buttons
                                            menu="Add"
                                            color="primary"
                                            onClick={() => setIsOpenAttachment(true)}
                                        />
                                        <ModalAddAttachment
                                            isOpen={isOpenAttachment}
                                            setIsOpen={setIsOpenAttachment}
                                            addAttachment={""}
                                            header="Add Attachments"
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <br />

                {/* <div className="row">
                    <div className="col-12">
                        Publish Date:
                <div className="row">
                            <div className="col-2 text-center">
                                <Inputtext
                                    id="showDate"
                                    label="DD/MM/YYYY"
                                    defaultValue={""}
                                    onChange={""}
                                />
                            </div>
                            <div className="col-5 my-3">
                                <div className="row">
                                    <span  onClick={() => console.log("Clicky")}><FaCalendarAlt size="40" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-6">
                        Public Date:
                        <ModalPublicDate/>
                    </div>
                    <div className="col-6">
                        Public Date:
                        <ModalDueDate/>
                    </div>
                </div><br />

                <div className="row">
                    <div className="col-5">
                        Reviewer:
                    <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-12 text-center m-2">
                                        <Buttons
                                            menu="Add"
                                            color="primary"
                                            onClick={() => setIsOpenAttachment(true)}
                                        />
                                        <ModalAddAttachment
                                            isOpen={isOpenAttachment}
                                            setIsOpen={setIsOpenAttachment}
                                            addAttachment={""}
                                            header="Add Attachments"
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div><br />
                
                    <div className="row">
                    <div className="col-3 ">
                        Rubric:
                        
                                <DropdownRubric
                                //   departmentList={departmentList}
                                //   department={department}
                                //   setDepartment={setDepartment}
                                />
                            </div>
                        </div><br/>
                    <CreateRubric/>
                
                <div className="col-12 mx-auto">
                    <div className="row">
                        <div className="col-12 text-center">
                            <Link className="mr-2" to="/Assignments">
                                <Buttons
                                    menu="Cancel"
                                    color="secondary"
                                    onClick={() => console.log("Cancel")}
                                />
                            </Link>

                            <Buttons
                                menu="Create"
                                color="primary"
                                onClick={() => console.log("save")}
                                onClick={""}
                            />

                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}