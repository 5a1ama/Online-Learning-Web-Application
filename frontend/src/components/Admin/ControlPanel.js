import React from 'react'
import "./ControlPanel.css"
import Navbar from '../navbar/Navbar'
function ControlPanel() {
  return (
    <div className="controlPanel">
            <Navbar items={["Home","Control Panel","Reports"]} select="Control Panel" nav={["/AdminHome","/AdminControlPanel",""]} scroll={["","",""]}  />
        <div className="controlPanel_content">
            <div className="controlPanel_content4horizontal">
                
            <div className="ControlPanel_Func">
                <h3>Add Admin</h3>
                <form>
                    <input type="username" placeholder="Enter new Administrator username"></input>
                    <input type="password" placeholder="Enter new Administrator password"></input>
                    <button>Add Admin</button>
                </form>
            </div>
            <div className="ControlPanel_Func">
            <h3>Add Instructor</h3>
                <form>
                    <input type="username" placeholder="Enter new Instructor username"></input>
                    <input type="password" placeholder="Enter new Instructor password"></input>
                    <button>Add Instructor</button>
                </form>
            </div>
            <div className="ControlPanel_Func">
            <h4>Add corporate trainee</h4>
                <form>
                    <input type="username" placeholder="Enter new trainee username"></input>
                    <input type="password" placeholder="Enter new trainee password"></input>
                    <button>Add trainee</button>
                </form>
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