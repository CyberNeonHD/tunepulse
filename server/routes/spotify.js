// server/routes/spotify.js
const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET /api/spotify/top-artists
router.get("/top-artists", async (req, res) => {
  const accessToken = req.cookies.spotify_access_token;

  if (!accessToken) {
    return res.status(401).json({
      ok: false,
      error: "NO_TOKEN",
      message: "No Spotify access token found. Try logging in again.",
    });
  }

  // query params uit frontend
  const timeRange = req.query.time_range || "medium_term"; // short_term | medium_term | long_term
  const limitParam = parseInt(req.query.limit, 10);
  const limit = Number.isNaN(limitParam) ? 50 : Math.min(Math.max(limitParam, 1), 100);

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          time_range: timeRange,
          limit,
        },
      }
    );

    const items = response.data.items || [];
    const total = typeof response.data.total === "number"
      ? response.data.total
      : items.length;

    return res.json({
      ok: true,
      items,
      total,
      time_range: timeRange,
    });
  } catch (err) {
    console.error(
      "Error fetching top artists:",
      err.response?.data || err.message
    );

    const status = err.response?.status || 500;

    return res.status(status).json({
      ok: false,
      error: "SPOTIFY_API_ERROR",
      status,
      details: err.response?.data || null,
      message: "Failed to fetch top artists from Spotify",
    });
  }
});

module.exports = router;