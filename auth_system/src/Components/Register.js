import React, {useState} from "react"
import axios from "axios";
import "../component-styles/Register.css"
import {useHistory} from "react-router-dom";

const Register = ()=>{

    const [username, Set_username] = useState("");
    const [password, Set_password] = useState("");
    const [email, Set_email] = useState("");
    const [confirmed_password, Set_confirmed_password] = useState("");
    const [error, set_error] = useState("");

    let history = useHistory();

    const handle_submit = (e)=>{

        e.preventDefault();

        console.log(" register method is called  ")
        axios.post('http://localhost:5000/users/register', {username, email, password, confirmed_password})
            .then(res=>{
                console.log(res);
                // this code so the users can be log in automatically when they register.
                axios.post("http://localhost:5000/users/login",{username,password})
                    .then(res2=>{
                        localStorage.setItem("token", res2.data.token)
                        history.push("/");
                        history.go(0);
                    })
                    .catch(err=>{
                        console.log(err.message)
                    })


            })
            .catch(err=>{
                console.log(err.response.data.msg)
                set_error(err.response.data.msg);

            })

    }


    return(
        <div>
            <div className={"label"}>
                <h3 className={"label_text"}> Register Form </h3>
            </div>
            <form className={"register_form"} onSubmit={handle_submit}>
                <input className={"email"} type={"text"} placeholder={"Enter Email"} onChange={(e)=>Set_email(e.target.value)}/>
                <input className={"username"} type={"text"} placeholder={"Enter username"} onChange={(e)=>Set_username(e.target.value)}/>
                <input className={"password"} type={"password"} placeholder={"Enter password"} onChange={(e)=>Set_password(e.target.value)}/>
                <input className={"confirmed_password"} type={"password"} placeholder={"Confirm password"}onChange={(e)=>Set_confirmed_password(e.target.value)}/>
                <input className={"submit"} type={"submit"} value={"Register"}/>

            </form>

            <h5 style={{color: "red"}}> {error} </h5>



        </div>
    )
}
export default Register
