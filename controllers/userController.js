const User = require(`${__dirname}/../models/UserModel`);

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
            },
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send("User not found");
        }
        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: 1,
            data: {
                user,
            },
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}

exports.updateMe = async (req, res) => {
    try {
        const { name, email, username, profile_pic, bio } = req.body;
        const newUser = {};
        if (name) {
            newUser.name = name;
        }
        if (email) {
            newUser.email = email;
        }
        if (username) {
            newUser.username = username;
        }
        if (profile_pic) {
            newUser.username = profile_pic;
        }
        if (bio) {
            newUser.bio = bio;
        }
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("Not Found");
        }
        // Checking if a user is updating someone else's note
        if (user._id.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: newUser },
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser,
            },
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
}
exports.deleteUser = async (req, res) => {
    try{
        let userDel = await User.findById(req.params.id);
        if (!userDel) {
            return res.status(404).send("Not Found");
        }
        if (req.user.id != req.params.id) {
            res.status(404).send("Not allowed");
        }
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
    
}