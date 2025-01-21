const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ message: "URL is required" });
  }
  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    originalUrl: body.url,
    visitHistory: [],
  });
  // return res.status(201).json({ id: shortId });
  return res.render("home", {
    id:shortId,
  })
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics
};
