<template>
  <div class="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
    <!-- Glowing background -->
    <div
      class="pointer-events-none fixed inset-0 -z-10
             bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.06),_transparent_80%),_radial-gradient(circle_at_bottom,_rgba(147,51,234,0.04),_transparent_80%)]"
    ></div>

    <!-- HEADER -->
    <header class="w-full border-b border-white/5 backdrop-blur bg-slate-950/60">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-semibold tracking-tight text-lg">TunePulse</span>
              <span
                class="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.16em]
                       bg-emerald-400/10 text-emerald-300 border border-emerald-400/40"
              >
                Beta
              </span>
            </div>
            <p class="text-xs text-slate-400">Spotify stats, zero tracking.</p>
          </div>
        </div>

        <nav class="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#features" class="hover:text-emerald-300 transition-colors">Features</a>
          <a href="#how-it-works" class="hover:text-emerald-300 transition-colors">How it works</a>
        </nav>

        <div class="flex items-center gap-3">
            <a
            href="#open-source"
            class="hidden sm:inline-flex text-xs px-3 py-1.5 rounded-full border border-white/10
                    text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200
                    transition-colors">
            Open source
            </a>

          <button
            type="button"
            @click="handleSpotifyLogin"
            class="relative inline-flex items-center gap-2 text-sm font-semibold
                   px-4 py-2 rounded-full
                   bg-emerald-500 text-slate-950
                   shadow-[0_0_15px_rgba(16,185,129,0.9)]
                   hover:bg-emerald-400
                   transition-transform hover:-translate-y-[1px]"
          >
            <span>Log in with Spotify</span>
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-1">
        <!-- HERO -->
        <section class="relative">
            <div
            class="max-w-6xl mx-auto px-4 w-full
                    min-h-[calc(100vh-4rem)]
                    flex items-center"
            >
                <div
                    class="w-full grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]
                        gap-10 items-center"
                >
                    <!-- TEXT -->
                    <div>
                        <div
                            class="inline-flex items-center gap-2 px-2 py-1 rounded-full
                                border border-emerald-400/40 bg-emerald-400/10
                                text-xs text-emerald-200 mb-4"
                        >
                            <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Privacy-friendly Spotify analytics</span>
                        </div>

                        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                            Watch your <span class="text-emerald-400">listening habits</span> come to life.
                        </h1>

                        <p class="text-sm sm:text-base text-slate-300 mb-6 max-w-xl">
                            TunePulse visualises your top artists, tracks and genres in beautiful charts
                            with <span class="font-semibold text-emerald-200">zero data stored</span>.
                            No accounts, no tracking, just your music.
                        </p>

                        <div class="flex flex-col sm:flex-row gap-3 mb-6">
                            <button
                            type="button"
                            @click="$router.push({ name: 'wip' })"
                            class="inline-flex items-center justify-center gap-2 text-sm font-semibold
                                    px-5 py-2.5 rounded-full
                                    bg-emerald-500 text-slate-950
                                    shadow-[0_0_15px_rgba(16,185,129,0.85)]
                                    hover:bg-emerald-400
                                    transition-transform hover:-translate-y-[1px]"
                            >
                            <span>Start with your stats</span>
                            <span class="text-xl">→</span>
                            </button>
                        </div>
                    </div>

                    <!-- PREVIEW CARD -->
                    <div id="preview" class="relative">
                        <div
                            class="relative rounded-3xl border border-white/10
                                bg-gradient-to-br from-slate-900/80 to-slate-900/40
                                shadow-[0_0_45px_rgba(8,47,73,0.9)] p-4 sm:p-6"
                        >
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <p class="text-xs text-slate-400">Your session</p>
                                <p class="text-sm font-medium text-slate-100">Listening time today</p>
                            </div>
                            <p class="text-2xl font-semibold text-emerald-400">3h 42m</p>
                            </div>

                            <div class="grid grid-cols-3 gap-3 text-xs">
                            <div class="rounded-2xl bg-slate-900/70 border border-white/5 p-3">
                                <p class="text-[10px] text-slate-400 mb-1">Top artist</p>
                                <p class="font-semibold text-sm mb-1 truncate">Fred again..</p>
                                <p class="text-[10px] text-emerald-300">128 minutes</p>
                            </div>
                            <div class="rounded-2xl bg-slate-900/70 border border-white/5 p-3">
                                <p class="text-[10px] text-slate-400 mb-1">Top track</p>
                                <p class="font-semibold text-sm mb-1 truncate">B.O.T.A.</p>
                                <p class="text-[10px] text-emerald-300">72 plays</p>
                            </div>
                            <div class="rounded-2xl bg-slate-900/70 border border-white/5 p-3">
                                <p class="text-[10px] text-slate-400 mb-1">Favourite genre</p>
                                <p class="font-semibold text-sm mb-1 truncate">Electronic</p>
                                <p class="text-[10px] text-emerald-300">36%</p>
                            </div>
                            </div>

                            <p class="mt-3 text-[11px] text-slate-400">
                            This is a <span class="text-emerald-300">demo</span>. Your real data loads live once you log in.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>


    <!-- FEATURES -->
    <section id="features">
        <div class="max-w-6xl mx-auto px-4 py-10 lg:py-14">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2">Features</h2>
            <p class="text-sm text-slate-300 mb-6 max-w-2xl">
            TunePulse turns your Spotify listening history into rich, explorable lists.
            Jump straight into your top tracks and artists, complete with genres, albums
            and play counts.
            </p>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <!-- Top 100 tracks -->
                <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-emerald-300">Top 100 tracks</h3>
                    <p class="text-xs text-slate-300">
                    See your <span class="font-semibold">top 100 songs</span> for different time ranges
                    (last month, 6 months, all time). Each track links directly to Spotify so you can
                    play it with a single click.
                    </p>
                    <ul class="mt-2 text-[11px] text-slate-400 space-y-1">
                        <li>• Direct “open in Spotify” links</li>
                        <li>• Sortable by period and rank</li>
                        <li>• Shows track duration & artist</li>
                    </ul>
                </article>

                <!-- Top 100 artists -->
                <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-emerald-300">Top 100 artists</h3>
                    <p class="text-xs text-slate-300">
                    Discover which artists you truly listen to the most. Your
                    <span class="font-semibold">top 100 artists</span> with click-through to their Spotify
                    profile and aggregated listening stats.
                    </p>
                    <ul class="mt-2 text-[11px] text-slate-400 space-y-1">
                        <li>• Quick links to artist pages</li>
                        <li>• Total minutes listened per artist</li>
                        <li>• Time-range filters (short / medium / long term)</li>
                    </ul>
                </article>

                <!-- Genres & albums -->
                <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-emerald-300">Genres & albums</h3>
                    <p class="text-xs text-slate-300">
                    Your listening, broken down by <span class="font-semibold">genre and album</span>.
                    See which sounds define your taste and which albums you keep coming back to.
                    </p>
                    <ul class="mt-2 text-[11px] text-slate-400 space-y-1">
                        <li>• Genre distribution (percentages)</li>
                        <li>• Most played albums per artist</li>
                        <li>• Links to albums on Spotify</li>
                    </ul>
                </article>

                <!-- Upcoming: top albums -->
                <article class="rounded-2xl border border-amber-400/40 bg-amber-400/5 p-4 flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                        <h3 class="text-sm font-semibold text-amber-300">Top albums</h3>
                        <span
                            class="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.16em]
                                bg-amber-500/10 text-amber-300 border border-amber-400/40">
                            Coming soon
                        </span>
                    </div>
                    <p class="text-xs text-amber-100/90">
                    Soon you’ll get a dedicated <span class="font-semibold">Top albums</span> view:
                    ranked by total plays, listening time and recency, with artwork and direct
                    links to listen on Spotify.
                    </p>
                    <ul class="mt-2 text-[11px] text-amber-200/90 space-y-1">
                        <li>• Your most played albums overall</li>
                        <li>• Sort by plays, listening time, recency</li>
                        <li>• Album-focused deep dives</li>
                    </ul>
                </article>
            </div>
        </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      <div class="max-w-6xl mx-auto px-4 py-10 lg:py-14">
        <h2 class="text-xl sm:text-2xl font-semibold mb-2">How it works</h2>
        <p class="text-sm text-slate-300 mb-6 max-w-2xl">
          Under the hood, TunePulse uses the official Spotify Web API and a standard OAuth 2.0 flow.
          No passwords are ever seen by TunePulse, and access tokens are kept short-lived and in memory.
        </p>

        <div class="grid gap-5 md:grid-cols-3">
          <!-- Step 1: Login & permissions -->
          <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold text-emerald-300">1. Log in with Spotify</h3>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/40">
                OAuth 2.0
              </span>
            </div>
            <p class="text-xs text-slate-300">
              When you click <span class="font-semibold">“Log in with Spotify”</span>, you’re redirected to
              Spotify’s official authorization page. You review the requested scopes (like
              <code class="font-mono text-[11px] bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/70">user-top-read</code>)
              and explicitly grant or deny access.
            </p>
            <ul class="mt-2 text-[11px] text-slate-400 space-y-1">
              <li>• TunePulse never sees your password</li>
              <li>• Permissions are limited to read-only listening data</li>
              <li>• You can revoke access any time in your Spotify account settings</li>
            </ul>
          </article>

          <!-- Step 2: Token exchange -->
          <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold text-emerald-300">2. Secure token exchange</h3>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-200 border border-slate-600/70">
                Access token
              </span>
            </div>
            <p class="text-xs text-slate-300">
              After you approve, Spotify redirects back with a short-lived authorization code.
              The backend exchanges this code for an <span class="font-semibold">access token</span> that can
              be used to call the Spotify Web API on your behalf.
            </p>
            <ul class="mt-2 text-[11px] text-slate-400 space-y-1">
              <li>• Tokens are tied to your Spotify account, not to a TunePulse account</li>
              <li>• No listening history is written to a database</li>
              <li>• When the session ends, tokens are discarded</li>
            </ul>
          </article>

          <!-- Step 3: Fetch & render your stats -->
          <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold text-emerald-300">3. Fetch & render your stats</h3>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-200 border border-slate-600/70">
                Spotify Web API
              </span>
            </div>
            <p class="text-xs text-slate-300">
              With a valid token, TunePulse calls endpoints like
              <code class="font-mono text-[11px] bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/70">/me/top/tracks</code>
              and <code class="font-mono text-[11px] bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/70">/me/top/artists</code>,
              combines the results with genres and albums, and renders everything directly in your browser.
            </p>
            <ul class="mt-2 text-[11px] text-slate-400 space-y-1">
              <li>• Top tracks, artists, genres and albums are computed on the fly</li>
              <li>• Each item includes a direct “open in Spotify” link</li>
              <li>• Close the tab → your session and tokens are gone</li>
            </ul>
          </article>
        </div>

        <!-- Under the hood details -->
        <div class="mt-8 rounded-2xl border border-dashed border-emerald-400/40 bg-emerald-400/5 p-4 text-xs text-emerald-50 space-y-2">
          <p class="font-semibold text-emerald-200 text-sm mb-1">
            Under the hood
          </p>
          <p>
            The goal is to keep things <span class="font-semibold">simple and privacy-first</span>:
            no custom login system, no email, no password storage. Just a temporary Spotify access token,
            used only to fetch your listening data and render visuals in the UI.
          </p>
          <p class="text-emerald-100/90">
            In other words: TunePulse behaves more like a <span class="font-semibold">viewer</span> on top of your
            Spotify account than a separate social platform.
          </p>
        </div>
      </div>
    </section>

    <!-- OPEN SOURCE -->
    <section id="open-source">
        <div class="max-w-6xl mx-auto px-4 py-10 lg:py-14">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2">Open Source & Privacy-First</h2>
            <p class="text-sm text-slate-300 mb-6 max-w-2xl">
            TunePulse is built transparent by design. No dark patterns, no hidden data collection,
            and no personal profiles. The code is fully open source, so you can see exactly what
            happens with your data and what doesn’t.
            </p>

            <div class="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">

                <!-- Left column -->
                <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-5 flex flex-col gap-3">
                    <h3 class="text-sm font-semibold text-emerald-300">A privacy-first approach</h3>

                    <p class="text-xs text-slate-300 leading-relaxed">
                    I built TunePulse with one core principle: <span class="font-semibold">your listening data
                    is yours</span>. There is no login system, no email collection, no advertising IDs, and
                    no stored profiles. Spotify tokens are kept in-memory only and disappear the moment you
                    close the tab.
                    </p>

                    <p class="text-xs text-slate-300 leading-relaxed">
                    However, for basic anonymous metrics I use:
                    </p>

                    <ul class="mt-1 text-[11px] text-slate-400 space-y-1">
                        <li>• <span class="font-semibold text-slate-300">Plausible Analytics</span> — privacy-focused, cookie-free stats</li>
                        <li>• <span class="font-semibold text-slate-300">Cloudflare</span> — minimal request logs (IP anonymized, no tracking)</li>
                    </ul>

                    <p class="text-xs text-slate-300 leading-relaxed">
                    These tools help me understand overall usage (page views, countries, browser types)
                    without ever identifying you. No cookies, no fingerprinting, no cross-site tracking.
                    </p>

                    <p class="text-xs text-slate-300 leading-relaxed mt-2">
                    Open source means anyone can audit the code, confirm the privacy claims, and contribute
                    improvements. Transparency is not a slogan, it's the foundation of the entire project.
                    </p>
                </article>

                <!-- Right column -->
                <article class="rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-5 flex flex-col gap-3">
                    <h3 class="text-sm font-semibold text-emerald-300">Explore the code</h3>

                    <p class="text-xs text-emerald-100/90 leading-relaxed">
                    Every line of TunePulse is public. Want to verify how tokens are handled,
                    suggest improvements, add new features, or adapt the project for yourself?
                    </p>

                    <p class="text-xs text-emerald-100/90 leading-relaxed">
                    You can inspect the full source code on GitHub, open, transparent, and community-driven.
                    </p>

                    <a
                    href="https://github.com/CyberNeonHD/TunePulse_old"
                    target="_blank"
                    class="inline-flex items-center gap-2 text-sm font-semibold
                            px-4 py-2 rounded-full mt-2
                            bg-emerald-500 text-slate-950
                            shadow-sm hover:bg-emerald-400 hover:shadow-md
                            transition-all"
                    >
                    <span>View on GitHub</span>
                    <span class="text-lg">↗</span>
                    </a>
                </article>
            </div>

            <!-- Transparency box -->
            <div class="mt-8 rounded-2xl border border-dashed border-emerald-400/40 bg-emerald-400/5 p-4 text-xs text-emerald-50 space-y-2">
                <p class="font-semibold text-emerald-200 text-sm mb-1">100% anonymized analytics</p>
                <p>
                    TunePulse uses cookie-free analytics only. No cookies, no session IDs, no fingerprinting,
                    no tracking pixels. Cloudflare only logs minimal, non-identifiable request metadata.
                </p>
                <p class="text-emerald-100/90">
                    In short: I don’t know who you are and that’s on purpose.
                </p>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-white/5 bg-slate-950/90">
      <div class="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-400 flex justify-between">
        <p>© {{ new Date().getFullYear() }} TunePulse</p>
        <button @click="scrollToTop" class="hover:text-emerald-300">Back to top ↑</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    handleSpotifyLogin() {
      window.location.href = "http://127.0.0.1:3001/api/auth/spotify";
    },
    scrollToPreview() {
      const el = document.getElementById("preview");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
article:hover,
li:hover {
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.25);
  transform: translateY(-1px);
  transition: 0.15s ease-out;
}
</style>
