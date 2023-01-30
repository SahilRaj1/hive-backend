const express = require("express");
const router = express.Router();
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);
const postController = require(`${__dirname}/../controllers/postController`);

router.get("/", postController.fetchAllPosts);
router.get("/:id", fetchUser, postController.fetchPost);

module.exports = router;
