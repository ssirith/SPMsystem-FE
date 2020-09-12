import React, { useState, useCallback, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card } from "react-bootstrap"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"
import { Link, useParams } from "@reach/router"
import { UserContext } from "../../UserContext"
import dayjs from "dayjs"
const useStyles = makeStyles({
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
})
export default function AssignmentTopicBox(props) {
    const { user, setUser } = useContext(UserContext)
    const classes = useStyles()
    function IsCheckFilter() {
        if (props.checkFilter === false) {
            return (
                <>
                    {props.assignments && props.assignments.map((data, index) => {

                        if (props.search.length !== 0) {
                            if (data.assignment_title.toLowerCase().startsWith(props.search.toLowerCase())) {
                                return (
                                    <div key={index}>
                                        <Card className={classes.root}>
                                            <CardHeader title={`Assignment ${data.assignment_id} `} />
                                            <Card.Body>
                                                <Card.Text>
                                                    <div className="container col-12 " style={{ 'fontSize': '20px' }}>

                                                        Assignment {data.assignment_id} : {data.assignment_title}<br />
                                                    By {data.teacher_name} on {` ${dayjs(data.due_date).format("MMMM DD, YYYY")}`}

                                                        <Link to={`/ assignments / ${data.assignment_id}`} className='d-flex justify-content-end m-2'>
                                                        <Button variant="contained" size="large" color="primary">
                                                                More
                                                        </Button>
                                                        </Link>
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <br />
                                    </div>
                                )
                            }
                            else {
                                return null
                            }
                        } else {
                            return (
                                <div key={index}>
                                    <Card className={classes.root}>
                                        <CardHeader title={`Assignment ${data.assignment_id} `} />
                                        <Card.Body>
                                            <Card.Text>
                                                <div className="container col-12" style={{ 'fontSize': '20px' }}>

                                                    Assignment {data.assignment_id} : {data.assignment_title}<br />
                                            By {data.teacher_name} on {` ${dayjs(data.due_date).format("MMMM DD, YYYY")}`}
                                                    <Link to={`/assignments/${data.assignment_id}`} className='d-flex justify-content-end m-2'>
                                                        <Button variant="contained" size="large" color="primary">
                                                            More
                                                </Button>
                                                    </Link>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </div>
                            )
                        }
                    })}
                </>
            )
        } else {
            return (
                <>
                    {props.assignments && props.assignments.map((data, index) => {
                        if (props.responsible.some(item => item.assignment_id === data.assignment_id)) {
                            if (props.search.length !== 0) {
                                if (data.assignment_title.toLowerCase().startsWith(props.search.toLowerCase())) {
                                    return (
                                        <div key={index}>
                                            <Card className={classes.root}>
                                                <CardHeader title={`Assignment ${data.assignment_id} `} />
                                                <Card.Body>
                                                    <Card.Text>
                                                        <div className="container col-12" style={{ 'fontSize': '20px' }}>
                                                            
                                                                Assignment {data.assignment_id} : {data.assignment_title}<br />
                                                    By {data.teacher_name} on {` ${dayjs(data.due_date).format("MMMM DD, YYYY")}`}
                                                            
                                                            <Link to={`/assignments/${data.assignment_id}`} className='d-flex justify-content-end m-2'>
                                                            <Button variant="contained" size="large" color="primary">
                                                                    More
                                                        </Button>
                                                            </Link>
                                                        </div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                            <br />
                                        </div>
                                    )
                                }
                                else {
                                    return null
                                }
                            } else {
                                return (
                                    <div key={index}>
                                        <Card className={classes.root}>
                                            <CardHeader title={`Assignment ${data.assignment_id} `} />
                                            <Card.Body>
                                                <Card.Text>
                                                    <div className="container col-12" style={{ 'fontSize': '20px' }}>
                                                    
                                                            Assignment {data.assignment_id} : {data.assignment_title}<br />
                                            By {data.teacher_name} on {` ${dayjs(data.due_date).format("MMMM DD, YYYY")}`}
                                                        
                                                        <Link to={`/assignments/${data.assignment_id}`} className='d-flex justify-content-end m-2'>
                                                        <Button variant="contained" size="large" color="primary">
                                                                More
                                                </Button>
                                                        </Link>
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <br />
                                    </div>
                                )
                            }
                        } else {
                            return <></>
                        }
                    }
                    )}
                </>
            )
        }
    }
    return (
        <>
            {IsCheckFilter()}
        </>
    )
}



