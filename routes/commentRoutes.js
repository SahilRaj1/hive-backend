const express = require('express');
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);
const commentController = require(`${__dirname}/../controllers/commentController`);

const router = express.Router();

router.get("/:id/comments", fetchUser, commentController.fetchCommentsOnPost);
router.post("/:id/comments", fetchUser, commentController.addComment);
router.put("/:id/comments/:comment_id", fetchUser, commentController.updateComment);
router.delete("/:id/comments/:comment_id", fetchUser, commentController.deleteComment);

module.exports = router;
