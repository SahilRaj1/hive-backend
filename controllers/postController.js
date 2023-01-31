const Post = require(`${__dirname}/../models/PostModel`);

// GET /posts : Retrieve a list of all posts (Login Required)
exports.fetchAllPosts = async (req, res) => {
    try {

        const posts = await Post.find();

        // sending response
        res.status(200).json({
            status: 'success',
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

// GET /posts/:user_id : Retrieve a list of all posts by a specific user (Login Required)
exports.fetchAllPostsOfUser = async (req, res) => {
    try {

        // finding posts by the specified user
        const posts = await Post.find({user_id: req.params.user_id});

        // sending response
        res.status(200).json({
            status: 'success',
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

// GET /posts/:id : Retrieve a specific post by id (Login Required)
exports.fetchPost = async (req, res) => {
    try {

        // finding the post to be fetched
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Not Found");
        }

        // sending response
        res.status(200).json({
            status: 'success',
            results: 1,
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

        const { caption } = req.body;
        const newPost = {};

        if (caption) {
            newPost.caption = caption;
            newPost.updated_on = Date.now();
        }

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

        // sending response
        res.status(202).json({
            status: 'success',
            results: 1,
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

        // finding the post to be deleted
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Not found");
        }

        // deleting the post
        post = Post.findByIdAndDelete(req.params.id);

        // sending response
        res.status(200).json({
            status: 'success',
            results: 1,
            data: {
              post,
            },
          });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};
