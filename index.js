const cors = require("cors");
require("dotenv").config();
const chalk = require("chalk");
const express = require("express");
const app = express();
exports.app = app;
const postRouter = require("./routers/postRouter.js");
const authRouter = require("./routers/authRouter");

// mongodb setup
const connectWithRetry = require("./mongo.js");
connectWithRetry();

console.log(chalk.inverse.red("index.js is run again"));
console.log("app app app : ", app);

// redis setup with express-session
const { redisSetup, redisStore } = require("./redis");
redisSetup();

app.enable("trust proxy");
const os = require("os");
// app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Home page");
});
app.get("/api/v1", (req, res) => {
  console.log(chalk.inverse.cyan(`${os.hostname()} : Hello world`));
  res.send(`${os.hostname()} : Hello Hello world`);
});
app.get("/api/v1/hello", (req, res) => {
  console.log(chalk.inverse.cyan(`${os.hostname()} : Hello world`));
  res.send(`${os.hostname()} : Hello Hello world`);
});

app.use("/api/v1/post", postRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
