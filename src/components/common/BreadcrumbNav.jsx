import React from "react"
import Breadcrumb from "react-bootstrap/Breadcrumb"
export default function BreadcrumbNav(props) {
  if (props) {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href={props.pastref}>{props.past}</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {props.current &&
              `${props.current.department}60-${props.current.project_id.substring(2)}`
            }
          </Breadcrumb.Item>

        </Breadcrumb>
      </div>
    )
  }
  return <div></div>
}
