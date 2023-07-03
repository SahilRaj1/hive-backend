const User = require(`${__dirname}/../models/UserModel`);
const bcrypt = require("bcrypt");
const signToken = require(`${__dirname}/../utils/token`);
const env = require('dotenv');
env.config({ path: `${__dirname}/../.env` })

const saltRounds = process.env.SALT_ROUNDS;

// POST /auth/signup : Register a new user
exports.signup = async (req, res) => {
    try {

        let success = false;

        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username) {
            return res
                .status(400)
                .json({ success, message: "Please provide all the fields." });
        }

        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);

        const user = await User.findOne({ username });
        const mail = await User.findOne({ email });
        if (user) {
            return res
                .status(200)
                .json({ success, message: "the username is already in use" });
        }
        if (mail) {
            return res
                .status(200)
                .json({ success, message: "the email is already in use" });
        }
        const newUser = await User.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashedPwd,
            bio: req.body.bio,
        });

        const token = signToken(newUser._id);
        success = true;

        res.status(201).json({
            success,
            token
        });

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }
}

// POST /auth/login : Login a user
exports.login = async (req, res) => {
    try {

        let success = false;

        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ success, message: "Please provide all the fields." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ success, message: "Incorrect email or password!" });
        }
        const cmp = await bcrypt.compare(req.body.password, user.password);
        console.log(cmp);
        if (cmp) {
            const token = signToken(user._id);
            success = true;
            return res.status(201).json({
                success,
                token
            });
        } else {
            return res.status(500).json({ success, message: "Incorrect email or password!" });
        }


    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }
}

// PUT /auth/changePassword : Update the user password
exports.updatePassword = async (req, res) => {
    try {

        let success = false;

        const userData = await User.findById(req.user.id);
        if (!userData) {
            return res.status(500).json({ success, message: "Authentication failed!" });
        }

        const { newPass, currPass } = req.body;

        // check if the entered current password is correct or not
        const cmp = await bcrypt.compare(req.body.currPass, userData.password);
        if (!cmp) {
            return res.status(500).json({ message: "The current password is incorrect!" });
        }

        // check if the entered current password and new password are same or not
        if (newPass === currPass) {
            return res.status(500).json({ success, message: "New password cannot be equal to the old password!" });
        }

        // hash the new password
        const hashedPwd = await bcrypt.hash(newPass, saltRounds);

        //updating the user's password
        const newUser = {};
        newUser.password = hashedPwd;
        newUser.updated_on = Date.now();
        updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: newUser },
            { new: true }
        );

        res.status(200).json({ success, message: "Password changed successfully!" });

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }
}
