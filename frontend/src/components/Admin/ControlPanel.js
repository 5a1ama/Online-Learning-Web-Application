import React from 'react'
import "./ControlPanel.css"
import Navbar from '../navbar/Navbar'
function ControlPanel() {
  return (
    <div className="controlPanel">
            <Navbar items={["Home","Control Panel","Reports"]} select="" nav={["/AdminHome","/AdminControlPanel",""]} scroll={["","",""]}  />
        <div className="controlPanel_content">
            <div className="controlPanel_content4horizontal">
                
            <div className="ControlPanel_Func">
                <h3 ></h3>
            </div>
            <div className="ControlPanel_Func">

            </div>
            <div className="ControlPanel_Func">

            </div> 
             <div className="ControlPanel_Func">

            </div>

            </div>
            <div className="controlPanel_vertical">

            <div className="ControlPanel_Func5">
                
            </div>
        </div>
        </div>
        </div>
  )
}

export default ControlPanel