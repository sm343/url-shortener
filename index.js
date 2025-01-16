const express = require("express");

const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/urlShortener').then(() =>
  console.log("Connected to MongoDB")
);

app.use("/url", urlRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
