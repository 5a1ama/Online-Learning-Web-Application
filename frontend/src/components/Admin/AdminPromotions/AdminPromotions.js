import React from 'react'
import Navbar from '../../navbar/Navbar'
import './AdminPromotions.css'
function AdminPromotions() {
  return (
    <div>
    <Navbar items={["Home","Control Panel","Reports"]} select="Control Panel" nav={["/AdminHome","/AdminControlPanel","/AdminReports"]} scroll={["","",""]}  handleCountryNumber={()=>{} }  />

    </div>
  )
}
export default AdminPromotions
