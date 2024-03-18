const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Response from express");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
