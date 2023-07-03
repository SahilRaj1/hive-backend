const User = require(`${__dirname}/../models/UserModel`);
const Post = require(`${__dirname}/../models/PostModel`);

// GET /users : Retrieve a list of all users (login required)
exports.getAllUsers = async (req, res) => {
    try {

        let success = false;

        const users = await User.find();
        success = true;

        //SEND RESPONSE
        res.status(200).json({
            success,
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

// GET /users/:id : Retrieve a specific user by id (login required)
exports.getUser = async (req, res) => {
    try {

        let success = false;

        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send("User not found");
        }

        success = true;

        //SEND RESPONSE
        res.status(200).json({
            success,
            data: {
                user,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}

// PUT /users/:id : Update a specific user by id (login required)
exports.updateMe = async (req, res) => {
    try {

        let success = false;

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
        
        newUser.updated_on = Date.now();

        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("Not Found");
        }

        if (user._id.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: newUser },
            { new: true }
        );

        success = true;

        res.status(200).json({
            success,
            data: {
                user: updatedUser,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}

// DELETE /users/:id : Delete a specific user by id (login required)
exports.deleteUser = async (req, res) => {
    try {

        let success = false;

        let userDel = await User.findById(req.params.id);

        if (!userDel) {
            return res.status(404).send("Not Found");
        }

        if (req.user.id != req.params.id) {
            res.status(404).send("Not allowed");
        }

        const posts = await Post.deleteMany({ user_id: req.params.id });
        const user = await User.findByIdAndDelete(req.params.id);
        success = true;

        res.status(204).json({
            success,
            data: {
                user,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}

// GET /users/:id/posts : Retrieve a list of all posts by a specific user (Login Required)
exports.fetchAllPostsOfUser = async (req, res) => {
    try {
        
        let success = false;

        // finding posts by the specified user
        const posts = await Post.find({user_id: req.params.id});
        success = true;

        // sending response
        res.status(200).json({
            success,
            results: posts.length,
            data: {
              posts,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// PUT /users/follow : Add a follower to a specific user (A)
exports.follow = async (req, res) => {
    try {

        let success = false;

        // find the user 
        const follow_user = await User.findById(req.body.follow_user);
        if (!follow_user) {
            return res.status(404).send("User not found!");
        }

        // check if the user is already following
        const exists = await User.find({ _id: req.user.id, following: req.body.follow_user }).count();
        if (exists) {
            return res.status(404).send("You are already following the user!");
        }

        // update following
        const follow = await User.findByIdAndUpdate({ _id: req.user.id }, { $push: { following: req.body.follow_user } });

        // update followers of the other user
        const follow2 = await User.findByIdAndUpdate({ _id: req.body.follow_user }, { $push: { followers: req.user.id } });

        success = true;

        res.status(200).json({
            status: 'success',
            data: {
                user: follow,
                user2: follow2
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}

// PUT /users/remove-follower : Remove follower from the follwers list of a current user
exports.removeFollower = async (req, res) => {
    try {

        let success = false;

        const follow_user = await User.findById(req.body.follow_user);
        if (!follow_user) {
            return res.status(404).send("User not found!");
        }

        // check if the user is in following or not
        const exists = await User.find({ _id: req.user.id, followers: req.body.follow_user }).count();
        console.log(exists);
        if (!exists) {
            return res.status(404).send("This user is not your follower!");
        }
        // update followers
        const follow = await User.findByIdAndUpdate({ _id: req.user.id }, { $pull: { followers: req.body.follow_user } });

        // update followers of the other user
        const follow2 = await User.findByIdAndUpdate({ _id: req.body.follow_user }, { $pull: { following: req.user.id } });

        success = true;

        res.status(200).json({
            success,
            data: {
                user: follow,
                user2: follow2
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}

// PUT /users/unfollow : unfollow a user
exports.unfollow = async (req, res) => {
    try {

        let success = false;

        const follow_user = await User.findById(req.body.follow_user);
        if (!follow_user) {
            return res.status(404).send("User not found!");
        }

        // check if the current user follows the follow_user
        const exists = await User.find({ _id: req.user.id, following: req.body.follow_user }).count();
        console.log(exists);
        if (!exists) {
            return res.status(404).send("This user is not your follower!");
        }
        // update followers
        const follow = await User.findByIdAndUpdate({ _id: req.user.id }, { $pull: { following: req.body.follow_user } });

        // update followers of the other user
        const follow2 = await User.findByIdAndUpdate({ _id: req.body.follow_user }, { $pull: { followers: req.user.id } });

        success = true;

        res.status(200).json({
            success,
            data: {
                user: follow,
                user2: follow2
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}

// GET /users/follower-list : Get the list of followers
exports.followerList = async (req, res) => {
    try {
        let success = false;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found!");
        }
        success = true;
        res.status(200).json({
            success,
            data: {
                followers: user.followers
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}

// GET /users/following-list : Get the list of following
exports.followingList = async (req, res) => {
    try {
        let success = false;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found!");
        }
        success = true;
        res.status(200).json({
            status: 'success',
            data: {
                following: user.following
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}