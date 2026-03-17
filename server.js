/*---IMPORTS---*/
const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
/*---MIDDLEWARE---*/

app.use(express.json());
/*---DB CONNECTION---*/
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
