import React, { useState, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {Card} from "react-bootstrap"
import CardContent from "@material-ui/core/CardContent"
import Buttons from "./Buttons"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"
import axios from "axios"
import { useEffect } from "react"


export default function AssignmentTopicBox(props) {
    return (
        <>
            <div>
                <Card>
                <CardContent>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
                        <label class="form-check-label" for="exampleRadios1">
                            All Assignment
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"></input>
                        <label class="form-check-label" for="exampleRadios2">
                            My Assignment
                        </label>
                    </div>
                </CardContent>
                </Card>
            </div>
        </>
    )
}
