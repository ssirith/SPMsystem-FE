import React, { useState, useCallback, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card } from "react-bootstrap"
import CardContent from "@material-ui/core/CardContent"
import { UserContext } from "../../UserContext"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
export default function AssignmentTopicBox(props) {
    const { user, setUser } = useContext(UserContext)
    function checkRedio(e) { //true
        if (e) {
            props.setCheckFilter(true)
        } else {
            props.setCheckFilter(false)
        }
    }
    return (
        <>          
                    <Card style={{ width: '13rem' }}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <CardContent>
                            <RadioGroup aria-label="gender" name="gender1" defaultValue={"All Assignment"}>
                                <FormControlLabel value="All Assignment" control={<Radio />} label="All Assignment" onChange={() => checkRedio()} />
                                <FormControlLabel value="My Assignment" control={<Radio />} label="My Assignment" onChange={(e) => checkRedio(e)} />
                            </RadioGroup>
                        </CardContent>
                        </div>
                    </Card>
        </>
    )
}
