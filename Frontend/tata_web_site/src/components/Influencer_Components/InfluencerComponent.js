import { Routes, Route } from "react-router-dom";
import Browse from "./Browse/Browse";
import AccountSettings from "./Account/AccountSettings";
import ViewProfile from "./Account/ViewProfile/ViewProfile";
import MyProposals from "./Manage/MyProposals";
import MyCollaborations from "./Manage/MyCollaborations";
import InfluencerNavbar from "./nav/InfluencerNavbar.";
import CampaignDetails from "./Browse/CampaignDetails";
import CreateProposal from "./Browse/CreateProposal";
import ShowAllMessages from "./Messages/ShowAllMessages";
import ShowProfile from "./Show Profile/ShowProfile";
import Rating from "./Show Profile/Rating";

const InfluencerComponent = ({ setIsAuth }) => {
  return (
    <div className="App">
      <InfluencerNavbar></InfluencerNavbar>
      <Routes>
        <Route path="/" element={<Browse></Browse>}></Route>
        <Route path="/Browse" element={<Browse></Browse>}></Route>
        <Route
          path="/AccountSettings"
          element={<AccountSettings></AccountSettings>}
        ></Route>
        <Route
          path="/MyProposals"
          element={<MyProposals></MyProposals>}
        ></Route>
        <Route
          path="/MyCollaborations"
          element={<MyCollaborations></MyCollaborations>}
        ></Route>
        <Route
          path="/ViewProfile"
          element={<ViewProfile></ViewProfile>}
        ></Route>
        <Route
          path="/CampaignDetails/:id"
          element={<CampaignDetails></CampaignDetails>}
        ></Route>
        <Route
          path="/CreateProposal/:id"
          element={<CreateProposal></CreateProposal>}
        ></Route>
        <Route
          path="/ShowAllMessages"
          element={<ShowAllMessages></ShowAllMessages>}
        ></Route>
        <Route
          path="/ShowProfile/:id"
          element={<ShowProfile></ShowProfile>}
        ></Route>
        <Route path="/Rating" element={<Rating></Rating>}></Route>
      </Routes>
      <div></div>
    </div>
  );
};
export default InfluencerComponent;
