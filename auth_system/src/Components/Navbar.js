import React, {useEffect} from "react";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom"
import "../component-styles/navbar.css"



const Navbar = ({token})=>{

    const handle_logout= ()=>{
        localStorage.clear();
        window.location.reload();
    }

    if(!token){
        return(
            <div>
                <AppBar position={"fixed"}>
                    <Toolbar>
                        <Link className={"AppName"} to={"/"}> Auth-System
                        </Link>
                        <div className={"login-register"}>
                            <Link className={"login"} to={"/login"}> Login </Link>
                            <Link className={"register"} to={"/register"}> Register </Link>
                        </div>


                    </Toolbar>
                </AppBar>
            </div>
        )
    }
    else{
        return (
            <div>
                <AppBar position={"fixed"}>
                    <Toolbar>
                        <Link className={"AppName"} to={"/"}> Auth-System </Link>
                        <button onClick={handle_logout} className={"logout"}> logout  </button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar
