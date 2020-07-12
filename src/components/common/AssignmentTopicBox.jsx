import React, { useState, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card } from "react-bootstrap"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"
import axios from "axios"
import { useEffect } from "react"
import { Link, useParams } from "@reach/router"

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
    const classes = useStyles()
    return (
        <>
            <div>
                <Card className={classes.root}>
                    <CardHeader title={props.title} />
                    <Card.Body>
                        <Card.Text>
                            <div className="container col-12">
                                Assignment 1 : Feasibility student_id<br />
                                 By Siam Yamsaeng on February 26,2020
                        </div>
                        </Card.Text>
                    </Card.Body>
                    {/* <Card.Link href={`/projects/${props.groups.project_id}`} className='d-flex justify-content-end m-2'> */}
                    <Link to="/assignment" className='d-flex justify-content-end m-2'>
                        <Button size="small" color="primary">
                            More
                        </Button>
                    </Link>
                    {/* </Card.Link> */}
                </Card>
            </div>
        </>
    )
}
