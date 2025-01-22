const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");
const {restrictToLoggedInUserOnly,checkAuth} = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute= require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/urlShortener").then(() =>
  console.log("Connected to MongoDB")
);


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry?.originalUrl);
});

app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/",checkAuth, staticRoute);
app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
