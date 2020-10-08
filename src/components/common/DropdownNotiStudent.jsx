import { Navigation } from "@material-ui/icons"
import { navigate } from "@reach/router"
import React from "react"
import { Assignment, Speaker } from "@material-ui/icons"
export default function DropdownNotiStudent(props) {
  function navigation() {
    if (props.notification.assignment_id === null) {
      navigate("/announcements")
    } else {
      navigate("/assignments")
    }
  }
  return (
    <>
      <div className="container m-4">
        <div
          className={`row text-break ${
            !props.notification.notification_id_fk
              ? "font-weight-normal"
              : "font-weight-bold"
          } flex-md-nowrap
          ${!props.notification.notification_id_fk? "": "primary"}`}
          style={{
            width: "50%",
            height: "100%",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {!props.notification.assignment_id ? (
            <Speaker
              className="primary "
              style={{ height: "35%", width: "30%" }}
            />
          ) : (
            <Assignment
              className="primary"
              style={{ height: "35%", width: "30%" }}
            />
          )}
          <p className="p-2" onClick={() => navigation()}>
            {`${props.notification.notification_detail.substring(0, 35)}...`}
          </p>
        </div>
      </div>
      <hr />
    </>
  )
}
