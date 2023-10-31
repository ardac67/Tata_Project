import './index.css';
import { useState } from 'react';
import HomeComponent from './components/Home_Components/HomeComponent';
import {Influencer} from './components/Influencer_Components/Influencer';
import Admin from'./components/Admin_Components/Admin';
import Advertiser from './components/Advertiser_Components/Advertiser';

function App() {
  const [isAuth, setAuth] = useState(false);
  const [type , setType] = useState('');  
  
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
          comp =  <Influencer></Influencer>
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
