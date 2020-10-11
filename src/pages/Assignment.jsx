import React, { useState, useCallback, useContext } from "react"
import Cookie from 'js-cookie'
import { makeStyles } from "@material-ui/core/styles"
import { Card } from "react-bootstrap"
import { Link, useNavigate } from "@reach/router"
import Buttons from "../components/common/Buttons"
import { CardHeader } from "@material-ui/core"
import axios from "axios"
import { useParams } from "@reach/router"
import { useEffect } from "react"
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import ModalDeleteAssignment from "../components/common/ModalDeleteAssignment"
import Submission from "../components/common/Submission"
import { Table } from "react-bootstrap"
import { UserContext } from "../UserContext"
import Loading from "../components/common/Loading"
const useStyles = makeStyles(
    {
        root: {
            position: "relative",
            minWidth: 275,
        },
        bullet: {
            display: "inline-block",
            margin: "0 2px",
            transform: "scale(0.8)",
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        accordionindicator: {
            position: "absolute",
            fontSize: 10,
        }

    }

)
export default function Assignment(props) {
    const classes = useStyles()
    const headers = {
        Authorization: `Bearer ${Cookie.get("jwt")}`,
        "Content-Type": "application/json",
        accept: "application/json",
      }
    const [assignment_title, setAssignment_Title] = useState()
    const [assignment_id, setAssignment_id] = useState()
    const [propject_department, setProject_department] = useState("")
    const [rubric, setRubric] = useState()
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isPreFetch, setIsPreFetch] = useState(false)
    const [search, setSearch] = useState("")
    const { user, setUser } = useContext(UserContext)
    let navigate = useNavigate()
    // const { user, setUser } = useContext(UserContext)
    const { id } = useParams()//user.id
    const { project_id } = useParams()//assignment_id
    const fetchData = useCallback(async () => {
        setIsPreFetch(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/assignments/${props.id}`,{headers})//props.id == user.id
        setAssignment_Title(data.assignment_title)
        setAssignment_id(data.assignment_id)
        var criterions = [];
        data.criterion.map((c, index) => {
            let idx = criterions.findIndex(item => item.criteria_id === c.criteria_id)
            if (idx !== -1) {//0
                criterions[idx].score.push(
                    {
                        name: c.criteria_detail,
                        value: c.criteria_score
                    }
                )
                criterions[idx].score.sort((a, b) => {
                    return a.value - b.value
                })
            } else {
                criterions.push(
                    {
                        criteria_id: c.criteria_id,
                        criteria_name: c.criteria_name,
                        score: [
                            {
                                name: c.criteria_detail,
                                value: c.criteria_score
                            }
                        ]
                    }
                )
            }
        })

        setRubric(criterions)
        setIsPreFetch(false)
    }, [])
    useEffect(() => {
        fetchData()
    }, [])
    const checkRole = useCallback(() => {
        if (user.role === "student") {
            alert(`You dont'have permission to go this page.`)
            navigate("/main")
        }
    })

    useEffect(() => {
        checkRole()
    }, [user])
    if (isPreFetch) {
        return <><Loading open={isPreFetch}/></>
    }

    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-12 my-3">
                        <BreadcrumbNavString
                            pastref="/assignments"
                            past="All Assignment"
                            current={`Assignment ${props.id}`}
                        />
                    </div>
                </div>


                <div className="row">
                    <div className="col">
                        <Card className={classes.root, "text-center"}>
                            <CardHeader title={`Assignment ${props.id} : ${assignment_title} `} />
                        </Card>
                        <Table striped bordered hover responsive="sm">
                            <tbody>
                                {rubric && rubric.map((data, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className='table-active' style={{ width: '20%' }}>{data.criteria_name}</td>
                                                {data.score.map((s, pos) => {
                                                    return (
                                                        <>
                                                            <td className="text-center table-light" style={{ width: '15%' }}>
                                                                {s.value}
                                                                <br />
                                                                {s.name}
                                                            </td>
                                                        </>
                                                    )
                                                })}
                                            </tr>
                                        </>

                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="col-12 mx-auto my-4">
                    <div className="row">
                        <div className="col-12 text-center">
                            <Link className="mr-2" to={`/editassignment/${props.id}`}>
                                <Buttons
                                    menu="Edit"
                                />
                            </Link>

                            <Buttons
                                menu="Delete"
                                color="secondary"
                                onClick={() => setIsOpenDelete(true)}
                            />
                            <ModalDeleteAssignment
                                isOpen={isOpenDelete}
                                setIsOpen={setIsOpenDelete}
                                header="Confirmation"
                                toDelete={assignment_id}
                            />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>
                                Submission:
                            </h4>
                        </div>
                        <Submission
                            id={props.id}
                        />
                    </div>
                </div>
            </div>



        </>
    )
}