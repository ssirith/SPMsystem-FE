import React, { useState } from "react"
import Carditem from "../components/common/Carditem"
import Testcard from "../components/common/Testcard"

export default function Teams() {
  const [group, setGroup] = useState([
    {
      id: 1,
      name: "SPM system",
      detail: "This is group detail section",
      advisor: "Dr.Siam Yamsaengsung"
    },
    {
      id: 2,
      name: "Senior Project 2",
      detail: "This is group detail section",
      advisor: "Dr.asdasdasd sdsdss"
    },
    {
      id: 3,
      name: "Senior Project 3",
      detail: "This is group detail section",
      advisor: "Dr.asdasdasd sdsdss"
    },
    {
      id: 4,
      name: "Senior Project 4",
      detail: "This is group detail section",
      advisor: "Dr.asdasdasd sdsdss"
    },
    {
      id: 5,
      name: "Senior Project 5",
      detail: "This is group detail section",
      advisor: "Dr.asdasdasd sdsdss"
    },
    {
      id: 6,
      name: "Senior Project 6",
      detail: "This is group detail section",
      advisor: "Dr.asdasdasd sdsdss"
    },
    {
      id: 7,
      name: "Senior Project 7",
      detail: "This is group detail section",
      advisor: "Dr.asdasdasd sdsdss"
    },
    {
      id: 8,
      name: "Senior Project 8",
      detail: "This is group detail section",
      advisor: "Dr.asdasdasd sdsdss"
    }
  ])
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {group.map((data, index) => {
            return (
              <div className="col-3 my-3">
                <Carditem group={data} />
              </div>
            )
          })}
        </div>
      </div>
      <Testcard/>
    </>
  )
}
