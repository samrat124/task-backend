
const express=require("express");
const cors=require("cors");

const { ConnectDataBase } = require("./models/db");
 
const cookieParser = require("cookie-parser");
const { userrouter } = require("./Routes/userRoutes");
const { taskrouter } = require("./Routes/taskRoutes");

const app=express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api",userrouter);
app.use("/api",taskrouter);


const PORT=3005;

ConnectDataBase().then(()=>{

    app.listen(PORT,()=>{

     console.log(`server is listening at ${PORT}`);
       
       })

})




