import React from "react"
import Buttons from "../components/common/Buttons"
import { Link } from "@reach/router"
import { Container, Row, Col } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
export default function Landing() {
  return (

    <Row>
      <Col >
        <img
          src="/image/login2.jpg"
          height="100%"
          width="100%"
        />
      </Col>
      <Col sm={5} className="container  text-center min-vh-100 " style={{ marginRight: 30 }}>
        <Grid
          justify="center"
          alignItems="center">
          <div>
            <p style={{ fontSize: 100 }} className="primary">SPM System</p>
            <a href="http://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=jxZ1W&redirect_uri=http://localhost:3000/checkAuth">
              <Buttons menu="Login" fullWidth={true} className="btn-primary " />
            </a>
          </div>
        </Grid>
        {/* <Grid textAlign='center' verticalAlign='middle'>
          <div className="container  text-center my-auto min-vh-100 ">
          <div>
            <p style={{ fontSize: 100 }} className="primary">SPM System</p>

            <a href="http://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=jxZ1W&redirect_uri=http://localhost:3000/checkAuth">
              <Buttons menu="Login" fullWidth={true} className="btn-primary " />
            </a>

          </div>
          </div>
        </Grid> */}

      </Col>
    </Row>


  )
}
