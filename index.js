const express = require("express");
const connectDB = require("./db/db.connect");
const cors = require("cors");
const app = express();

const auth = require("./routes/auth");
const users = require("./routes/user");
const admin = require("./routes/admin");

app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("Shree Krishna");
});

app.use("/users", users);
app.use("/", auth);
app.use("/admin", admin);

const port = 8000;

app.listen(port, () => {
  console.log("server has started");
});
