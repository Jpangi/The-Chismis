/* ---IMPORTS--- */
require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');

const user = require('./server/routes/user');
const posts = require('./server/routes/Posts');

/* ---MIDDLEWARE--- */
app.use(express.json());

app.use('/users', user);
app.use('/posts', posts);
/* ---DB CONNECTION--- */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const { PORT } = process.env;

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
