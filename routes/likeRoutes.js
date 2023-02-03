const express = require('express');
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);
const likeController = require(`${__dirname}/../controllers/likeController`);

const router = express.Router();

router.get("/:id/likes", fetchUser, likeController.fetchLikesOnPost);
router.post("/:id/likes", fetchUser, likeController.likePost);
router.delete("/:id/likes/:like_id", fetchUser, likeController.unlikePost);

module.exports = router;
