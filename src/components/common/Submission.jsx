import React, { useState, useCallback, useEffect } from "react"
import Cookie from 'js-cookie'
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "@reach/router"
import Buttons from "./Buttons"
import Inputtext from "./Inputtext"
import SendAssignmentTable from "./SendAssignmentTable"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Swal from 'sweetalert2'
function Submission(props) {
    const headers = {
        Authorization: `Bearer ${Cookie.get("jwt")}`,
        "Content-Type": "application/json",
        accept: "application/json",
    }
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();
    const [search, setSearch] = useState("")

    const [isPreFetch, setIsPreFetch] = useState(false)
    const [send_assignment, setSend_assignment] = useState([])
    const [checkFilterDepartment, setCheckFilterDepartment] = useState("All")
    const [score, setScore] = useState("")
    const fetchData = useCallback(
        async () => {
            try {
                setIsPreFetch(true)
                const res = await axios.get(`${process.env.REACT_APP_API_BE}/send_assignment/${props.id}`, { headers })
                setSend_assignment(res.data)
                setIsPreFetch(false)
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oop...',
                    text: 'Something went wrong, Please Try again.',
                  })
                console.log(err)
            }
        }, [])
    useEffect(() => {
        fetchData()
    }, [])
    function filterDepartment(value) {
        if (value === "SIT") {
            setCheckFilterDepartment("SIT")
        } else if (value === "IT") {
            setCheckFilterDepartment("IT")
        } else if (value === "CS") {
            setCheckFilterDepartment("CS")
        } else if (value === "DSI") {
            setCheckFilterDepartment("DSI")
        } else if (value === "All") {
            setCheckFilterDepartment("All")
        }
    }
    if (isPreFetch) {
        return <></>
    }

    return (
        <>
            <div className="container">
                <div class="row justify-content-end">
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="All Department">
                            <FormControlLabel
                                value="All Department"
                                control={<Radio color="primary" />}
                                label="All Department"
                                onClick={() => filterDepartment("All")}
                            />
                            <FormControlLabel
                                value="SIT"
                                control={<Radio color="primary" />}
                                label="SIT"
                                onClick={() => filterDepartment("SIT")}
                            />
                            <FormControlLabel
                                value="IT"
                                control={<Radio color="primary" />}
                                label="IT"
                                onClick={() => filterDepartment("IT")}
                            />
                            <FormControlLabel
                                value="CS"
                                control={<Radio color="primary" />}
                                label="CS"
                                onClick={() => filterDepartment("CS")}
                            />
                            <FormControlLabel
                                value="DSI"
                                control={<Radio color="primary" />}
                                label="DSI"
                                onClick={() => filterDepartment("DSI")}
                            />
                            <div className="col-4">
                                <Inputtext
                                    type="text"
                                    placeholder="Search by Project ID"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
                <br />
                <div>
                    <SendAssignmentTable
                        id={props.id}
                        checkFilterDepartment={checkFilterDepartment}
                        search={search}
                    />
                </div>
                <br />
                <div className="col-12 mx-auto my-4">
                    <div className="row">
                        <div className="col-12 text-center">
                            <Link className="mr-2" to={`/assignments`}>
                                <Buttons
                                    menu="Back"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Submission