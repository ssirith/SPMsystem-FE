import React, { useState, useEffect, useCallback, useContext } from "react"
import Inputtext from "./Inputtext"
import { Table } from "react-bootstrap"
import Buttons from "./Buttons"
import { Link } from "@reach/router"
export default function CreateRubric() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-10 my-3">
                        TiTle:
                        <Inputtext
                            id="rubrictitle"
                            label="Rubric Title"
                            defaultValue={""}
                            onChange={""}
                        />
                    </div>
                </div>
                {/*Table*/}
                <div className="row">
                    <div className="col-20">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Criterion</th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td>Criterion 1</td>
                                        <td>
                                        <div className="col-13 ">
                                            <Inputtext
                                                id="rubricscore"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                            <div className="col-13  ">
                                            <Inputtext
                                                id="rubricdrescription"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                        </td>
                                        <td>
                                        <div className="col-13  ">
                                            <Inputtext
                                                id="rubricscore"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                            <div className="col-13  ">
                                            <Inputtext
                                                id="rubricdrescription"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                        </td>
                                        <td>
                                        <div className="col-13  ">
                                            <Inputtext
                                                id="rubricscore"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                            <div className="col-13  ">
                                            <Inputtext
                                                id="rubricdrescription"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                        </td>
                                        <td>
                                        <div className="col-13 ">
                                            <Inputtext
                                                id="rubricscore"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                            <div className="col-13 ">
                                            <Inputtext
                                                id="rubricdrescription"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                        </td>
                                        <td>
                                        <div className="col-13  ">
                                            <Inputtext
                                                id="rubricscore"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                            <div className="col-13 ">
                                            <Inputtext
                                                id="rubricdrescription"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                        </td>
                                        <td>
                                        <div className="col-13 ">
                                            <Inputtext
                                                id="rubricscore"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                            <div className="col-13  ">
                                            <Inputtext
                                                id="rubricdrescription"
                                                
                                                defaultValue={""}
                                                onChange={""}
                                            />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </thead>
                        </Table>
                    </div>
                </div>
                <div className="container text-center my-auto">
                <Link to="">
                      <Buttons
                        menu="Save"
                        color="primary"
                        onClick={() => console.log("Create")}
                      />
                    </Link>
                </div>
            </div>
        </>
    )
}