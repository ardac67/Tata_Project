import {Routes,Route } from "react-router-dom";
import Browse from "./Browse/Browse";
import AccountSettings from "./Account/AccountSettings";
import ViewProfile from "./Account/ViewProfile/ViewProfile";
import MyProposals from "./Manage/MyProposals";
import MyCollaborations from "./Manage/MyCollaborations";
import CampaignMilestones from "./Manage/CampaignMilestones";
import InfluencerNavbar from "./nav/InfluencerNavbar.";
import CampaignDetails from "./Browse/CampaignDetails";
import CreateProposal from "./Browse/CreateProposal";
import ShowAllMessages from "./Messages/ShowAllMessages";

const InfluencerComponent = ({setIsAuth}) => {
    return (
        <div className="App">
            <InfluencerNavbar></InfluencerNavbar>
            <Routes>
                <Route path="/" element={<Browse></Browse>}></Route>
                <Route path="/Browse" element={<Browse></Browse>} ></Route>
                <Route path="/AccountSettings" element={<AccountSettings></AccountSettings>}></Route>
                <Route path="/MyProposals" element={<MyProposals></MyProposals>}></Route>
                <Route path="/MyCollaborations" element={<MyCollaborations></MyCollaborations>}></Route>
                <Route path="/CampaignMilestones" element={<CampaignMilestones></CampaignMilestones>}></Route>
                <Route path="/ViewProfile" element={<ViewProfile></ViewProfile>}></Route>
                <Route path="/CampaignDetails/:id" element={<CampaignDetails></CampaignDetails>}></Route>
                <Route path="/CreateProposal/:id" element={<CreateProposal></CreateProposal>}></Route>
                <Route path="/ShowAllMessages" element={<ShowAllMessages></ShowAllMessages>}></Route>
            </Routes>   
            <div></div>
        </div>
    )
}
export default InfluencerComponent
