// server/routes/spotify.js
const express = require("express");
const axios = require("axios");

const router = express.Router();

// Helper function to process items in batches to avoid rate limiting
async function processBatches(items, batchSize, processFunc) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processFunc));
    results.push(...batchResults);
    // Small delay between batches to avoid rate limiting
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  return results;
}

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

    // Fetch top track and latest album for each artist in batches to avoid rate limiting
    const enrichArtist = async (artist) => {
      try {
        // Fetch top tracks and albums in parallel for this artist
        const [topTracksRes, albumsRes] = await Promise.all([
          axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { market: "US" },
          }).catch((err) => {
            console.error(`Failed to fetch top tracks for ${artist.name}:`, err.response?.status || err.message);
            return null;
          }),
          axios.get(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {
              include_groups: "album,single",
              limit: 50,
            },
          }).catch((err) => {
            console.error(`Failed to fetch albums for ${artist.name}:`, err.response?.status || err.message);
            return null;
          }),
        ]);

        // Get the top track (first one is most popular)
        const topTrack = topTracksRes?.data?.tracks?.[0] || null;

        // Get the latest album (sort by release_date descending)
        const albums = albumsRes?.data?.items || [];
        const sortedAlbums = [...albums].sort((a, b) => {
          const dateA = new Date(a.release_date || "1900-01-01");
          const dateB = new Date(b.release_date || "1900-01-01");
          return dateB - dateA;
        });
        const latestAlbum = sortedAlbums[0] || null;

        return {
          ...artist,
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
        // If fetching extra data fails, return artist without enrichment
        console.error(`Error enriching artist ${artist.id}:`, err.message);
        return {
          ...artist,
          topTrack: null,
          latestAlbum: null,
        };
      }
    };

    // Process in batches of 10 to avoid rate limiting
    const enrichedItems = await processBatches(allItems, 10, enrichArtist);

    const total = typeof response1.data.total === "number"
      ? response1.data.total
      : enrichedItems.length;

    return res.json({
      ok: true,
      items: enrichedItems,
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