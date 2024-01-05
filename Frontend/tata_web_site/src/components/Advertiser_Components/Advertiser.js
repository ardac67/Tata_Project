import AdvertiserNavbar from "./nav/AdvertiserNavbar"
import {Routes,Route } from "react-router-dom";
import AcountSettings from "./AccountSettings";
import ViewProfile from "./ViewProfile";
import CreateCampaign from "./CreateCampaing";
import MyCampaigns from "./ManageComponents/MyCampaigns";
import CDetails from "./ManageComponents/CDetails";
import MyCollaborations from "./ManageComponents/MyCollaborations";
import Browse from "./Browse/Browse";
import ShowAllMessages from "./Message/ShowAllMessages";
import ShowProfile from "./Show Profile/ShowProfile";
import fetchCampaigns from "./Fetch/fetchCampaigns";
import io from 'socket.io-client'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import {
    MDBSpinner
  } from 'mdb-react-ui-kit'
import NewProfile from "./Show Profile/NewProfile";
import SelectCampaign from "./Browse/SelectCampaign";
const Advertiser = () =>{

    return (
        <div>
            <AdvertiserNavbar ></AdvertiserNavbar>
            <Routes>
                <Route path="/Settings" element={<AcountSettings></AcountSettings>}></Route>
                <Route path="/ViewProfile" element={<ViewProfile></ViewProfile>}></Route>
                <Route path="/Browse" element={<Browse></Browse>}></Route>
                <Route path="/" element={<Browse></Browse>}></Route>
                <Route path="/Home" element={<Browse></Browse>}></Route>
                <Route path="/CreateCampaign" element={<CreateCampaign></CreateCampaign>}></Route>
                <Route path="/Campaigns" element={<MyCampaigns></MyCampaigns>}></Route>
                <Route path="/details/:id" element={<CDetails></CDetails>} />
                <Route path="/MyCollaborations" element={<MyCollaborations></MyCollaborations>} />
                <Route path="/ShowAllMessages" element={<ShowAllMessages></ShowAllMessages>}></Route>
                <Route path="/ShowProfile/:id" element={<ShowProfile></ShowProfile>}></Route>
                <Route path="/NewProfile/:id/:camp_id" element={<NewProfile></NewProfile>}></Route>
                <Route path='/SelectCampaign/:id_to_user' element={<SelectCampaign></SelectCampaign>}></Route>
            </Routes>   
        </div>
    )
}

export default Advertiser