import express from "express";
import Users from "../DB_Schemas/User_Schema.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


export const router = express.Router();


//   // //  //  //  //  register router //  //  /// //  /// /// /// ///

router.post("/register", async(req,res)=>{
    try{
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const confirmed_password= req.body.confirmed_password;


        if(!password || !username || !email){
            res.status(400).json({msg: "All fields must be filled "})
        }

        if(confirmed_password !== password){
            res.status(400).json({msg: "Passwords don't match "})
        }
        if(password.length < 8){
            res.status(400).json({msg: "Password is too short. it should be 8 characters minimum "})
        }
         //checking existing user
        const existing_user = await Users.findOne({Email: email})
        const existing_user2 = await Users.findOne({Username: username})
        if(existing_user!== null || existing_user2!==null ){
            res.status(400).json({msg: "This email is already exist. please use a different email address or different username "})
        }
        //hashing the password
        const salt= await bcrypt.genSalt(8);
        const hashed_password = await bcrypt.hash(password, salt);


        const new_user = new Users({
            Username: username,
            Password: hashed_password,
            Email: email

        })
        console.log(new_user);

        const saved_user = await new_user.save();
        res.json(saved_user);

    }
    catch (err){
        res.status(500).json({msg: "server error"})
    }
})


//  /// /// ///     ///     /// //   login router       //    //  /// //  //      //          //  //

router.post("/login", async (req,res)=>{
    try{
    const username = req.body.username;
    const password= req.body.password;

    if(username===null || password=== null){
        res.status(400).json({msg: "invalid input "})

    }
    const find_existed_user = await Users.findOne({username: username});
    if(find_existed_user===null){
        res.status(400).json({msg: "username does not exist "})
    }

    const matching_password = await bcrypt.compare(password, find_existed_user.Password);

    if(matching_password===null){
        res.status(400).json({msg: "invalid password "});
    }
    const token = jwt.sign({id:find_existed_user._id} , process.env.JWT_SECRET)




        res.json({
            token,
            Username: find_existed_user.Username,
            Email: find_existed_user.Email,
            id: find_existed_user._id,
        })





    }
    catch (err){
        res.status(500).json({msg:err.message})
    }

})

router.get("/loggeduserinfo", (req,res)=>{

    try{

        console.log(req.headers.authorization)

        // verification that token is correct (instead of authmiddleware)
        const auth = req.headers.authorization;
        if(!auth){
            return res.status(401).json({msg: "no authentication"})
        }
        jwt.verify(auth, process.env.JWT_SECRET, (err,payload)=>{
            if(err){
                return res.status(401).json({ error: 'Token verification failed, authorization denied.' });
            }
            const {id}=payload;
            Users.findById(id).then(user=>{
                res.send(user);
            })
        })
    }
    catch (err){
        console.log(err.message)
    }
})






export default router;
