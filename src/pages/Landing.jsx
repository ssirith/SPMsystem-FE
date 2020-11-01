import React from "react"
import Button from "@material-ui/core/Button"
import { Link } from "@reach/router"
import { Container, Row, Col } from "reactstrap"
import Grid from "@material-ui/core/Grid"
export default function Landing() {
  return (
    // <Row>
    //   <Col >
    //     <img
    //       src="/image/login2.jpg"
    //       height="100%"
    //       width="100%"
    //     />
    //   </Col>
    //   <Col sm={5} className="container  text-center min-vh-100 " style={{ marginRight: 30 }}>
    //     <Grid
    //       justify="center"
    //       alignItems="center">
    //       <div>
    //         <p style={{ fontSize: 100 }} className="primary">SPM System</p>
    //         <a href="https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=jxZ1W&redirect_uri=https://localhost:3000/checkAuth">
    //           <Buttons menu="Login" fullWidth={true} className="btn-primary " />
    //         </a>
    //       </div>
    //     </Grid>
    //     {/* <Grid textAlign='center' verticalAlign='middle'>
    //       <div className="container  text-center my-auto min-vh-100 ">
    //       <div>
    //         <p style={{ fontSize: 100 }} className="primary">SPM System</p>

    //         <a href="https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=jxZ1W&redirect_uri=https://localhost:3000/checkAuth">
    //           <Buttons menu="Login" fullWidth={true} className="btn-primary " />
    //         </a>

    //       </div>
    //       </div>
    //     </Grid> */}

    //   </Col>
    // </Row>

    // <div style={{ display: "flex", flexDirection: 'row', height: '100vh' }}>
    //   <div>
    //     <img
    //       src="/image/login2.jpg"
    //       height="100%"
    //       width="900px"
    //     />
    //   </div>
    //   <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    //     <div>
    //       <p style={{ fontSize: 100 }} className="primary">SPM Systems</p>
    //     </div>
    //     <div style={{ margin: '10px', width: '80%' }}>
    //       <a href="https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=CslkDUZS&redirect_uri=https://localhost:3000/checkAuth&state=SPMlogin">
    //         <Button variant="contained" color="primary" fullWidth >
    //           Login via SSO
    //         </Button>
    //       </a>
    //     </div>
    //   </div>
    // </div>
    <div className="background-login vh-100 text-center my-auto">
      
        <img style={{marginTop:'200px'}} src="/image/logo@3x.png" height="30%" width="auto" />
        <div className='w-50 mx-auto'>
           <a href="https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=CslkDUZS&redirect_uri=https://spm-systems.netlify.app/checkAuth&state=SPMlogin">
             <Button variant="contained" className='no-bg no-edge' fullWidth >
               Login via SSO
             </Button>
             {/* <img className='' src="/image/search button@3x.png" height="10%" width="auto" /> */}
             </a>
        </div>
       
    </div>
  )
}
