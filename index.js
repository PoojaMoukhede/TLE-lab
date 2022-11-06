const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const login = require("./routes/login");
const register = require("./routes/register");
const cors = require("cors");


const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://pooja:pooja@cluster0.bffzfz6.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Database Connected");
  }
);

app.use(express.json());
app.use(bodyParser.json());
app.use("/login", login);
app.use("/register", register);

app.get("/", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "hello",
  });
});

app.listen(PORT, () => {
console.log(`Server is up at ${PORT}`);
});
