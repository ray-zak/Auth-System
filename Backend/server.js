import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import Users_Routes from "./api_Routes/Users_Routes.js";


const app =express();

const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cors());

// mongoose connection
mongoose.connect(process.env.CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})




app.get("/", (req,res)=>{
    console.log("server is running ")
})


app.use("/users", Users_Routes)


app.listen(port, ()=>{
    console.log("server running on port:"+ port)
})

export default app;




