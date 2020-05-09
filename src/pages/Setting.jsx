import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from "react"
import { navigate } from "@reach/router"
import { UserContext } from "../UserContext"
import { SettingYearContext } from "../SettingYearContext"
import Buttons from "../components/common/Buttons"
import AutocompleteText from "../components/common/AutocompleteText"
import axios from "axios"

export default function Setting() {
  const { user, setUser } = useContext(UserContext)
  const { settingYearContext,setSettingYearContext } = useContext(SettingYearContext)
  const [setting, setSetting] = useState({
    year_of_study: "",
    number_of_member_min: null,
    number_of_member_max: null,
    student_one_more_group: null,
  })

  const [settingList, setSettingList] = useState([])

  const handleYearSelected = (selectedYear) => {
    const setting = settingList.filter(
      (setting) => selectedYear === setting.year_of_study
    )
    if (setting[0]) {
      setSetting(setting[0])
    }
  }
  const checkRole = useCallback(() => {
    if (user.role === "student" || user.role === "teacher") {
      alert(`You dont'have permission to go this page.`)
      navigate("/")
    }
  })

  const fetchData = useCallback(async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_BE}/config`)
      setSettingList(data.data)
    } catch (err) {
      console.log(err)
    }
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    checkRole()
  }, [user])

  async function handleToggle() {
    if (setting.number_of_member_min > setting.number_of_member_max) {
      alert("The number is incorrect")
    } else if (setting.number_of_member_max < setting.number_of_member_min) {
      alert("The number is incorrect")
    } else if (
      setting.number_of_member_max <= 0 ||
      setting.number_of_member_min <= 0
    ) {
      alert("The number is incorrect")
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/config`,
        setting
      )
      if (response.status === 200) {
        setSettingYearContext(setting.year_of_study)
        alert("The setting has been create.")
        navigate("/")
        setTimeout(()=>{
          window.location.reload()
        },2000)
      }
    } catch (err) {
      console.log(err)
    }
  }

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
              <AutocompleteText
                handleYearSelected={handleYearSelected}
                settingList={settingList}
                setSetting={setSetting}
                defaultValue={setting.year_of_study}
              />
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
                    setSetting({
                      ...setting,
                      number_of_member_min: e.target.value,
                    })
                  }
                  value={setting.number_of_member_min}
                />
              </div>
              <div className="col-4">
                <label htmlFor="Max">Max</label>
                <input
                  type="number"
                  className="form-control"
                  id="maxUser"
                  onChange={(e) =>
                    setSetting({
                      ...setting,
                      number_of_member_max: e.target.value,
                    })
                  }
                  value={setting.number_of_member_max}
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
            <div className="row col-8 ml-2">
              <div className="col-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="isMoreThan"
                  value="option1"
                  onChange={(e) =>
                    setSetting({ ...setting, student_one_more_group: true })
                  }
                />
                <label className="form-check-label" htmlFor="Yes">
                  Yes
                </label>
              </div>
              <div className="col-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="isNotMoreThan"
                  value="option2"
                  onChange={(e) =>
                    setSetting({ ...setting, student_one_more_group: false })
                  }
                  checked={setting.student_one_more_group === false}
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
          <Buttons color="primary" menu="Save" onClick={() => handleToggle()} />
        </div>
      </div>
    </div>
  )
}
