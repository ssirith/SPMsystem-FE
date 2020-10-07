import React, { useState, useContext, useCallback, useEffect } from "react"
import AnnoucementTable from "../components/common/AnnoucementTable"
import { UserContext } from "../UserContext"
import { Link, useParams } from "@reach/router"
import { makeStyles } from "@material-ui/core/styles"
import Buttons from "../components/common/Buttons"
import axios from "axios"
// import { Container} from "@material-ui/core"
import { Container, Row, Col } from 'reactstrap';
export default function Announcements() {
  const { user, setUser } = useContext(UserContext)
  const [announcements, setAnnouncements] = useState()
  const [isPrefetch, setIsPreFetch] = useState(false)
  const fetchData = useCallback(async () => {
    setIsPreFetch(true)
    const resposne = await axios.get(`${process.env.REACT_APP_API_BE}/announcement`)
    setAnnouncements(resposne.data)
    setIsPreFetch(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])
  if (isPrefetch) {
    return <></>
  }
  return (
    <>
      {user.role === "student" && (
        <div className="container mt-5">
          <table
            class="table"
            style={{
              outlineStyle: "solid",
              outlineWidth: "1px",
              outlineColor: "#C4C4C4",
            }}
          >
            <thead class="thead-primary">
              <tr>
                <th colSpan="8" style={{ fontSize: "20px" }}>
                  Annoucements
                </th>
              </tr>
            </thead>
            <tbody>
              {announcements && announcements.map((announcements, index) => (
                <AnnoucementTable
                  announcements={announcements}
                  user={user}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user.role === "teacher" && (
        <Container>
          <br />
          <Row >
            <Col sm={10} >
            </Col>
            <Col sm={2}>
            <Link to="/createannouncement">
              <Buttons
                menu="Create Annoucement"
                className="success"
              />
              </Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <table
                class="table"
                style={{
                  outlineStyle: "solid",
                  outlineWidth: "1px",
                  outlineColor: "#C4C4C4",
                }}
              >
                <thead class="thead-primary">
                  <tr>
                    <th colSpan="8" style={{ fontSize: "20px" }}>
                      Annoucements
              </th>
                  </tr>
                </thead>
                <tbody>
                  {announcements && announcements.map((announcements, index) => (
                    <AnnoucementTable
                      announcements={announcements}
                      user={user}
                      index={index + 1}
                    />
                  ))}
                </tbody>
              </table>
            </Col>

          </Row>
        </Container>
        // <div className="container mt-5">
        //   <div className="row">
        //     <Link to="/createannouncement">
        //       <div className="col-15 ml-20">
        //         <Buttons
        //           style={{ backgroundColor: 'green' }}
        //           className="success"
        //           menu="Create Annoucement"
        //         />
        //       </div>
        //     </Link>
        //   </div>
        //   <br/>
        //   <table
        //     class="table"
        //     style={{
        //       outlineStyle: "solid",
        //       outlineWidth: "1px",
        //       outlineColor: "#C4C4C4",
        //     }}
        //   >
        //     <thead class="thead-primary">
        //       <tr>
        //         <th colSpan="8" style={{ fontSize: "20px" }}>
        //           Annoucements
        //       </th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {announcements && announcements.map((announcements, index) => (
        //         <AnnoucementTable
        //           announcements={announcements}
        //           user={user}
        //           index={index + 1}
        //         />
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
      )}
      {user.role === "aa" && (
        <Container>
        <br />
        <Row >
          <Col sm={10} >
          </Col>
          <Col sm={2}>
          <Link to="/createannouncement">
            <Buttons
              menu="Create Annoucement"
              className="success"
            />
            </Link>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <table
              class="table"
              style={{
                outlineStyle: "solid",
                outlineWidth: "1px",
                outlineColor: "#C4C4C4",
              }}
            >
              <thead class="thead-primary">
                <tr>
                  <th colSpan="8" style={{ fontSize: "20px" }}>
                    Annoucements
            </th>
                </tr>
              </thead>
              <tbody>
                {announcements && announcements.map((announcements, index) => (
                  <AnnoucementTable
                    announcements={announcements}
                    user={user}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </Col>

        </Row>
      </Container>
        // <div className="container mt-5">
        //   <div className="row">
        //     <div className="col-12 my-3">
        //       <div className="row">
        //         <Link to="/createannouncement">
        //           <div className="col-10 my-4">
        //             <Buttons
        //               style={{ backgroundColor: 'green' }}
        //               className="success"
        //               menu="Create Annoucement"
        //             />
        //           </div>
        //         </Link>
        //       </div>
        //     </div>
        //   </div>
        //   <table
        //     class="table"
        //     style={{
        //       outlineStyle: "solid",
        //       outlineWidth: "1px",
        //       outlineColor: "#C4C4C4",
        //     }}
        //   >
        //     <thead class="thead-primary">
        //       <tr>
        //         <th colSpan="8" style={{ fontSize: "20px" }}>
        //           Annoucements
        //       </th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {announcements && announcements.map((announcements, index) => (
        //         <AnnoucementTable
        //           announcements={announcements}
        //           user={user}
        //           index={index + 1}
        //         />
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
      )}
    </>
  )
}
