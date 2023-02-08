const express = require('express');
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);
const userController = require(`${__dirname}/../controllers/userController`);

const router = express.Router();

// GET
router.get("/:id/follower-list", fetchUser, userController.followerList);
router.get("/:id/following-list", fetchUser, userController.followingList);

// PUT
router.put("/follow", fetchUser, userController.follow);
router.put("/remove-follower", fetchUser, userController.removeFollower);
router.put("/:id/unfollow", fetchUser, userController.unfollow);

module.exports = router;