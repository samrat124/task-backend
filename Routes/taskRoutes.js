

 


const express=require("express");
const { getTaskofuser, create_task } = require("../Controller/taskController");
const { Auth } = require("../middleware/Auth");


const taskrouter=express.Router();


taskrouter.get("/getusertask",Auth,getTaskofuser);
taskrouter.post("/createtask/:id",Auth,create_task);

 


module.exports={
    taskrouter
}

