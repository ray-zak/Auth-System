import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import "../component-styles/Login.css"

const Login= ()=>{

    const [username,Set_username] = useState("");
    const [password, Set_password] = useState("");
    const [error, set_error]= useState("");
    let history = useHistory();

    const handle_submit=(e)=>{

        e.preventDefault();

    axios.post("http://localhost:5000/users/login", {username, password})
        .then(res=>{
            console.log(res.data)
            localStorage.setItem("token", res.data.token)

            history.push("/");
            history.go(0);   // this refreshes the page





        })
        .catch(err=>{
            console.log(err.response.data.msg);
            set_error(err.response.data.msg);


        })
    }

    return(
        <div>
            <div className={"label"}>
            <h3 className={"label_text"}>  Login Form </h3>
            </div>
            <form className={"register_form"} onSubmit={handle_submit}>
                <input className={'username'} type={"text"} placeholder={"Enter your username"} onChange={(e)=>Set_username(e.target.value)}/>
                <input className={"password"} type={"password"} placeholder={"Enter password"} onChange={(e)=>Set_password(e.target.value)}/>
                <input className={"submit"} type={"submit"} value={"Login"}/>

            </form>

            <h5 style={{color:"red"}}> {error}</h5>
        </div>
    )
}
export default Login
