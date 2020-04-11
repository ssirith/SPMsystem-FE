import React from "react"
import Breadcrumb from "react-bootstrap/Breadcrumb"
export default function BreadcrumbNav(props) {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href={props.pastref}>{props.past}</Breadcrumb.Item>
        <Breadcrumb.Item active>
          {props.current}
        </Breadcrumb.Item>
       
      </Breadcrumb>
    </div>
  )
}
