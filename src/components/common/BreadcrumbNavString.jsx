import React from "react"
import Breadcrumb from "react-bootstrap/Breadcrumb"
export default function BreadcrumbNavString(props) {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href={props.pastref}>{props.past}</Breadcrumb.Item>

        {props.pastsref && props.pasts ? (
          <Breadcrumb.Item href={props.pastsref}>{props.pasts}</Breadcrumb.Item>
        ) : (
          <></>
        )}
        <Breadcrumb.Item active>{props.current}</Breadcrumb.Item>
        </Breadcrumb>
    </div>
  )
}
