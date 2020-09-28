import React, { useState } from "react"
import { Link } from "@reach/router"
import { TextField, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ModalDeleteRubric from "./ModalDeleteRubric"
import Buttons from "./Buttons"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap'
  }
}))
export default function DropdownRubric(props) {
  const [isOpenCreateRubric, setIsOpenCreateRubric] = useState(false)
  const [rubricList, setRubricList] = useState(props.rubricList)
  const [rubricForDelte, setRubricForDelete] = useState([])
  const [isOpenDeleteRubric, setIsOpenDeleteRubric] = useState(false)
  const classes = useStyles()
  const handleChange = e => {
    props.setRubric(e.target.value)
  }

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField disabled={props.disabled}
          className={classes.margin}
          id="outlined-select-currency"
          select
          label="Select Rubric"
          value={props.rubric}
          onChange={handleChange}
          // helperText="Select rubric"
          variant="outlined"
        >
          {rubricList.map((data, index) => (
            <MenuItem key={index} value={data}>
              {data.rubric_title}  
            </MenuItem>
          ))}
          
          {/* <Link to={`/createrubric`}>
            <MenuItem>
              Create New Rubric
          </MenuItem>
          </Link> */}
        </TextField>
      </div>
    </form>
  )
}
