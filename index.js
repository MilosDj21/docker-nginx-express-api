const express = require("express");
const mongoose = require("mongoose");

const { MONGO_USER, MONGO_PASSWORD, MONGO_DB_NAME } = require("./config/config");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);

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
