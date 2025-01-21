const express = require("express");

const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const path = require("path");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/urlShortener").then(() =>
  console.log("Connected to MongoDB")
);

app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home",{
    urls:allUrls,
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
  res.redirect(entry.originalUrl);
});

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
