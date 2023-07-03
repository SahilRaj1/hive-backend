const Post = require(`${__dirname}/../models/PostModel`);
const Like = require(`${__dirname}/../models/LikeModel`);
const Comment = require(`${__dirname}/../models/CommentModel`);

// GET /posts : Retrieve a list of all posts (Login Required)
exports.fetchAllPosts = async (req, res) => {
    try {

        let success = false;

        // finding all posts
        const posts = await Post.find();
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

// POST /posts : Create a new post (Login Required)
exports.createPost = async (req, res) => {
    try {

        let success = false;

        const { caption } = req.body;

        // creating new post object
        const post = new Post({
            caption,
            img: req.file.filename,
            user_id: req.user.id,
        });

        const savedPost = await post.save();
        success = true;

        // sending response
        res.status(201).json({
            success,
            data: {
              savedPost,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// GET /posts/:id : Retrieve a specific post by id (Login Required)
exports.fetchPost = async (req, res) => {
    try {
        
        let success = false;

        // finding the post to be fetched
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Not Found");
        }

        success = true;

        // sending response
        res.status(200).json({
            success,
            data: {
              post,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// PUT /posts/:id : Update a specific post by id (Login Required)
exports.updatePost = async (req, res) => {
    try {

        success = false;

        const { caption } = req.body;
        const newPost = {};

        newPost.caption = caption;
        newPost.updated_on = Date.now();
        console.log(req.body);

        // finding the post to be updated
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Not found");
        }

        // checking if a user is updating someone else's post
        if (post.user_id.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // updating the post
        post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: newPost },
            { new: true }
        );

        success = true;

        // sending response
        res.status(202).json({
            success,
            data: {
              post,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// DELETE /posts/:id : Delete a specific post by id (Login Required)
exports.deletePost = async (req, res) => {
    try {

        let success = false;

        // finding the post to be deleted
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Not found");
        }

        // checking if a user is deleting someone else's post
        if (post.user_id.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // deleting all the likes and comments on the post
        Like.deleteMany({post_id: req.params.id});
        Comment.deleteMany({post_id: req.params.id});

        // deleting the post
        post = await Post.findByIdAndDelete(req.params.id);
        success = true;

        // sending response
        res.status(200).json({
            success,
            data: {
              post,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};
