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

        // creating new like object
        const like = {
            user_id: req.user.id,
            post_id: req.params.id,
        }

        const savedLike = await like.save();

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

// DELETE /posts/:id/like/:like_id : Unlike a specific post (Login Required)
exports.unlikePost = async (req, res) => {
    try {
        
        // finding the like to be deleted
        const like = await post.findById(req.params.like_id);
        if (!like) {
            return res.status(404).send("Not found");
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
