import React, { useState, useContext, useCallback, useEffect } from "react"
import AnnoucementTable from "../components/common/AnnoucementTable"
import { UserContext } from "../UserContext"
import { Link, useParams } from "@reach/router"
import { makeStyles } from "@material-ui/core/styles"

export default function Annoucements() {
  const { user, setUser } = useContext(UserContext)
  const [annoucements, setAnnoucements] = useState([
    {
      topic: "topic 1",
      detail: "dsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdldsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdl"
    },
    {
      topic: "topic 2",
      detail: "dsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdl"
    },
    {
      topic: "topic 3",
      detail: "dsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdl"
    },
    {
      topic: "topic 4",
      detail: "dsfsdfsdfsdfdsfdsjfsdkljfklsdjfklsdjfklsdjlfkjsdl"
    },

  ])
  const [isPrefetch, setIsPreFetch] = useState(false)
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
              {annoucements.map((annoucement, index) => (
                <AnnoucementTable
                  annoucement={annoucement}
                  user={user}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user.role === "teacher" || user.role === "aa" && (
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
              {annoucements.map((annoucement, index) => (
                <AnnoucementTable
                  annoucement={annoucement}
                  user={user}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
