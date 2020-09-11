import React, { useState, useCallback, useEffect } from "react"
import axios from "axios"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Buttons from "./Buttons";

function SendAssignmentTable(props) {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();
    const [search, setSearch] = useState("")
    const [isPreFetch, setIsPreFetch] = useState(false)
    const [send_assignment, setSend_assignment] = useState()
    const [temp, setTemp] = useState()
    const [checkFilterDepartment, setCheckFilterDepartment] = useState("All")
    const [score, setScore] = useState("")
    const fetchData = useCallback(
        async () => {
            setIsPreFetch(true)
            const res = await axios.get(`${process.env.REACT_APP_API_BE}/send_assignment/${props.id}`)
            let tempSend = [];
            res.data.map(r => {
                {
                    r.project_id.length > 4 ? (
                        tempSend.push({
                            assignment_id: r.assignment_id,
                            project_department: r.project_department,
                            project_id: r.project_id.substring(0, 3) + "60-" + r.project_id.substring(r.project_id.length - 2, r.project_id.length),
                            status: r.status,
                            total_score: r.total_score
                        })
                        // data.project_id.substring(0, 3) + "60-" + data.project_id.substring(data.project_id.length - 2, data.project_id.length)
                    ) : (
                            tempSend.push({
                                assignment_id: r.assignment_id,
                                project_department: r.project_department,
                                project_id: r.project_id.substring(0, 2) + "60-" + r.project_id.substring(r.project_id.length - 2, r.project_id.length),
                                status: r.status,
                                total_score: r.total_score
                            })

                        )
                }
            })

            setSend_assignment(tempSend)
            setIsPreFetch(false)
        }, [])

    useEffect(() => {
        fetchData()
    }, [])
   
    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><h4>Project ID</h4></TableCell>
                            <TableCell align="center"><h4>Department</h4></TableCell>
                            <TableCell align="center"><h4>Status</h4></TableCell>
                            <TableCell align="center"><h4>Score</h4></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {send_assignment ? (
                            <>
                                {
                                    props.checkFilterDepartment && (<>
                                        {props.checkFilterDepartment === "All" ? (
                                            <>
                                                {send_assignment.map((data) => (
                                                    props.search.length !== 0 ?
                                                        (data.project_id.toLowerCase().startsWith(props.search.toLowerCase()) ? ( //data.project_id data.project_id.toLowerCase().startsWith(props.search.toLowerCase()) ?
                                                            <>
                                                                <TableRow key={data.id}>
                                                                    <TableCell component="th" scope="row" align="center">
                                                                        {data.project_id}
                                                                    </TableCell>
                                                                    {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                        data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                            data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                            )))}
                                                                    {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                    <TableCell align="center">{}</TableCell>
                                                                    <TableCell align="center">
                                                                        <Buttons
                                                                            menu={"Assesment"}
                                                                            color="primary"
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </>
                                                        ) : (<></>)

                                                        ) : (
                                                            <>
                                                                <TableRow key={data.id}>
                                                                    <TableCell component="th" scope="row" align="center">
                                                                        {data.project_id}
                                                                    </TableCell>
                                                                    {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                        data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                            data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                            )))}
                                                                    {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                    <TableCell align="center">{}</TableCell>
                                                                    <TableCell align="center">
                                                                        <Buttons
                                                                            menu={"Assesment"}
                                                                            color="primary"
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </>)

                                                ))}
                                            </>
                                        ) : (<></>)}

                                        {props.checkFilterDepartment === "CS" ? (
                                            <>
                                                {send_assignment.map((data) => (
                                                    data.project_department == "CS" ? (
                                                        props.search.length !== 0 ? (
                                                            data.project_id.toLowerCase().startsWith(props.search.toLowerCase()) ?
                                                                (<>
                                                                    <TableRow key={data.id}>
                                                                        <TableCell component="th" scope="row" align="center">
                                                                            {data.project_id}
                                                                        </TableCell>
                                                                        {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                            data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                                data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                    data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                                )))}
                                                                        {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                        <TableCell align="center">{}</TableCell>
                                                                        <TableCell align="center">
                                                                            <Buttons
                                                                                menu={"Assesment"}
                                                                                color="primary"
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>)
                                                                : (<></>)
                                                        ) : (<>
                                                            <TableRow key={data.id}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                    {data.project_id}
                                                                </TableCell>
                                                                {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                    data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                        data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                            data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                        )))}
                                                                {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                <TableCell align="center">{}</TableCell>
                                                                <TableCell align="center">
                                                                    <Buttons
                                                                        menu={"Assesment"}
                                                                        color="primary"
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        </>)
                                                    )
                                                        :
                                                        (<></>)
                                                ))}
                                            </>
                                        ) : (<></>)}

                                        {props.checkFilterDepartment === "SIT" ? (
                                            <>
                                                {send_assignment.map((data) => (
                                                    data.project_department == "SIT" ? (
                                                        props.search.length !== 0 ? (
                                                            data.project_id.toLowerCase().startsWith(props.search.toLowerCase()) ?
                                                                (<>
                                                                    <TableRow key={data.id}>
                                                                        <TableCell component="th" scope="row" align="center">
                                                                            {data.project_id}
                                                                        </TableCell>
                                                                        {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                            data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                                data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                    data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                                )))}
                                                                       {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                        <TableCell align="center">{}</TableCell>
                                                                        <TableCell align="center">
                                                                            <Buttons
                                                                                menu={"Assesment"}
                                                                                color="primary"
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>)
                                                                : (<></>)
                                                        ) : (<>
                                                            <TableRow key={data.id}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                    {data.project_id}
                                                                </TableCell>
                                                                {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                    data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                        data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                            data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                        )))}
                                                                {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                <TableCell align="center">{}</TableCell>
                                                                <TableCell align="center">
                                                                    <Buttons
                                                                        menu={"Assesment"}
                                                                        color="primary"
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        </>)
                                                    )
                                                        :
                                                        (<></>)
                                                ))}
                                            </>
                                        ) : (<></>)}

                                        {props.checkFilterDepartment === "IT" ? (
                                            <>
                                                {send_assignment.map((data) => (
                                                    data.project_department == "IT" ? (
                                                        props.search.length !== 0 ? (
                                                            data.project_id.toLowerCase().startsWith(props.search.toLowerCase()) ?
                                                                (<>
                                                                    <TableRow key={data.id}>
                                                                        <TableCell component="th" scope="row" align="center">
                                                                            {data.project_id}
                                                                        </TableCell>
                                                                        {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                            data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                                data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                    data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                                )))}
                                                                        {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                        <TableCell align="center">{}</TableCell>
                                                                        <TableCell align="center">
                                                                            <Buttons
                                                                                menu={"Assesment"}
                                                                                color="primary"
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>)
                                                                : (<></>)
                                                        ) : (<>
                                                            <TableRow key={data.id}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                    {data.project_id}
                                                                </TableCell>
                                                                {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                    data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                        data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                            data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                        )))}
                                                                {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                <TableCell align="center">{}</TableCell>
                                                                <TableCell align="center">
                                                                    <Buttons
                                                                        menu={"Assesment"}
                                                                        color="primary"
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        </>)
                                                    )
                                                        :
                                                        (<></>)
                                                ))}
                                            </>
                                        ) : (<></>)}

                                        {props.checkFilterDepartment === "DSI" ? (
                                            <>
                                                {send_assignment.map((data) => (
                                                    data.project_department == "DSI" ? (
                                                        props.search.length !== 0 ? (
                                                            data.project_id.toLowerCase().startsWith(props.search.toLowerCase()) ?
                                                                (<>
                                                                    <TableRow key={data.id}>
                                                                        <TableCell component="th" scope="row" align="center">
                                                                            {data.project_id}
                                                                        </TableCell>
                                                                        {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                            data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                                data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                    data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                                )))}
                                                                       {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                        <TableCell align="center">{}</TableCell>
                                                                        <TableCell align="center">
                                                                            <Buttons
                                                                                menu={"Assesment"}
                                                                                color="primary"
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>)
                                                                : (<></>)
                                                        ) : (<>
                                                            <TableRow key={data.id}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                    {data.project_id}
                                                                </TableCell>
                                                                {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                    data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                        data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                            data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                        )))}
                                                                {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon color="primary" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                        data.status === "SubmittedLate" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                <TableCell align="center">{}</TableCell>
                                                                <TableCell align="center">
                                                                    <Buttons
                                                                        menu={"Assesment"}
                                                                        color="primary"
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        </>)
                                                    )
                                                        :
                                                        (<></>)
                                                ))}
                                            </>
                                        ) : (<></>)}

                                    </>)
                                }
                            </>
                        ) : (<></>)}


                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
}
export default SendAssignmentTable
