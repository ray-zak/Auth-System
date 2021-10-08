import React ,{useState} from "react"
import {BrowserRouter as Router , Route } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import Home_page from "./Components/Home_page";
const App = ()=>{

    //missing Auth middleware and enhance the UI

  const [token , set_token] = useState(localStorage.getItem("token"));
  return(
      <div>
          {!token?
              (
                  <Router>
                  <Navbar/>
                  <Route path={"/login"} render={()=> <Login/>}/>
                  <Route path={"/register"} render={()=><Register/>}/>
                  </Router>):
              (
                  <Router>
                  <Navbar token={token}/>
                  <Route path={"/"} render={()=><Home_page/>}/>

              </Router>
              )
          }

      </div>

  )
}



export default App;
