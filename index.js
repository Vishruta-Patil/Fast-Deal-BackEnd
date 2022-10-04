const express = require("express");
const connectDB = require("./db/db.connect");
const cors = require("cors");
const corsOptions = require("./utils/utilsConfig");

const auth = require("./routes/auth");
const users = require("./routes/user");
const admin = require("./routes/admin");

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
connectDB();

app.get("/", (req, res) => {
  res.send("Shree Krishna");
});

app.use("/users", users);
app.use("/", auth);
app.use("/admin", admin);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("server has started");
});
