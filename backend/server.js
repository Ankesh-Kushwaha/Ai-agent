require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


app.use(cors());
app.use(express.json());

//connectToDB();
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(err => {
    console.log(err.message);
  });


app.listen(3000, () => {
  console.log(`server is running at ${process.env.APP_URL}`);
})