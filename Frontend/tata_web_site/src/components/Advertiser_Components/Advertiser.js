import AdvertiserNavbar from "./nav/AdvertiserNavbar"
import {Routes,Route } from "react-router-dom";
import AcountSettings from "./AccountSettings";
import ViewProfile from "./ViewProfile";
import CreateCampaign from "./CreateCampaing";
import MyCampaigns from "./ManageComponents/MyCampaigns";
import Browse from "./Browse/Browse";
const Advertiser = () =>{
    return (
        <div>
            <AdvertiserNavbar></AdvertiserNavbar>
            <Routes>
                <Route path="/Settings" element={<AcountSettings></AcountSettings>}></Route>
                <Route path="/ViewProfile" element={<ViewProfile></ViewProfile>}></Route>
                <Route path="/Browse" element={<Browse></Browse>}></Route>
                <Route path="/" element={<Browse></Browse>}></Route>
                <Route path="/Home" element={<Browse></Browse>}></Route>
                <Route path="/CreateCampaign" element={<CreateCampaign></CreateCampaign>}></Route>
                <Route path="/Campaigns" element={<MyCampaigns></MyCampaigns>}></Route>
            </Routes>   
        </div>
    )
}

export default Advertiser