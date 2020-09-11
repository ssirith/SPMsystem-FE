import React, { useState, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card } from "react-bootstrap"
import { Link } from "@reach/router"
import Buttons from "../components/common/Buttons"
import { CardHeader } from "@material-ui/core"
import axios from "axios"
import { useEffect } from "react"
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import ModalDeleteAssignment from "../components/common/ModalDeleteAssignment"
import Submission from "../components/common/Submission"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Table } from "react-bootstrap"
import Inputtext from "../components/common/Inputtext"
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
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
    const [assignment_title, setAssignment_Title] = useState()
    const [assignment_id, setAssignment_id] = useState()
    const [propject_department, setProject_department] = useState("")
    const [project_id, setProject_id] = useState("")
    const [rubric, setRubric] = useState()
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isPreFetch, setIsPreFetch] = useState(false)
    const [search, setSearch] = useState("")
    // const { user, setUser } = useContext(UserContext)
    const fetchData = useCallback(async () => {
        setIsPreFetch(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/assignments/${props.id}`)
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

    if (isPreFetch) {
        return <></>
    }

    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-12 my-3">
                        <BreadcrumbNavString
                            pastref="/Assignments"
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
                                                <td>{data.criteria_name}</td>
                                                {data.score.map((s, pos) => {
                                                    return (
                                                        <>
                                                            <td className="text-center">
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
                <div className="col-12 mx-auto">
                    <div className="row">
                        <div className="col-12 text-center">
                            <Link className="mr-2" to={`/editassignment/${props.id}`}>
                                <Buttons
                                    menu="Edit"
                                    color="primary"
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
                            Submission:
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