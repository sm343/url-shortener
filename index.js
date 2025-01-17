const express = require("express");

const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/urlShortener').then(() =>
  console.log("Connected to MongoDB")
);

app.use(express.json());

app.get('/:shortId', async (req, res) =>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push: {visitHistory: {timestamp: Date.now()}}});
    res.redirect(entry.originalUrl);
})

app.use("/url", urlRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
