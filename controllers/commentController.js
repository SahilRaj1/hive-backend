const Comment = require(`${__dirname}/../models/CommentModel`);
const Post = require(`${__dirname}/../models/PostModel`);

// GET /posts/:id/comments : Retrieve a list of all comments on a specific post (Login Required)
exports.fetchCommentsOnPost = async (req, res) => {
    try {

        // finding the comments on a post
        const comments = await Comment.find({
            post_id: req.params.id,
        });

        // sending response
        res.status(200).json({
            status: 'success',
            results: comments.length,
            data: {
              comments,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// POST /posts/:id/comments : Add a comment on a specific post (Login Required)
exports.addComment = async (req, res) => {
    try {

        const { text } = req.body;

        // creating new comment object
        const comment = {
            text,
            user_id: req.user.id,
            post_id: req.params.id,
        }

        const savedComment = await comment.save();

        // sending response
        res.status(201).json({
            status: 'success',
            results: 1,
            data: {
              savedComment,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// PUT /posts/:id/comments/:comment_id : Update a specific comment on a specific post (Login Required)
exports.updateComment = async (req, res) => {
    try {

        const { text } = req.body;
        const newComment = {};

        newComment.text = text;
        newComment.updated_on = Date.now();

        // finding the comment to be updated
        let comment = await Comment.findById(req.params.comment_id);
        if (!comment) {
            return res.status(404).send("Not found");
        }

        // checking if a user is updating someone else's comment
        if (comment.user_id.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // updating the comment
        comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: newComment },
            { new: true }
        );

        // sending response
        res.status(202).json({
            status: 'success',
            results: 1,
            data: {
              comment,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

// DELETE /posts/:id/comments/:comment_id : Delete a specific comment on a specific post. (Login Required)
exports.deleteComment = async (req, res) => {
    try {

        // finding the comment to be deleted
        const comment = await Comment.findById(req.params.comment_id);
        if (!comment) {
            return res.status(404).send("Not found");
        }

        // post user deleting comment
        const post = Post.findById(comment.post_id);

        // checking if a user is deleting someone else's comment
        if (comment.user_id.toString() !== req.user.id || post.user_id.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // deleting the post
        comment = await Comment.findByIdAndDelete(req.params.comment_id);

        // sending response
        res.status(200).json({
            status: 'success',
            results: 1,
            data: {
              comment,
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};
