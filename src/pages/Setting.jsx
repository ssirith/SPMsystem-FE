import React, { useState, useContext, useCallback } from "react"
import { UserContext } from "../UserContext"
import Buttons from "../components/common/Buttons"
export default function Setting() {
  const { user, setUser } = useContext(UserContext)
  const [setting, SetSetting] = useState({
    year_of_study: "2019",
    number_of_member_min: 1,
    number_of_member_max: 1,
    student_one_more_group: false,
  })
  return (
    <div className="container">
      <div className="row mt-5">
        <h4>Project</h4>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <div className="row">
            <div className="col-4 mx-0">
              <h6>Year of Study:</h6>
            </div>
            <div className="col-8">
              <label htmlFor="Year">Year</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <div className="row">
            <div className="col-4 mx-0">
              <h6>Number of Member for Group:</h6>
            </div>
            <div className="row col-8">
              <div className="col-4">
                <label htmlFor="Min">Min</label>
                <input
                  type="number"
                  className="form-control"
                  id="minUser"
                  onChange={(e) =>
                    SetSetting({
                      ...setting,
                      number_of_member_min: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-4">
                <label htmlFor="Max">Max</label>
                <input
                  type="number"
                  className="form-control"
                  id="maxUser"
                  onChange={(e) =>
                    SetSetting({
                      ...setting,
                      number_of_member_max: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <div className="row">
            <div className="col-4 mx-0">
              <h6>Student can have more than one group:</h6>
            </div>
            <div className="row col-8">
              <div className="col-4">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="isMoreThan"
                  value="option1"
                  onClick={(e) =>
                    SetSetting({ ...setting, student_one_more_group: true })
                  }
                />
                <label className="form-check-label" htmlFor="Yes">
                  Yes
                </label>
              </div>
              <div className="col-4">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="isNotMoreThan"
                  value="option2"
                  onClick={(e) =>
                    SetSetting({ ...setting, student_one_more_group: false })
                  }
                  checked={setting.student_one_more_group == false}
                />
                <label className="form-check-label" htmlFor="No">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row text=center mt-5">
        <div className="col-12 text-center">
          <Buttons color="primary" menu="Save" />
        </div>
      </div>
    </div>
  )
}
