import './index.css';
import { useState } from 'react';
import HomeComponent from './components/Home_Components/HomeComponent';
import InfluencerComponent from './components/Influencer_Components/InfluencerComponent';
import Admin from'./components/Admin_Components/Admin';
import Advertiser from './components/Advertiser_Components/Advertiser';
import Cookies from 'universal-cookie';
function App() {
  const cookies = new Cookies(null, { path: '/' });
  const [isAuth, setAuth] = useState(cookies.get('token') ? true : false);
  const [type, setType] = useState(cookies.get('type') || '');
  
  function setIsAuth(type, isAuth) {
    setAuth(isAuth);
    setType(type);
  }

  let comp;
  if(!isAuth){
      comp = <HomeComponent setIsAuth={setIsAuth}></HomeComponent>
  }
  else{
    switch(type){
      case 'Influencer' :
          comp =  <InfluencerComponent></InfluencerComponent>
      break;
      case 'Advertiser' :
          comp = <Advertiser></Advertiser>
      break;
      case 'Admin':
          comp = <Admin></Admin>
      break;
      default:
          comp = <HomeComponent></HomeComponent>
    }
  }
  return (
    <div className="app">
      {comp}
    </div>
    );
}

export default App;
