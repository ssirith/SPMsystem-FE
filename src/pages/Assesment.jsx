import React, { useState, useCallback, useEffect, useContext } from "react"
import BreadcrumbNavStrings from "../components/common/BreadcrumbNavString"
import { Link, useParams,useNavigate } from "@reach/router"
import Buttons from "../components/common/Buttons"
import axios from "axios"
import Inputtext from "../components/common/Inputtext"
import { UserContext } from "../UserContext"
import { Card } from "react-bootstrap"
import { CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

export default function Assesment(props) {
    const { user, setUser } = useContext(UserContext)
    const { id } = useParams()
    let navigate = useNavigate()
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
    const classes = useStyles()
    const fetchData = useCallback(async () => {

    }, [])
    useEffect(() => {
        fetchData()
    }, [])
    const checkRole = useCallback(() => {
        if (user.role === "student") {
          alert(`You dont'have permission to go this page.`)
          navigate("/")
        }
      })
    
      useEffect(() => {
        checkRole()
      }, [user])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 my-3">
                        <BreadcrumbNavStrings
                            pastref="/assignments"
                            past="All Assignment"
                            pastsref={`/assignments/${props.id}`}
                            pasts={`Assignment ${props.id}`}
                            current="Assesment"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12  text-center">
                        <Card className={classes.root}>
                            <CardHeader
                            title={`Assignment ${props.id} : Test 1 -> SITXX-XX`}
                            />
                        </Card>
                    </div>
                </div>
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            Students Assignment
                        </div>
                    </div>
                </div>             
            </div>
        </>
    )
}
