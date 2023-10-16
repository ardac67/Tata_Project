import Navbar from './components/navbar.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Home from './components/Home.js';
function App() {
  return (
    <Router>
        <div className="App">
          <Navbar/>
          <div className="content">
                <Route exact path="/">
                  <Home/>
                </Route>
          </div>
        </div>
    </Router>
  );
}

export default App;
