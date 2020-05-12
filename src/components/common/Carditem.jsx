import React from "react"
import { Card } from "react-bootstrap"
import Button from "@material-ui/core/Button"

export default function Carditem(props) {
  return (
    <div>
      <Card style={{ width: "18rem", height:"14rem" }}>
        <Card.Header>
          {`${
            props.groups.project_department
          }60-${props.groups.project_id.substring(2)}`}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="text-center">
              <p className="m-0">{props.groups.project_name}</p>
              <p>{props.groups.project_detail}</p>

              {props.groups.teachers &&
                (props.groups.teachers.length === 0
                  ? "No Advisor"
                  : props.groups.teachers.map((a, index) => {
                      return <p className="my-0">Advisor: {a.teacher_name}</p>
                    }))}
            </div>
          </Card.Text>

        </Card.Body>
        
          <Card.Link href={`/projects/${props.groups.project_id}`} className='d-flex justify-content-end m-2'>
            <Button size="small" color="primary">
              More
            </Button>
          </Card.Link>
          
      </Card>
    </div>
  )
}
