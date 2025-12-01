// server/routes/auth.js
const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET /api/auth/spotify  → redirect naar Spotify login
router.get("/spotify", (req, res) => {
  const scopes = [
    "user-top-read",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state: "some-static-state-for-now", // later: random + checken
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return res.redirect(url);
});

// GET /api/auth/spotify/callback → Spotify redirect URI na login
router.get("/spotify/callback", async (req, res) => {
  const code = req.query.code;
  const error = req.query.error;

  console.log("⚡ Spotify callback hit");

  if (error) {
    console.error("Spotify error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/?error=spotify_auth`);
  }

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}/?error=no_code`);
  }

  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    console.log("🎫 Exchanging code for token...");

    // token request
    const tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      body.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenRes.data;
    console.log("✅ Token exchange ok, expires_in:", expires_in);

    // demo: tokens in httpOnly cookies
    res.cookie("spotify_access_token", access_token, {
      httpOnly: true,
      secure: false, // in productie: true + https
      maxAge: expires_in * 1000,
      sameSite: "lax",
    });

    res.cookie("spotify_refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    console.log("🍪 Cookies set, redirecting to:", `${process.env.FRONTEND_URL}/pulseboard`);

    // redirect terug naar frontend-pulseboard
    return res.redirect(`${process.env.FRONTEND_URL}/pulseboard`);
  } catch (err) {
    console.error(
      "❌ Error exchanging token ❌:",
      err.response?.data || err.message
    );
    return res.redirect(`${process.env.FRONTEND_URL}/?error=token_exchange`);
  }
});

// export de router
module.exports = router;