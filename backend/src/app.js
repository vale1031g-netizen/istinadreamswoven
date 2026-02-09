const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

app.get("/", (req, res) => {
  res.send("API Tina's Dreams Woven funcionando");
});

module.exports = app;
