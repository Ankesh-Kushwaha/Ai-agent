require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const finalRoute = require("./routes/routes");


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

app.use('/api/v1/',finalRoute); 

app.listen(PORT, () => {
  console.log(`server is running at ${process.env.APP_URL}`);
})