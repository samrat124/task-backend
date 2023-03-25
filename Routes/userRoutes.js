

const express=require("express");
const { Register, login, logged_out } = require("../Controller/userController");

const userrouter=express.Router();


userrouter.post("/register",Register);
userrouter.post("/login",login);
userrouter.get("/logout",logged_out)


module.exports={
    userrouter
}

