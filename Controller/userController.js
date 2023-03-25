
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const Token = (user) => {

    // let {_id,name,email}=user;

    const token = jwt.sign({ _id: user._id }, "pranav122");

    return token;

}

const Register = async (req, res, next) => {

    try {

        let { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(500).send({
                success: false,
                message: "email id already exist"
            })
        }

        password = bcrypt.hashSync(password);

        user = await User.create({
            name, email, password, avatar: {

                public_id: "Sample_id",
                url: "Sample url"

            }
        });

        const token = Token(user);

        let options = { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), httpOnly: true, sameSite: "none", secure: true };


        return res.cookie("token", token, options).status(201).send({
            success: true,
            message: "Registration Successful",
            token,
            user
        })




    }

    catch (err) {

        return res.status(500).send({
            message: err.message
        });


    }


}

const login = async (req, res, next) => {

    try {

        let { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {

            return res.status(401).send({
                success: false,
                message: "email id not exist"
            })

        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "password wrong"
            })

        }

        const token = Token(user);

        let options = { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), httpOnly: true };




        return res.status(201).cookie("token", token, options).send({
            success: true,
            message: "Login Successful",
            token,
            user
        })

    } catch (err) {

        return res.status(500).send({
            message: err.message
        })

    }



}


const logged_out = async (req, res, next) => {

    try {

        return res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).send({

            success: true,
            message: "Logged out"

        })


    } catch (err) {

        return res.status(500).send({
            success: false,
            message: err.message
        })

    }



}

const update_password = async (req, res, next) => {

    try {

        if (!old_password || !new_password) {
            return res.status(401).send({
                success: false,
                message: "Please Provide old password and new password"
            })
        }

        let { old_password, new_password } = req.body;

        let user = await User.findById(req.user._id);

        if (!bcrypt.compareSync(old_password, user.password)) {

            return res.status(401).send({
                success: false,
                message: "old password wrong"
            })
        }

        let password_new = bcrypt.hashSync(new_password);

        user.password = password_new;

        user.save();

        return res.status(201).send({
            success: true,
            message: "password updated successfully"
        })


    } catch (err) {

        return res.status(500).send({
            success: false,
            message: err.message
        })

    }


}
const update_profile = async (req, res, next) => {

    try {

        let { name, email } = req.body;

        let user = await User.findById(req.user._id);

        if (name) {
            user.name = name
        }
        if (password) {
            user.email = email
        }
        return res.status(201).send({
            success: true,
            message: "Profile Update Successfully"
        })


    } catch (err) {

        return res.status(500).send({
            success: false,
            message: err.message
        })

    }
}

module.exports = {
    Register, login, logged_out, update_password, update_profile
}