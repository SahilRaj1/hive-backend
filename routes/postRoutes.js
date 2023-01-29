const express = require('express');
const router = express.Router();
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);
const postController = require(`${__dirname}/../controllers/postController`);

router.get('/', postController.fetchAllPosts);

module.exports = router;