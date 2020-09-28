import React, { useState, useEffect, useCallback, useContext } from "react"
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
export default function EditRubric(props) {
	let navigate = useNavigate()
	const { user, setUser } = useContext(UserContext)

	const [isPreFetch, setIsPreFetch] = useState(false)
	const [rubricTitle, setRubricTitle] = useState("")
	const [rubric, setRubric] = useState()
	const [criterions, setCriterions] = useState()
	const [realCriterions, setRealCriterions] = useState()
	const [delete_criteria, setDelete_criteria] = useState([])
	const [delete_criteria_deteail, setDelete_criteria_deteail] = useState([])
	const [create_criterions, setCreate_criterions] = useState([])
	const handleRubricTitle = (event) => {
		setRubricTitle(event.target.value)
	}

	const fetchData = useCallback(
		async () => {
			setIsPreFetch(true)
			const { data } = await axios.get(`${process.env.REACT_APP_API_BE}/rubric/${props.id}`)
			setRubricTitle(data.rubric_title)
			var criterions = [];
			data.criterions.map((c, index) => {
				let idx = criterions.findIndex(item => item.criteria_id === c.criteria_id)
				if (idx !== -1) {
					criterions[idx].criteria_detail.push({
						criteria_detail_id: c.criteria_detail_id,
						name: c.criteria_detail,
						value: c.criteria_score
					}
					)
				} else {
					criterions.push(
						{
							criteria_id: c.criteria_id,
							criteria_name: c.criteria_name,
							delete_criteria_deteail: [],
							criteria_detail: [
								{
									criteria_detail_id: c.criteria_detail_id,
									name: c.criteria_detail,
									value: c.criteria_score
								}
							]
						}
					)
				}
			})

			var realCriterions = [];
			data.criterions.map((c, index) => {
				let idx = realCriterions.findIndex(item => item.criteria_id === c.criteria_id)
				if (idx !== -1) {
					realCriterions[idx].criteria_detail.push({
						criteria_detail_id: c.criteria_detail_id,
						name: c.criteria_detail,
						value: c.criteria_score
					}
					)
				} else {
					realCriterions.push(
						{
							criteria_id: c.criteria_id,
							criteria_name: c.criteria_name,
							delete_criteria_deteail: [],
							criteria_detail: [
								{
									criteria_detail_id: c.criteria_detail_id,
									name: c.criteria_detail,
									value: c.criteria_score
								}
							]
						}
					)
				}
			})

			setCriterions(criterions)
			setRealCriterions(realCriterions)
			setIsPreFetch(false)
		},
		[],
	)
	useEffect(() => {
		fetchData()
	}, [])

	const checkRole = useCallback(() => {
		if (user.role === "student") {
		  alert(`You dont'have permission to go this page.`)
		  navigate("/")
		}
	  })
	
	  useEffect(() => {
		checkRole()
	  }, [user])

	function handleCriteriaName(event, index) {//type number
		criterions[index].criteria_name = event.target.value
	}

	const handleScoreName = (criteria_detail, event, index) => {
		criteria_detail.name = event.target.value

	}

	const handleScoreValue = (criteria_detail, event, index) => {
		criteria_detail.value = parseInt(event.target.value)
	}

	function addTable() {
		setCriterions([...criterions, { criteria_name: "", criteria_detail: [{ name: "", value: null }] }])
	}

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
		const temp = []
		let newCriterions = [...criterions]
		for (let i = 0; i < newCriterions.length; i++) {
			if (index === i) {
				for (let p = 0; p < newCriterions[i].criteria_detail.length; p++) {
					if (p === pos) {
						newCriterions[i].criteria_detail.splice(p, 1)
						temp.push(realCriterions[i].criteria_detail[p].criteria_detail_id)
						newCriterions[i].delete_criteria_deteail.push(...temp)
					}
				}
			}

		}
		setCriterions(newCriterions)
		console.log(criterions)
	}

	function handleRemoveTable(data, index) {
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
				if (t.name == "" || t.value == null) { // ค่าช่องใดช่องหนึ่งมีค่า input ((t.name !== "" && t.value !== null) && (t.name === "" || t.value === null))
					noti = true
				}
			})
		})
		return noti;

	}

	const handleSubmit = async () => {
		const rubric_title = rubricTitle;
		const rubric_id = parseInt(props.id)
		let edit_criterions = [...criterions]
		let create_criterions = []
		criterions.map((c, index) => {
			if (c.criteria_id === undefined) {
				create_criterions.push(c)
				edit_criterions.splice(index)
			}
		})
		const data = {
			rubric_id,
			rubric_title,
			delete_criteria,
			edit_criterions,
			create_criterions
		}
		if (checkInput()) {
			alert("It's not success, Please check your input !!!")

		} else {
			try {
				const response = await axios.post(`${process.env.REACT_APP_API_BE}/rubric/edit`, data)
				if (response.status === 200) {
					alert("Edit Success.")
					navigate("/createassignment")
					console.log(data)
					window.location.reload()
				}
			} catch (err) {
				alert("It's not success, Please check your input")
				console.error(err)
				console.log(data)
			}

		}
	}
	return (
		<>
			<div className="container">

				<div className="row">
					<div className="col-12 my-3">
						<BreadcrumbNavString
							pastref="/createassignment"
							past="Create Assignment"
							current="Edit Rubric"
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
							label={rubricTitle}
							defaultValue={rubricTitle}
							onChange={(event) => handleRubricTitle(event)}
						/>
					</Col>
				</Row>
				<br />
				{/* TiTle:
							<Inputtext
							id="rubrictitle"
							label={rubricTitle}
							defaultValue={rubricTitle}
							onChange={(event) => handleRubricTitle(event)}
						/> */}


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
																	id={`criteria_name${data.criteria_id}`}
																	defaultValue={data.criteria_name}
																	onChange={(event) => handleCriteriaName(event, index)}
																	label={"Criterion Name"}
																/>

															</div>
															{/* <div className="col-13 text-center">
																	<Buttons
																		menu="Add Deatil and Score"
																		color="primary"
																		onClick={() => addDetailScore(index)}
																	/>
																</div> */}

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
																					defaultValue={criteria_detail.value}
																				/>

																			</div>
																			<div className="col-15">

																				<Inputtext
																					id={criteria_detail.criteria_detail_id}
																					onChange={(event) => handleScoreName(criteria_detail, event, index)}
																					label={"Detail"}
																					defaultValue={criteria_detail.name}
																				/>
																			</div>
																			<br />
																			<div className="col-13 text-center">
																				<button onClick={() => removeDetailScore(index, pos)}>
																					<RemoveIcon fontSize="large" color="secondary" />
																				</button>
																				{/* <Buttons
																					menu="Remove Deatil and Score"
																					color="secondary"
																					onClick={() => removeDetailScore(index, pos)}
																				/> */}
																			</div>
																		</td>
																	</div>
																</td>
															)
														})}
														<td>
															<br />
															<br />
															<br />
															<button onClick={() => addDetailScore(index)}>
																<AddIcon fontSize="large" style={{ color: green[500] }} />
															</button>
														</td>
													</tr>
												</tbody>
											</thead>
										</Table>
										<Buttons
											menu="Delete Criterion"
											color="secondary"
											onClick={() => handleRemoveTable(data.criteria_id, index,)}
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
				<br/>
			</div>
		</>
	)

}

