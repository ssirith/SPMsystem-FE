import React, { useState, useContext, useCallback, useEffect } from "react"
import Cookie from 'js-cookie'
import AnnoucementTable from "../components/common/AnnoucementTable"
import { UserContext } from "../UserContext"
import { Link, useParams } from "@reach/router"
import Swal from 'sweetalert2'
import Buttons from "../components/common/Buttons"
import axios from "axios"
// import { Container} from "@material-ui/core"
import { Container, Row, Col } from 'reactstrap';
import Loading from "../components/common/Loading"
import dayjs from "dayjs"
export default function Announcements() {
  const { user, setUser } = useContext(UserContext)
  // const userBeforeParse=JSON.parse(localStorage.getItem('user'))
  // const  [user, setUser ] = useState(userBeforeParse)
  const headers = {
    Authorization: `Bearer ${Cookie.get("jwt")}`,
    "Content-Type": "application/json",
    accept: "application/json",
  }
  const [announcements, setAnnouncements] = useState()
  const [isPrefetch, setIsPreFetch] = useState(false)
  const fetchData = useCallback(async () => {
    try {
      setIsPreFetch(true)
      const resposne = await axios.get(`${process.env.REACT_APP_API_BE}/announcement`, { headers })
      sortAnnouncement(resposne.data)
      setIsPreFetch(false)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: 'Something went wrong, Please Try again.',
      })
      // console.log(err)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  function sortAnnouncement(announcements) {
    let newAnnouncements = announcements
    newAnnouncements.sort((a, b) => dayjs(a.announcement_date).isBefore(dayjs(b.announcement_date)) ? 1 : -1)
    setAnnouncements(newAnnouncements)
  }

  if (isPrefetch) {
    return <><Loading open={isPrefetch} /></>
  }
  return (
    <>
      {user && user.user_type === "Student" && (
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
                <th colSpan="8" style={{ fontSize: "28px" }}>
                  Annoucements
                </th>
              </tr>
            </thead>
            <tbody>
              {announcements && announcements.map((announcement, index) => (
                <AnnoucementTable
                  announcement={announcement}
                  user={user}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user && user.user_type === "Teacher" && (
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
                    <th colSpan="8" style={{ fontSize: "28px" }}>
                      Annoucements
              </th>
                  </tr>
                </thead>
                <tbody>
                  {announcements && announcements.map((announcement, index) => (
                    <AnnoucementTable
                      announcement={announcement}
                      user={user}
                      index={index + 1}
                    />
                  ))}
                </tbody>
              </table>
            </Col>

          </Row>
        </Container>
      )}
      {user && user.user_type === "AA" && (
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
                    <th colSpan="8" style={{ fontSize: "28px" }}>
                      Annoucements
               </th>
                  </tr>
                </thead>
                <tbody>
                  {announcements && announcements.map((announcement, index) => (
                    <AnnoucementTable
                      announcement={announcement}
                      user={user}
                      index={index + 1}
                    />
                  ))}
                </tbody>
              </table>
            </Col>

          </Row>
        </Container>
      )}
    </>
  )
}
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