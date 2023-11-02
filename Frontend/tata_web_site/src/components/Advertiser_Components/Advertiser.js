import AdvertiserNavbar from "./nav/AdvertiserNavbar"
import {Routes,Route } from "react-router-dom";
import AcountSettings from "./AccountSettings";
import Browse from "./Browse"
import ViewProfile from "./ViewProfile";
const Advertiser = () =>{
    return (
        <div>
            <AdvertiserNavbar></AdvertiserNavbar>
            <Routes>
                <Route path="/Settings" element={<AcountSettings></AcountSettings>}></Route>
                <Route path="/ViewProfile" element={<ViewProfile></ViewProfile>}></Route>
                <Route path="/" element={<Browse></Browse>}></Route>
            </Routes>   
        </div>
    )
}

export default Advertiser