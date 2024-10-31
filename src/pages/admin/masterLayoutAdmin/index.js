import { memo } from "react";
import AppHeader from "../header/AppHeader";



const MasterLayoutAdmin = ({children,...props})=>{
    return (
    <div {...props}>
        <AppHeader/>
        {children}
    </div>
    )
}

export default memo(MasterLayoutAdmin);