const express = require("express");
const router = express.Router();
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);
const postController = require(`${__dirname}/../controllers/postController`);

router.get("/", fetchUser, postController.fetchAllPosts);
router.get("/:user_id", fetchUser, postController.fetchAllPostsOfUser);
router.get("/:id", fetchUser, postController.fetchPost);
router.put("/:id", fetchUser, postController.updatePost);
router.delete("/:id", fetchUser, postController.deletePost);

module.exports = router;
