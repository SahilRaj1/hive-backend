const Post = require(`${__dirname}/../models/PostModel`);

// Retrieve a list of all posts
exports.fetchAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};
