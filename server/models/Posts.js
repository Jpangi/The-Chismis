const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model('Posts', PostSchema);
module.exports = Posts;
