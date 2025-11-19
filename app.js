const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to the Genius Hire API!!!!!");
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
