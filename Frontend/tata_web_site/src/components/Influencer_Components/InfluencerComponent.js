import {Routes,Route } from "react-router-dom";
import Browse from "./Browse/Browse";
import Home from "../Home_Components/Home";
import Manage from "./Manage/Manage";
import AccountSettings from "./Account/AccountSettings";
import ViewProfile from "./Account/ViewProfile";
import MyProposals from "./Manage/MyProposals";
import MyCollaborations from "./Manage/MyCollaborations";
import CampaignMilestones from "./Manage/CampaignMilestones";
import InfluencerNavbar from "./nav/InfluencerNavbar.";
import CampaignDetails from "./Browse/CampaignDetails";
import CreateProposal from "./Browse/CreateProposal";

const InfluencerComponent = ({setIsAuth}) => {
    return (
        <div className="App">
            <InfluencerNavbar></InfluencerNavbar>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/Browse" element={<Browse></Browse>} ></Route>
                <Route path="/Manage" element={<Manage></Manage>}></Route>
                <Route path="/AccountSettings" element={<AccountSettings></AccountSettings>}></Route>
                <Route path="/MyProposals" element={<MyProposals></MyProposals>}></Route>
                <Route path="/MyCollaborations" element={<MyCollaborations></MyCollaborations>}></Route>
                <Route path="/CampaignMilestones" element={<CampaignMilestones></CampaignMilestones>}></Route>
                <Route path="/ViewProfile" element={<ViewProfile></ViewProfile>}></Route>
                <Route path="/CampaignDetails" element={<CampaignDetails></CampaignDetails>}></Route>
                <Route path="/CreateProposal" element={<CreateProposal></CreateProposal>}></Route>
            </Routes>   
            <div></div>
        </div>
    )
}
export default InfluencerComponent