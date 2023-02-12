const express = require("express");
const router = express.Router();
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);
const postController = require(`${__dirname}/../controllers/postController`);
const upload = require(`${__dirname}/../middlewares/uploadImage`);

router.get("/", fetchUser, postController.fetchAllPosts);
router.post("/", fetchUser, upload.single("img"), postController.createPost);
router.get("/:id", fetchUser, postController.fetchPost);
router.put("/:id", fetchUser, postController.updatePost);
router.delete("/:id", fetchUser, postController.deletePost);

module.exports = router;
