const Posts = require('../models/Posts');

/* function to create a post */
const createPost = async (req, res) => {
// TODO: post might need a location filter function
  try {
    const posts = await Posts.create({
      ...req.body,
      author: req.user.id,
    });
    return res.status(201).json({ message: 'Post created', posts });
  } catch (error) {
    return res.status(400).json({ message: 'Error creating Post', error: error.message });
  }
};

// TODO: function to edit a post
const editPost = async (req, res) => {
  try {
    const editPosts = await Posts.findByIdAndUpdate(
      req.params.postsId,
      req.body,
    );
    return res.status(201).json(editPosts);
  } catch (error) {
    return res.status(400).json({ message: 'error editing post', error });
  }
};
// TODO: function to delete a post

// TODO: function to show all posts in my area

// TODO: function to comment on a post

module.exports = { createPost, editPost };
