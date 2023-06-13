const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/user");
const songRouter = require("./routes/song");
const albumRouter = require("./routes/album");
const cors = require("cors");
require("dotenv").config();

// DB Connection
connectDB();

// Express Server Creation
const app = express();

app.use(express.json());
app.use(cors());

// Main Route
app.post("/");

// User Routes
app.use("/user", userRouter);
app.use("/song", songRouter);
app.use("/album", albumRouter);

// Starting Server
connectDB().then(() =>
  app.listen(process.env.PORT, () => console.log(`Server & MongoDB is Ready`))
);
