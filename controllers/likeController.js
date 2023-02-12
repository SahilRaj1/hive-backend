const Like = require(`${__dirname}/../models/LikeModel`);

// GET /posts/:id/likes : Retrieve a list of all users who liked a specific post (Login Required)
exports.fetchLikesOnPost = async (req, res) => {
    try {

        // finding the likes on a post
        const likes = await Like.find({
            post_id: req.params.id,
        });

        // sending response
        res.status(200).json({
            status: 'success',
            results: likes.length,
            data: {
              likes,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// POST /posts/:id/likes : Like a specific post (Login Required)
exports.likePost = async (req, res) => {
    try {

        // finding if like already exists
        const like = await Like.findOne({user_id: req.params.id});
        if (like) {
            return res.status(404).send("Already exists");
        }

        // creating new like object
        const newLike = new Like({
            user_id: req.user.id,
            post_id: req.params.id,
        });

        const savedLike = await newLike.save();

        // sending response
        res.status(201).json({
            status: 'success',
            results: 1,
            data: {
              savedLike,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// DELETE /posts/:id/likes/:like_id : Unlike a specific post (Login Required)
exports.unlikePost = async (req, res) => {
    try {
        
        // finding the like to be deleted
        const like = await Like.findById(req.params.like_id);
        if (!like) {
            return res.status(404).send("Not found");
        }

        // checking if a user is deleting someone else's like
        if (like.user_id.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // deleting the like
        like = await Like.findByIdAndDelete(req.params.like_id);

        // sending response
        res.status(200).json({
            status: 'success',
            results: 1,
            data: {
              like,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};
