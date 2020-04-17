import React from "react"
import { TextField, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>({
  margin: {
    margin: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap'
  }
}))
export default function Dropdown(props) {
  const classes = useStyles()
  const handleChange = e => {
    props.setDepartment(e.target.value)
  }
  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField disabled={props.disabled}
        className={classes.margin}
          id="outlined-select-currency"
          select
          label="Department"
          value={props.department}
          onChange={handleChange}
          helperText="Please select your department"
          variant="outlined"
        >
          {props.departmentList.map((data, id) => (
            <MenuItem key={id} value={data}>
              {data}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
  )
}
