import React from "react"
import Carditem from "../components/common/Carditem"
import Boxitem from "../components/common/Boxitem"
import Buttons from "../components/common/Buttons"
import Inputtext from "../components/common/Inputtext"

export default function Test() {
  return (
    <>
      {/* <div>
        <Buttons
          menu="Test Button"
          color="primary"
          onClick={() => console.log("stesfa")}
        />
      </div>
      {/* <Carditem /> */}
      <div>
        <Boxitem />
      </div>
      <Inputtext
        id="groupName"
        label="Temp label"
        defaultValue="Chonki Group"
        color="primary"
      />
    </> 
  )
}
