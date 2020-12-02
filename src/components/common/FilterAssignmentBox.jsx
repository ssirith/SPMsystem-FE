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
    // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
    // const  [user, setUser ] = useState(userBeforeParse)
    const [value, setValue] = useState('All Assignment');
    function checkRedio(e) { //true
        if (e) {
            props.setCheckFilter(true)
        } else {
            props.setCheckFilter(false)
        }
    }
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <>
            <Card style={{ width: '13rem' }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CardContent>
                        <RadioGroup aria-label="filter" name="filter" value={value} onChange={handleChange}>
                            {value === 'All Assignment' ? (
                                <>
                                    <FormControlLabel value="All Assignment" control={<Radio color={"primary"} />} label={<span style={{ fontWeight: 'bold' }}>All Assignment</span>} onChange={() => checkRedio()} />
                                    <FormControlLabel value="My Assignment" control={<Radio color={"primary"} />} label="My Assignment" onChange={(e) => checkRedio(e)} />
                                </>
                            ) : (
                                <>
                                    <FormControlLabel value="All Assignment" control={<Radio color={"primary"} />} label="All Assignment" onChange={() => checkRedio()} />
                                    <FormControlLabel value="My Assignment" control={<Radio color={"primary"} />} label={<span style={{ fontWeight: 'bold' }}>My Assignment</span>} onChange={(e) => checkRedio(e)} />
                                </>
                            )}

                        </RadioGroup>
                    </CardContent>
                </div>
            </Card>
        </>
    )
}
