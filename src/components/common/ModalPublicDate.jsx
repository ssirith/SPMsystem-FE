import React, { useState, useCallback, useEffect, useContext } from "react"
import { Card } from "react-bootstrap"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
export default function ModalPublicDate() {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
   
    const classes = useStyles();
    return (
        <div className="row">
            <div className="col-5">
                <Card>
                    <Card.Body>
                        {/* <Calendar onChange={showDate} value={date} />
                        {date.toString()} */}
                        <form className={classes.container} noValidate>
                            <TextField
                                id="date"
                                // label="Public Date:"
                                type="date"
                                defaultValue="YYYY-MM-DD"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}   