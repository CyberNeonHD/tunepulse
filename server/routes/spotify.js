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

  try {
    // Spotify API heeft max 50 items per request
    // Dus voor top 100: doen we 2 requests (offset 0 en offset 50)
    const [response1, response2] = await Promise.all([
      axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          time_range: timeRange,
          limit: 50,
          offset: 0,
        },
      }),
      axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          time_range: timeRange,
          limit: 50,
          offset: 50,
        },
      }),
    ]);

    // Combineer de resultaten
    const items1 = response1.data.items || [];
    const items2 = response2.data.items || [];
    const allItems = [...items1, ...items2];

    const total = typeof response1.data.total === "number"
      ? response1.data.total
      : allItems.length;

    return res.json({
      ok: true,
      items: allItems,
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