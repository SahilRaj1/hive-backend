const Post = require(`${__dirname}/../models/PostModel`);

// GET /posts : Retrieve a list of all posts
exports.fetchAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// GET /posts/:id : Retrieve a specific post by id (Login Required)
exports.fetchPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Not Found");
        }
        res.json({ post });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};
