import React, { useState, useCallback, useEffect, useContext } from "react"
import { Card } from "react-bootstrap"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from '@material-ui/pickers';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
export default function DueDate(props) {
    const classes = useStyles();
    return (
        <div className="row">
            <div className="col-5">
                <Card>
                    <Card.Body>
                        <form className={classes.container} noValidate>
                            <TextField
                                id={props.id}
                                type={props.type}
                                defaultValue={props.defaultValue}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={props.onChange}
                            />
                        </form>
                        
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}   