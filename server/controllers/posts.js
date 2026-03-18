const Posts = require('../models/Posts');

const createPost = async (req, res) => {
  const {
    title, body, latitude, longitude,
  } = req.body;
  try {
    const posts = await Posts.create({
      title,
      body,
      author: req.user.id,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });
    return res.status(201).json({ message: 'Post created', posts });
  } catch (error) {
    return res.status(400).json({ message: 'Error creating Post', error: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const editPosts = await Posts.findByIdAndUpdate(
      req.params.postsId,
      req.body,
    );
    return res.status(201).json(editPosts);
  } catch (error) {
    return res.status(400).json({ message: 'Error editing post', error });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletePosts = await Posts.findByIdAndDelete(
      req.params.postsId,
      req.body,
    );
    return res.status(201).json(deletePosts);
  } catch (error) {
    return res.status(400).json({ message: 'Error deleting posts', error });
  }
};

const getPosts = async (req, res) => {
/**
 * Pull latitude and longitude from the URL query params
 * e.g. GET /posts?latitude=37 .7749&longitude=-122.4194
*/
  const { latitude, longitude } = req.query;
  try {
    const posts = await Posts.find({
    // Filter by the "location" field in our schema
      location: {
        /**
        * $near is a MongoDB operator that finds documents near a point
        * and automatically sorts them closest to farthest
        */
        $near: {
        // $geometry defines the reference point to search from
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          // only returns posts within 5km of the user
          $maxDistance: 5000,
        },
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ message: 'Error finding posts', error });
  }
};

// TODO: function to comment on a post

module.exports = {
  createPost, editPost, deletePost, getPosts,
};
