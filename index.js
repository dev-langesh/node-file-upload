const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const { connectDB } = require("./config/db");
const path = require("node:path");

const whiteList = [
  "https://www.google.com",
  "http://127.0.0.1:3000",
  "[::1]:3000",
  "http://localhost:8000",
];

//configuring dotenv
require("dotenv").config();

const PORT = process.env.PORT || 8080;

//connect to db
connectDB();

//initializing app
const app = express();

//configuringcors
app.use(
  cors({
    origin: (origin, cb) => {
      if (
        whiteList.indexOf(origin) !== -1 ||
        (process.env.NODE_ENV === "developement" ? !origin : null)
      ) {
        cb(null, true);
        return;
      } else {
        console.log("origin " + origin);
        cb(new Error("Access Denied"), false);
      }
    },
    optionsSuccessStatus: 200,
  })
);

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: 1024 * 1024 * 5,
}).single("image");

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views/index.html"));
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) throw err;
    console.log(req.file);
  });
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
