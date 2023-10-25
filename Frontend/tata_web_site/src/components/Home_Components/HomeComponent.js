import {Routes,Route } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

const HomeComponent = ({setIsAuth}) => {
    return (
        <div className="App">
            <HomeNavbar></HomeNavbar>
            <Home></Home>
            <Routes>
                <Route path="/login" element={<Login setIsAuth={setIsAuth}></Login>} ></Route>
                <Route path="/register" element={<Register></Register>}></Route>
            </Routes>   
        </div>
    )
}
export default HomeComponent


