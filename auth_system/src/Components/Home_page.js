import React, {useEffect, useState} from "react";
import axios from "axios";


const Home_page = ()=>{

    const [username, set_username] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:5000/users/loggeduserinfo",{headers: {authorization: localStorage.getItem("token")}})
            .then(res=>{
                console.log(res.data)
                set_username(res.data.Username);

            })
            .catch(err=>{
                console.log(err.message)
            })
    },[])

    return(
        <div>

                <div style={{marginTop:"70px"}}>
                    <h1> Welcome {username} </h1>
                    <h5> This is your home page </h5>

                </div>


        </div>
    )
}

export default Home_page
