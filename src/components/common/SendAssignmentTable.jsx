import React, { useState, useCallback, useEffect, useContext } from "react"
import Cookie from 'js-cookie'
import { UserContext } from "../../UserContext"
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
import { Link } from "@reach/router";
import Swal from 'sweetalert2'

function SendAssignmentTable(props) {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const headers = {
        Authorization: `Bearer ${Cookie.get("jwt")}`,
        "Content-Type": "application/json",
        accept: "application/json",
    }
    const classes = useStyles();
    const [isPreFetch, setIsPreFetch] = useState(false)
    const [permission, setPermission] = useState("")
    const [send_assignment, setSend_assignment] = useState()
    const { user, setUser } = useContext(UserContext)
    //     const userBeforeParse=JSON.parse(localStorage.getItem('user'))
    //   const  [user, setUser ] = useState(userBeforeParse)
    const fetchData = useCallback(
        async () => {
            try {
                setIsPreFetch(true)
                const res = await axios.get(`${process.env.REACT_APP_API_BE}/send_assignment/${props.id}/teacher/${user.user_id}`, { headers })
                let tempSend = [];
                res.data.submission.map(r => {
                    {
                        r.project_id.length > 4 ? (
                            tempSend.push({
                                assignment_id: r.assignment_id,
                                project_department: r.project_department,
                                project_id: r.project_id.substring(0, 3) + "60-" + r.project_id.substring(r.project_id.length - 2, r.project_id.length),
                                project_id_BE: r.project_id,
                                status: r.status,
                                total_score: r.total_score,
                                permission: r.permission
                            })
                        ) : (
                                tempSend.push({
                                    assignment_id: r.assignment_id,
                                    project_department: r.project_department,
                                    project_id: r.project_id.substring(0, 2) + "60-" + r.project_id.substring(r.project_id.length - 2, r.project_id.length),
                                    project_id_BE: r.project_id,
                                    status: r.status,
                                    total_score: r.total_score,
                                    permission: r.permission
                                })

                            )
                    }
                })

                setPermission(res.data.permission)
                setSend_assignment(tempSend)
                setIsPreFetch(false)
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oop...',
                    text: 'Something went wrong, Please Try again later.',
                  })
                // console.log(err)
            }
        }, [])
    // console.log(send_assignment)
    // console.log(user.user_id)
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table" >
                    <TableHead>
                        <TableRow style={{ background: "#989898" }}>
                            <TableCell align="center"><h4 className="my-2">Project ID</h4></TableCell>
                            <TableCell align="center"><h4 className="my-2">Department</h4></TableCell>
                            <TableCell align="center"><h4 className="my-2">Status</h4></TableCell>
                            <TableCell align="center"><h4 className="my-2">Score</h4></TableCell>
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
                                                                <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                    <TableCell component="th" scope="row" align="center">
                                                                        {data.project_id}
                                                                    </TableCell>
                                                                    {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                        data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                            data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                            )))}
                                                                    {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                            data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}

                                                                    {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                    <TableCell align="center">
                                                                        {user && user.user_type === "Teacher" ? (
                                                                            permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                                <Buttons
                                                                                    menu={"Assesment"}
                                                                                    color="primary"
                                                                                />
                                                                            </Link>) : (<></>)
                                                                        ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                            menu={"View"}
                                                                            color="primary"
                                                                        /></Link>)}
                                                                    </TableCell>
                                                                </TableRow>
                                                            </>
                                                        ) : (<></>)

                                                        ) : (
                                                            <>
                                                                <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                    <TableCell component="th" scope="row" align="center">
                                                                        {data.project_id}
                                                                    </TableCell>
                                                                    {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                        data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                            data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                            )))}
                                                                    {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                    ) : (
                                                                            data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                    {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                    <TableCell align="center">
                                                                        {user && user.user_type === "Teacher" ? (
                                                                            permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                                <Buttons
                                                                                    menu={"Assesment"}
                                                                                    color="primary"
                                                                                />
                                                                            </Link>) : (<></>)
                                                                        ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                            menu={"View"}
                                                                            color="primary"
                                                                        /></Link>)}
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
                                                                    <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                        <TableCell component="th" scope="row" align="center">
                                                                            {data.project_id}
                                                                        </TableCell>
                                                                        {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                            data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                                data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                    data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                                )))}
                                                                        {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                        ) : (
                                                                                data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                        {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                        <TableCell align="center">
                                                                            {user && user.user_type === "Teacher" ? (
                                                                                permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                                    <Buttons
                                                                                        menu={"Assesment"}
                                                                                        color="primary"
                                                                                    />
                                                                                </Link>) : (<></>)
                                                                            ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                                menu={"View"}
                                                                                color="primary"
                                                                            /></Link>)}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>)
                                                                : (<></>)
                                                        ) : (<>
                                                            <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                    {data.project_id}
                                                                </TableCell>
                                                                {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                    data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                        data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                            data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                        )))}
                                                                {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                ) : (
                                                                        data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                <TableCell align="center">
                                                                    {user && user.user_type === "Teacher" ? (
                                                                        permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                            <Buttons
                                                                                menu={"Assesment"}
                                                                                color="primary"
                                                                            />
                                                                        </Link>) : (<></>)
                                                                    ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                        menu={"View"}
                                                                        color="primary"
                                                                    /></Link>)}
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
                                                                    <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                        <TableCell component="th" scope="row" align="center">
                                                                            {data.project_id}
                                                                        </TableCell>
                                                                        {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                            data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                                data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                    data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                                )))}
                                                                        {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                        ) : (
                                                                                data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                        {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                        <TableCell align="center">
                                                                            {user && user.user_type === "Teacher" ? (
                                                                                permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                                    <Buttons
                                                                                        menu={"Assesment"}
                                                                                        color="primary"
                                                                                    />
                                                                                </Link>) : (<></>)
                                                                            ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                                menu={"View"}
                                                                                color="primary"
                                                                            /></Link>)}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>)
                                                                : (<></>)
                                                        ) : (<>
                                                            <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                    {data.project_id}
                                                                </TableCell>
                                                                {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                    data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                        data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                            data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                        )))}
                                                                {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                ) : (
                                                                        data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                <TableCell align="center">
                                                                    {user && user.user_type === "Teacher" ? (
                                                                        permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                            <Buttons
                                                                                menu={"Assesment"}
                                                                                color="primary"
                                                                            />
                                                                        </Link>) : (<></>)
                                                                    ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                        menu={"View"}
                                                                        color="primary"
                                                                    /></Link>)}
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
                                                                    <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                        <TableCell component="th" scope="row" align="center">
                                                                            {data.project_id}
                                                                        </TableCell>
                                                                        {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                            data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                                data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                    data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                                )))}
                                                                        {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                        ) : (
                                                                                data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                        {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                        <TableCell align="center">
                                                                            {user && user.user_type === "Teacher" ? (
                                                                                permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                                    <Buttons
                                                                                        menu={"Assesment"}
                                                                                        color="primary"
                                                                                    />
                                                                                </Link>) : (<></>)
                                                                            ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                                menu={"View"}
                                                                                color="primary"
                                                                            /></Link>)}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>)
                                                                : (<></>)
                                                        ) : (<>
                                                            <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                    {data.project_id}
                                                                </TableCell>
                                                                {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                    data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                        data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                            data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                        )))}
                                                                {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                ) : (
                                                                        data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                <TableCell align="center">
                                                                    {user && user.user_type === "Teacher" ? (
                                                                        permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                            <Buttons
                                                                                menu={"Assesment"}
                                                                                color="primary"
                                                                            />
                                                                        </Link>) : (<></>)
                                                                    ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                        menu={"View"}
                                                                        color="primary"
                                                                    /></Link>)}
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
                                                                    <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                        <TableCell component="th" scope="row" align="center">
                                                                            {data.project_id}
                                                                        </TableCell>
                                                                        {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                            data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                                data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                                    data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                                )))}
                                                                        {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                        ) : (
                                                                                data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                        {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                        <TableCell align="center">
                                                                            {user && user.user_type === "Teacher" ? (
                                                                                permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                                    <Buttons
                                                                                        menu={"Assesment"}
                                                                                        color="primary"
                                                                                    />
                                                                                </Link>) : (<></>)
                                                                            ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                                menu={"View"}
                                                                                color="primary"
                                                                            /></Link>)}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>)
                                                                : (<></>)
                                                        ) : (<>
                                                            <TableRow key={data.id} style={{ background: "#DCDCDC" }}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                    {data.project_id}
                                                                </TableCell>
                                                                {data.project_department === "IT" ? (<TableCell align="center">{"Information Technology"}</TableCell>) : (
                                                                    data.project_department === "CS" ? (<TableCell align="center">{"Computer Science"}</TableCell>) : (
                                                                        data.project_department === "SIT" ? (<TableCell align="center">{"School of Information Technology"}</TableCell>) : (
                                                                            data.project_department === "DSI" ? (<TableCell align="center">{"Digital Service Innovation"}</TableCell>) : (<></>)
                                                                        )))}
                                                                {data.status === "Submitted" ? (<TableCell align="center"><FiberManualRecordIcon className="successStatus" /><medium className="d-inline">On time</medium></TableCell>
                                                                ) : (
                                                                        data.status === "Submitted Late" ? (<TableCell align="center"><FiberManualRecordIcon color="secondary" /><medium className="d-inline">Late</medium></TableCell>) : (<></>))}
                                                                {data.total_score !== null ? (<TableCell align="center">{data.total_score}</TableCell>) : (<TableCell align="center">-</TableCell>)}
                                                                <TableCell align="center">
                                                                    {user && user.user_type === "Teacher" ? (
                                                                        permission === "Have Permission" ? (<Link to={`/send_assignment/${data.assignment_id}/teacher/${data.project_id_BE}`}>
                                                                            <Buttons
                                                                                menu={"Assesment"}
                                                                                color="primary"
                                                                            />
                                                                        </Link>) : (<></>)
                                                                    ) : (<Link to={`/assesment/${data.assignment_id}/${data.project_id_BE}`}><Buttons
                                                                        menu={"View"}
                                                                        color="primary"
                                                                    /></Link>)}
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
