// server/routes/spotify.js
const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET /api/spotify/top-artists (fast - no enrichment)
router.get("/top-artists", async (req, res) => {
  const accessToken = req.cookies.spotify_access_token;

  if (!accessToken) {
    return res.status(401).json({
      ok: false,
      error: "NO_TOKEN",
      message: "No Spotify access token found. Try logging in again.",
    });
  }

  const timeRange = req.query.time_range || "medium_term";

  try {
    // Fetch top 100 artists (2 parallel requests)
    const [response1, response2] = await Promise.all([
      axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { time_range: timeRange, limit: 50, offset: 0 },
      }),
      axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { time_range: timeRange, limit: 50, offset: 50 },
      }),
    ]);

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
    console.error("Error fetching top artists:", err.response?.data || err.message);
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

// POST /api/spotify/artist-details (batch fetch top track + latest album)
router.post("/artist-details", async (req, res) => {
  const accessToken = req.cookies.spotify_access_token;

  if (!accessToken) {
    return res.status(401).json({
      ok: false,
      error: "NO_TOKEN",
      message: "No Spotify access token found. Try logging in again.",
    });
  }

  const { artistIds } = req.body;

  if (!Array.isArray(artistIds) || artistIds.length === 0) {
    return res.status(400).json({
      ok: false,
      error: "INVALID_REQUEST",
      message: "artistIds must be a non-empty array",
    });
  }

  try {
    const rateLimited = [];

    const results = await Promise.all(
      artistIds.map(async (artistId) => {
        try {
          const [topTracksRes, albumsRes] = await Promise.all([
            axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
              headers: { Authorization: `Bearer ${accessToken}` },
              params: { market: "US" },
            }).catch((err) => {
              if (err.response?.status === 429) {
                rateLimited.push({ artistId, endpoint: "top-tracks" });
                console.warn(`[Rate Limit] 429 for artist ${artistId} top-tracks`);
              }
              return null;
            }),
            axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
              headers: { Authorization: `Bearer ${accessToken}` },
              params: { include_groups: "album,single", limit: 50 },
            }).catch((err) => {
              if (err.response?.status === 429) {
                rateLimited.push({ artistId, endpoint: "albums" });
                console.warn(`[Rate Limit] 429 for artist ${artistId} albums`);
              }
              return null;
            }),
          ]);

          const topTrack = topTracksRes?.data?.tracks?.[0] || null;
          const albums = albumsRes?.data?.items || [];
          const sortedAlbums = [...albums].sort((a, b) => {
            const dateA = new Date(a.release_date || "1900-01-01");
            const dateB = new Date(b.release_date || "1900-01-01");
            return dateB - dateA;
          });
          const latestAlbum = sortedAlbums[0] || null;

          return {
            artistId,
            topTrack: topTrack ? {
              name: topTrack.name,
              id: topTrack.id,
              url: topTrack.external_urls?.spotify || null,
            } : null,
            latestAlbum: latestAlbum ? {
              name: latestAlbum.name,
              id: latestAlbum.id,
              releaseDate: latestAlbum.release_date || null,
              url: latestAlbum.external_urls?.spotify || null,
            } : null,
          };
        } catch (err) {
          return { artistId, topTrack: null, latestAlbum: null };
        }
      })
    );

    return res.json({ ok: true, results, rateLimited });
  } catch (err) {
    console.error("Error fetching artist details:", err.message);
    return res.status(500).json({
      ok: false,
      error: "SPOTIFY_API_ERROR",
      message: "Failed to fetch artist details",
    });
  }
});

// GET /api/spotify/top-tracks
router.get("/top-tracks", async (req, res) => {
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
      axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          time_range: timeRange,
          limit: 50,
          offset: 0,
        },
      }),
      axios.get("https://api.spotify.com/v1/me/top/tracks", {
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
      "Error fetching top tracks:",
      err.response?.data || err.message
    );

    const status = err.response?.status || 500;

    return res.status(status).json({
      ok: false,
      error: "SPOTIFY_API_ERROR",
      status,
      details: err.response?.data || null,
      message: "Failed to fetch top tracks from Spotify",
    });
  }
});

module.exports = router;