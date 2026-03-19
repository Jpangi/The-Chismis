const express = require('express');
const protect = require('../middleware/auth');

const router = express.Router();
const { createPost, editPost, deletePost } = require('../controllers/posts');

router.post('/create', protect, createPost);
router.post('/edit', protect, editPost);
router.post('/delete', protect, deletePost);

module.exports = router;
