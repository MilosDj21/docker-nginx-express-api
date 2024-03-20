const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_DB_NAME } = require("./config/config");

const app = express();

app.get("/", (req, res) => {
  res.send("Response from express");
});

const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://mongo:27017", {
    dbName: MONGO_DB_NAME,
    user: MONGO_USER,
    pass: MONGO_PASSWORD,
  })
  .then(() => {
    console.log("Connected to db");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log(err));
