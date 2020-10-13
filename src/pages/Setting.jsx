import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from "react"
import Cookie from 'js-cookie'
import { navigate } from "@reach/router"
import { UserContext } from "../UserContext"
import { SettingYearContext } from "../SettingYearContext"
import Buttons from "../components/common/Buttons"
import AutocompleteText from "../components/common/AutocompleteText"
import axios from "axios"
import { SettingContext } from "../SettingContext"
import Loading from "../components/common/Loading"

export default function Setting() {
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const { user, setUser } = useContext(UserContext)
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const { settingYearContext, setSettingYearContext } = useContext(
    SettingYearContext
  )
  const { settingContext, setSettingContext } = useContext(SettingContext)
  // const [setting, setSetting] = useState({})
  const [settingDisplay, setSettingDisplay] = useState({})
  const [settingList, setSettingList] = useState([])
  const [isPrefetch, setIsPreFetch] = useState(false)

  const handleYearSelected = (selectedYear) => {
    const setting = settingList.filter(
      (setting) => selectedYear === setting.year_of_study
    )
    if (setting[0]) {
      setSettingDisplay(setting[0])
      // console.log("select year", setting)
    }
  }
  const checkRole = useCallback(() => {
    if (user.user_type === "Student" || user.user_type === "Teacher") {
      alert(`You dont'have permission to go this page.`)
      navigate("/main")
    }
  })

  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      const response = await axios.get(`${process.env.REACT_APP_API_BE}/config`,{headers})
      console.log('arrya from be',response.data)
      // setSettingList(data.data)
      setSettingDisplay(settingContext)
      const temp =[]
      response.data.map((data,index)=>{
        if(parseInt(data.student_one_more_group)){
          temp.push({...data,student_one_more_group:true})
          // setSettingList([...settingList,{...data,student_one_more_group:true}])
        }else {
          temp.push({...data,student_one_more_group:false})
          // setSettingList([...settingList,{...data,student_one_more_group:false}])

        }
      })
      setSettingList(temp)
      // console.log(settingContext)
      setIsPreFetch(false)
    } catch (err) {
      console.log(err)
    }
  })

  useEffect(() => {
    fetchData()
  }, [SettingContext])

  useEffect(() => {
    checkRole()
  }, [user])
  
  async function handleToggle() {
    if (
      settingDisplay.number_of_member_min > settingDisplay.number_of_member_max
    ) {
      alert("The number is incorrect")
    } else if (
      settingDisplay.number_of_member_max < settingDisplay.number_of_member_min
    ) {
      alert("The number is incorrect")
    } else if (
      settingDisplay.number_of_member_max <= 0 ||
      settingDisplay.number_of_member_min <= 0
    ) {
      alert("The number is incorrect")
    }

    try {
      // setSetting(settingDisplay)
      // console.log(setting)
      const response = await axios.post(
        `${process.env.REACT_APP_API_BE}/config`,
        settingDisplay,{headers}
      )
      if (response.status === 200) {
        setSettingYearContext(settingDisplay.year_of_study)
        alert("The setting has been Updated.")
        navigate("/main")

      }
    } catch (err) {
      alert("Your input is incorrect, Please try again.")
      console.log(err)
    }
  }
  if (isPrefetch) {
    return <><Loading open={isPrefetch}/></>
  }
  return (
    <div className="container">
      {console.log('settinglist',settingList)}
      {/* {console.log("settingDisplay in seeting page", settingDisplay)} */}
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
                setSettingDisplay={setSettingDisplay}
                value={settingDisplay.year_of_study}
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
                  required
                  type="number"
                  className="form-control"
                  id="minUser"
                  onChange={(e) =>
                    setSettingDisplay({
                      ...settingDisplay,
                      number_of_member_min: e.target.value,
                    })
                  }
                  value={settingDisplay.number_of_member_min}
                />
              </div>
              <div className="col-4">
                <label htmlFor="Max">Max</label>
                <input
                required
                  type="number"
                  className="form-control"
                  id="maxUser"
                  onChange={(e) =>
                    setSettingDisplay({
                      ...settingDisplay,
                      number_of_member_max: e.target.value,
                    })
                  }
                  value={settingDisplay.number_of_member_max}
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
                required
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="isMoreThan"
                  value={settingDisplay.student_one_more_group}
                  onChange={(e) =>
                    setSettingDisplay({
                      ...settingDisplay,
                      student_one_more_group: true,
                    })
                  }
                  checked={settingDisplay.student_one_more_group === true}
                />
                <label className="form-check-label" htmlFor="Yes">
                  Yes
                </label>
              </div>
              <div className="col-4">
                <input
                required
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="isNotMoreThan"
                  value={settingDisplay.student_one_more_group}
                  onChange={(e) =>
                    setSettingDisplay({
                      ...settingDisplay,
                      student_one_more_group: false,
                    })
                  }
                  checked={settingDisplay.student_one_more_group === false}
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
