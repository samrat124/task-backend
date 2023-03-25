const { Task } = require("../models/taskModel");
const { User } = require("../models/userModel");


const getTaskofuser = async (req, res, next) => {

    try {
        console.log(1);
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }
        const tasks = user.tasks;
        
        return res.status(200).send({
            success: true,
            tasks
        })
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}
const create_task = async (req, res, next) => {
    try {
        const obj = {
            "title": req.body.title,
            "assignee": req.params.id,
            "owner": req.user._id,
            "sprint": req.body.sprint,
            "status": req.body.status
        }

        const task = await Task.create(obj);

        let user=await User.findById(req.params.id);

        user.tasks.push(task);

        await user.save();

        return res.status(201).send({
            success:true,
            message:"task created"
        })

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}
module.exports={
    getTaskofuser,create_task

}