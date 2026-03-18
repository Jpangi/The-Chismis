const express = require('express');

const router = express.Router();
const { createPost, editPost, deletePost } = require('../controllers/posts');

router.post('/create', createPost);
router.post('/edit', editPost);
router.post('/delete', deletePost);

module.exports = router;
