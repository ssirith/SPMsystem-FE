import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import { Autocomplete, createFilterOptions } from "@material-ui/lab"

export default function AutocompleteText(props) {
  return (
    <Autocomplete
      id="combo-box-demo"
      freeSolo
      options={props.settingList.map((option) => option.year_of_study)}
      style={{ width: 300 }}
      onChange={(_, values) =>
        props.handleYearSelected(values)
      }
      value={props.value}
      renderInput={(params) => (
        <TextField
        required
          {...params}
          label="Input year"
          variant="outlined"
          onChange={(event) =>
            props.setSettingDisplay({
              ...props.SettingDisplay,
              year_of_study: event.target.value,
            })
          }
        />
      )}
    />
  )
}
