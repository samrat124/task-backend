

const mongoose=require("mongoose");
require('dotenv').config()
const env=process.env
const ConnectDataBase=async()=>{

    let result=await mongoose.connect(env.DB_CONNECTION_URL);
     

    return result;

}

module.exports={
    ConnectDataBase
}