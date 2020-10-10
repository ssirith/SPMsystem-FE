import React from "react"
import Buttons from "../components/common/Buttons"

export default function Landing() {
  return (
    <>
      <div
        className="container text-center my-auto"
        style={{ border: "1px solid black" }}
      >
        <div  style={{ border: "1px solid green" }}>
          <Buttons menu="Login" fullWidth={true} className="btn-primary" onClick={()=>console.log('click')} />
        </div>
      </div>
    </>
  )
}
