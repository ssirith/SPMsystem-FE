import React, { useState, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card } from "react-bootstrap"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"
import axios from "axios"
import { useEffect } from "react"
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import Inputtext from "../components/common/Inputtext"
import { Table } from "react-bootstrap"
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
export default function Assignment() {
    const classes = useStyles()
    return (
        <>
            <div className="container">

                <div className="row">
                    <div className="col-12 my-3">
                        <BreadcrumbNavString
                            pastref="/Assignments"
                            past="All Assignment"
                            current="Assignment 1" /*Assignment ID */
                        />
                    </div>
                </div>

                <div className="col-12 my-3">
                    <div className="row">
                        <div className="col-12  text-center">
                            <Card className={classes.root}>
                                <CardHeader title={"Assignment 1 : Feasibility"} />
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>

                                        <td>Criterion 1</td>
                                        <td>
                                            <div className="col-5">
                                                <Inputtext
                                                    id="rubricscore"
                                                    defaultValue={""}
                                                    onChange={""}
                                                />
                                            </div>
                                            <div className="col-5">
                                                <Inputtext
                                                    id="rubricdrescription"
                                                    defaultValue={""}
                                                    onChange={""}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                            </Table>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            Submission:
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div class="row justify-content-end">

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
                            <label class="form-check-label" for="exampleRadios1">
                                All Department
                        </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
                            <label class="form-check-label" for="exampleRadios1">
                                SIT
                        </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
                            <label class="form-check-label" for="exampleRadios1">
                                IT
                        </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
                            <label class="form-check-label" for="exampleRadios1">
                                CS
                        </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
                            <label class="form-check-label" for="exampleRadios1">
                                DSI
                        </label>
                        </div>
                        
        
                    </div>
                </div>

            </div>
        </>
    )
}