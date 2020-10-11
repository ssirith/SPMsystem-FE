import React, { useState, useEffect, useCallback, useContext } from "react"
import Cookie from 'js-cookie'
import Inputtext from "../components/common/Inputtext"
import { Table } from "react-bootstrap"
import Buttons from "../components/common/Buttons"
import BreadcrumbNavString from "../components/common/BreadcrumbNavString"
import axios from "axios"
import { Link, useNavigate } from "@reach/router"
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Container, Row, Col } from 'reactstrap';
import { UserContext } from "../UserContext"
export default function CreateRubric() {
	const headers = {
		Authorization: `Bearer ${Cookie.get("jwt")}`,
		"Content-Type": "application/json",
		accept: "application/json",
	  }
	const { user, setUser } = useContext(UserContext)
	let navigate = useNavigate()
	const [rubricTitle, setRubricTitle] = useState()
	const handleRubricTitle = (event) => {
		setRubricTitle(event.target.value)
	}
	const [criterions, setCriterions] = useState([
		{ criteria_name: "", criteria_detail: [{ name: "", value: null }] }
	])
	function handleCriteriaName(event, index) {
		criterions[index].criteria_name = event.target.value
	}

	const handleScoreName = (criteria_detail, event, index) => {
		if (event !== "") {
			criteria_detail.name = event.target.value
		}
	}

	const handleScoreValue = (criteria_detail, event, index) => {
		if (event !== null) {
			criteria_detail.value = parseInt(event.target.value)
		}
	}

	useEffect(() => {

	}, [criterions])
	function addTable() {
		//สร้างตารางใหม่
		setCriterions([...criterions, { criteria_name: "", criteria_detail: [{ name: "", value: null }] }])

	}
	const checkRole = useCallback(() => {
		if (user.role === "student" ) {
		  alert(`You dont'have permission to go this page.`)
		  navigate("/main")
		}
	  })
	
	  useEffect(() => {
		checkRole()
	  }, [user])
	  
	function addDetailScore(index) {
		let newCriterions = [...criterions]
		for (let i = 0; i < newCriterions.length; i++) {
			if (index === i) {
				newCriterions[i].criteria_detail.push({ name: "", value: null })
			}
		}
		setCriterions(newCriterions)
	}

	function removeDetailScore(index, pos) {
		let newCriterions = [...criterions]
		for (let i = 0; i < newCriterions.length; i++) {
			if (index === i) {
				for (let p = 0; p < newCriterions[i].criteria_detail.length; p++) {
					if (p === pos) {
						newCriterions[i].criteria_detail.splice(p, 1)
					}
				}
			}
		}
		setCriterions(newCriterions)
	}

	function handleRemove(event,data, index) {
		let newCriterions = [...criterions]
		for (let i = 0; i < newCriterions.length; i++) {
			if(index === i){
				newCriterions.splice(i,1)
			}
			
		}
		setCriterions(newCriterions)
	}

	function checkInput() {
		let noti = false;
		criterions.map((c) => {
			c.criteria_detail.map((t) => {
				if ((t.name == "" || t.value == null) || (typeof t.value === 'string')) {
					noti = true
				}
			})
		})
		return noti;

	}
	
	const handleSubmit = async (event) => {

		const rubric_title = rubricTitle;
		const data = {
			rubric_title,
			criterions
		}
		console.log(data)
		if (checkInput()) {
			alert("It's not success, Please check your input !!!")	
		} else {
			try {
				const response = await axios.post(`${process.env.REACT_APP_API_BE}/rubric`, data,{headers})
				if (response.status === 200) {
					alert("Create Success.")
					navigate("/createassignment")

				}
			} catch (err) {
				alert("It's not success, Please check your input")
				console.error(err)
			}
		}

	}
console.log(criterions)

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-12 my-3">
						<BreadcrumbNavString
							pastref="/createassignment"
							past="Create Assignment"
							current="Create Rubric"
						/>
					</div>
				</div>

				<Row style={{ alignItems: "center" }}>
					<Col sm={1}>
						TiTle:
					</Col>
					<Col sm={8}>
						<Inputtext
							id="rubrictitle"
							label="Rubric Title"
							defaultValue={""}
							onChange={(event) => handleRubricTitle(event)}
						/>
					</Col>
				</Row>
				<br />
				{criterions && criterions.map((data, index) => {
					return (
						<>
							<div key={index}>
								<Row style={{ alignItems: "center", marginLeft: 3 }}>
									<Col sm={3.5}>
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>Criterion</th>
												</tr>
												<tbody>
													<tr>
														<td>
															<div className="col-13 text-center">
																<Inputtext
																	id={index}
																	onChange={(event) => handleCriteriaName(event, index)}
																	label={"Criterion Name"}
																/>

															</div>


														</td>
														{data.criteria_detail.map((criteria_detail, pos) => {
															return (
																<td>
																	<div key={index}>
																		<td>
																			<div className="col-13 ">
																				<Inputtext
																					id={criteria_detail.criteria_score_id}
																					onChange={(event) => handleScoreValue(criteria_detail, event, index)}
																					label={"Score"}

																				/>
																			</div>
																			<div className="col-15">
																				<Inputtext
																					id={criteria_detail.criteria_detail_id}
																					onChange={(event) => handleScoreName(criteria_detail, event, index)}
																					label={"Detail"}
																				/>
																			</div>
																			<br />
																			<div className="col-13 text-center">
																				<button onClick={() => removeDetailScore(index, pos)}>
																					<RemoveIcon fontSize="large" color="secondary" />
																				</button>

																			</div>
																		</td>
																	</div>
																</td>
															)
														})}
														<td className="text-center">
															<br />
															<br />
															<br />
															<Col>
																<button onClick={() => addDetailScore(index)}>
																	<AddIcon fontSize="large" style={{ color: green[500] }} />
																</button>
															</Col>
														</td>
													</tr>
												</tbody>
											</thead>
										</Table>
										<Buttons
											menu="Delete Criterion"
											color="secondary"
											onClick={(event) => handleRemove(event,data, index)}
										/>
									</Col>
								</Row>
							</div>
							<br />
							<hr />
						</>
					)
				})}
				<Row >
					<Col sm={3} style={{ marginLeft: 5 }}>
						<Buttons
							menu="Add Criterion"
							color="primary"
							onClick={() => addTable()}
						/>
					</Col>
				</Row>

				<br />
				<br />
				<br />
				<br />
				<hr style={{
					color: '#C8C8C8',
					backgroundColor: '#C8C8C8',
					height: .5,
					borderColor: '#C8C8C8'
				}} />
				<div className="col-12 mx-auto">
					<div className="row">
						<div className="col-12 text-center">
							<Link className="mr-2" to={`/createassignment`}>
								<Buttons
									menu="Cancel"
									color="secondary"
								/>
							</Link>
							<Buttons
								menu="Save"
								color="primary"
								onClick={(event) => handleSubmit(event)}
							/>
						</div>
					</div>
				</div>
				{/* </div> */}
			</div>
		</>
	)
}
