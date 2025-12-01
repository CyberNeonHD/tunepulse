// server/index.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// .env laden (zodat process.env.* werkt in routes)
dotenv.config();

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://127.0.0.1:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// routes importeren
const authRoutes = require("./routes/auth");
const spotifyRoutes = require("./routes/spotify");

// health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "TunePulse backend alive 🚀",
  });
});

// routes mounten
app.use("/api/auth", authRoutes);
app.use("/api/spotify", spotifyRoutes);

// server starten
app.listen(PORT, () => {
  console.log(`TunePulse backend running on http://127.0.0.1:${PORT}`);
});
