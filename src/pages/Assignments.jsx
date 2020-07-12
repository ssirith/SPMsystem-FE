import React, { useState, useCallback, useEffect, useContext } from "react"
import BreadcrumbNav from "../components/common/BreadcrumbNav"
import { Link, useParams } from "@reach/router"
import Boxitem from "../components/common/Boxitem"
import Membersbox from "../components/common/Membersbox"
import Topicbox from "../components/common/Topicbox"
import Button from "../components/common/Buttons"
import Buttons from "../components/common/Buttons"
import axios from "axios"
import Inputtext from "../components/common/Inputtext"
import AssignmentTopicBox from "../components/common/AssignmentTopicBox"
import FilterAssignmentBox from "../components/common/FilterAssignmentBox"
import MyteamAdvisor from "../components/common/MyteamAdvisor"
import { UserContext } from "../UserContext"

export default function Assignments() {
    const [search, setSearch] = useState("")
    return (
        <div className="container">
            <div className="row">

                <div className="col-12 my-3">
                    <div className="row">
                        <div className="col-8">
                            <Inputtext
                                type="text"
                                placeholder="Search Assignment Topic"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Link to="/createassignment">
                            <div className="col-10">
                                <br />
                                <Buttons
                                    menu="Create Assignment"
                                    color="primary"
                                    onClick={() => console.log("Create Assignment")}
                                />
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="col-12 my-3">
                    <div className="row">
                        <div className="col-8">
                            <AssignmentTopicBox title="Assignment 1" assignment={""} />  {/*ค่าที่จะmap*/}
                        </div>
                        <div className="col-3">
                            <FilterAssignmentBox filter={""} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
