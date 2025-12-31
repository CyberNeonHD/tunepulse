# TunePulse

**Privacy-friendly Spotify stats viewer with zero tracking.**

TunePulse visualizes your Spotify listening habits in beautiful, interactive charts. See your top artists, tracks, and genres across different time ranges, all without storing any personal data. No accounts, no tracking pixels, just your music stats rendered live in your browser.

## Planned full release
I´m planning to fully release TunePulse around January.

- Currently the following still needs to happen before the launch:
    - Physical server: Extra security features
    - Plausible implementation
    - Fine-Tuning of rate-limits
    - Testing the code for bugs: Last finishing touches for full V1.0.0 release
      
### Up next for V1.1.0 (After full release)

- Dedicated Top albums view with album artwork and metadata.
- Genre distribution charts across different time ranges.
- Time range selector improvements and better filtering options.

### Up next for V1.2.0
- Saving (locally) user-selected layout preferences per view (list/grid/compact).
- Better artist insights

#### More to be announced later for V1.3.0
Note: Spotify's API has become more restrictive recently, so new features depend on what data is accessible.

## Features

- **Top 100 Tracks** 
    - View your most played songs across different time periods (last month, 6 months, all time) with direct Spotify links
- **Top 100 Artists** 
    - Discover which artists you listen to the most, with popularity metrics, genres, and quick links to their profiles
- **Privacy-First** 
    - No login system, no stored profiles, no tracking. Spotify tokens are kept in-memory only
- **Open Source** 
    - Fully transparent codebase. Audit the code, suggest improvements, or adapt it for yourself
- **Beautiful UI** 
    - Built with Vue 3 and Tailwind CSS for a modern, responsive experience

## How It Works

TunePulse uses the official Spotify Web API with OAuth 2.0 authentication:

1. **Log in with Spotify** 
    - You authorize TunePulse to access your listening data through Spotify's official OAuth flow
2. **Secure token exchange** 
    - After approval, a short-lived access token is generated (never stored in a database)
3. **Fetch & render** 
    - Your stats are fetched from Spotify's API and rendered directly in your browser
4. **No persistence** 
    - Close the tab and your session is gone. No data is ever stored

## Tech Stack

- **Frontend**: Vue 3
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js (Spotify OAuth only)
- **Analytics: TO DO: Plausible (privacy-focused, cookie-free)**
- **Infrastructure**: Cloudflare Tunnels

## Privacy & Transparency

TunePulse is designed with privacy as a core principle:

- **No user accounts** 
    - No email collection, no password storage
- **No data persistence** 
    - Spotify tokens are kept in-memory and discarded when you close the tab
- **Minimal analytics** 
    - Only cookie-free, anonymized page view stats via Plausible
        - **This is not yet implemented** 
- **No fingerprinting** 
    - No cross-site tracking, no advertising IDs
- **Open source** 
    - Anyone can audit the code to verify these claims

## Contributing

Contributions are welcome! Feel free to:

- Report bugs or suggest features via GitHub Issues
- Submit pull requests for improvements
- Fork the project for your own use

## License

This project is open source and available under the AGPL-3.0 License.

notice:
License will change soon to MIT. I read a lot of comments around AGPL and copy-left. Perhaps AGPL is bit too much. MIT seems the way to go? 
