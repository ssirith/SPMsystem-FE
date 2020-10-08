import { Navigation } from "@material-ui/icons"
import { navigate } from "@reach/router"
import React from "react"
import { Assignment,Speaker } from "@material-ui/icons"
export default function DropdownNotiStudent(props) {
    function navigation(){
        if(props.notification.assignment_id===null){
            navigate('/announcements')
        }else{
            navigate('/assignments')
        }
    }
  return (
    <>
    <div className='container'>
        <div
        className={`text-break ${!props.notification.notification_id_fk?'font-weight-bold':'font-weight-normal'} flex-md-nowrap`}
        style={{
          width: "50%",
          height: "100%",
          cursor:'pointer'
        }}
        
      >

        <p className='' onClick={()=>navigation()} >{!props.notification.assignment_id?<Speaker fontSize='large'/>:<Assignment fontSize='large'/>}{props.notification.notification_detail}</p>
      </div>
    </div>
      
    </>
  )
}
