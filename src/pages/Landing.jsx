import React from "react"
import Buttons from "../components/common/Buttons"
import { Link } from "@reach/router"
export default function Landing() {
  return (
    <div
      className="container  text-center my-auto min-vh-100"
      style={{ border: "1px solid black" }}
    >
      <div
        className="justify-content-center my-auto"
        style={{ border: "1px solid green" }}
      >
        <a href="http://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=jxZ1W&redirect_uri=http://localhost:3000/checkAuth">
          <Buttons menu="Login" fullWidth={true} className="btn-primary " />
        </a>
      </div>
    </div>
  )
}
