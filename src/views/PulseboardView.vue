<template>
  <div class="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
    <!-- Background glow -->
    <div
      class="pointer-events-none fixed inset-0 -z-10
             bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.06),transparent_80%),radial-gradient(circle_at_bottom,rgba(147,51,234,0.04),transparent_80%)]"
    ></div>

    <!-- HEADER -->
    <header class="w-full border-b border-white/5 backdrop-blur bg-slate-950/70">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-semibold tracking-tight text-lg">TunePulse</span>
              <span class="text-xs text-slate-500">/ Pulseboard</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-400">Your Spotify listening dashboard</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden sm:flex flex-col items-end">
            <span class="text-xs sm:text-sm text-slate-300">Logged in with Spotify</span>
          </div>
          <button
            type="button"
            @click="$router.push({ name: 'home' })"
            class="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/10 text-slate-300
                   hover:border-red-500/70 hover:text-red-300 hover:bg-red-500/10
                   transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-1">
      <section class="max-w-6xl mx-auto px-4 py-8 lg:py-10 space-y-8">
        <!-- Intro / summary -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-xl sm:text-2xl font-semibold mb-1">Pulseboard overview</h1>
            <p class="text-base text-slate-300 max-w-2xl">
              This is your central hub for Spotify stats. From here you can jump into your
              <span class="font-semibold text-emerald-200">Top 100 tracks</span> and
              <span class="font-semibold text-emerald-200">Top 100 artists</span>, with live
              data loaded directly from Spotify when you open each view.
            </p>
          </div>

          <div>
            <button
              type="button"
              @click="$router.push({ name: 'changelog' })"
              class="transition-all"
            >
              <span
                class="text-base px-2 py-1 rounded-full border border-emerald-400/40
                       bg-emerald-400/10 text-emerald-200
                       hover:border-emerald-400/80 hover:bg-emerald-400/20 hover:text-emerald-100
                       transition-all"
              >
                View changelog ↗
              </span>
            </button>
          </div>
        </div>

        <!-- Meta overview cards (no fake stats) -->
        <div class="grid sm:grid-cols-3 gap-4">
          <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <p class="text-xs text-slate-400 mb-1">Live per-user stats</p>
            <p class="text-base font-semibold text-slate-100">
              Stats are loaded on-demand
            </p>
            <p class="text-sm text-slate-500 mt-1">
              Nothing is precomputed or shared between users. When you open a view, TunePulse
              asks Spotify for your data and renders it in your browser.
            </p>
          </article>

          <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <p class="text-xs text-slate-400 mb-1">Privacy-first analytics</p>
            <p class="text-base font-semibold text-slate-100">
              No accounts or profiles
            </p>
            <p class="text-sm text-slate-500 mt-1">
              No custom login, no email collection, no cross-site tracking. Just a temporary
              Spotify token, used to fetch your stats and then discarded.
            </p>
          </article>

          <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <p class="text-xs text-slate-400 mb-1">Open source</p>
            <p class="text-base font-semibold text-slate-100">
              Transparent by design
            </p>
            <p class="text-sm text-slate-500 mt-1">
              The full codebase is public, so you can verify how data is handled or even run
              your own self-hosted instance of TunePulse.
            </p>
          </article>
        </div>

        <!-- Main split: quick access + explanation -->
        <div class="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] gap-6 items-start">
          <!-- Quick navigation cards -->
          <div class="space-y-4">
            <h2 class="text-base font-semibold text-slate-200 mb-1">Jump into your stats</h2>

            <!-- Top 100 Tracks card -->
            <article
              class="rounded-2xl border border-white/10 bg-slate-900/70 p-4 flex flex-col gap-2
                     cursor-pointer hover:border-emerald-400/60 hover:shadow-lg/50 transition-all"
              @click="$router.push({ name: 'top-tracks' })"
            >
              <div class="flex items-center justify-between gap-2">
                <div>
                  <h3 class="text-base font-semibold text-emerald-300">Top 100 tracks</h3>
                  <p class="text-sm text-slate-300">
                    Your most played songs, across multiple time ranges.
                  </p>
                </div>
                <span class="text-sm text-emerald-200">Open ↗</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-400">
                See play counts, artists, albums and quick links to open every track in Spotify.
              </p>
            </article>

            <!-- Top 100 Artists card -->
            <article
              class="rounded-2xl border border-white/10 bg-slate-900/70 p-4 flex flex-col gap-2
                     cursor-pointer hover:border-emerald-400/60 hover:shadow-lg/50 transition-all"
              @click="$router.push({ name: 'top-artists' })"
            >
              <div class="flex items-center justify-between gap-2">
                <div>
                  <h3 class="text-base font-semibold text-emerald-300">Top 100 artists</h3>
                  <p class="text-sm text-slate-300">
                    The artists that define your listening identity.
                  </p>
                </div>
                <span class="text-sm text-emerald-200">Open ↗</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-400">
                Popularity, followers, genres and direct links to open their Spotify profiles.
              </p>
            </article>
          </div>

          <!-- Right: how to use + what's next -->
          <div class="space-y-4">
            <h2 class="text-base font-semibold text-slate-200 mb-1">Using Pulseboard</h2>

            <!-- How to use card -->
            <article class="rounded-2xl border border-white/10 bg-slate-900/70 p-4 flex flex-col gap-2">
              <h3 class="text-base font-semibold text-slate-100">Getting started</h3>
              <ol class="mt-1 space-y-1 text-sm text-slate-400 list-decimal list-inside">
                <li>
                  Open <span class="text-emerald-200 font-medium">Top 100 tracks</span> or
                  <span class="text-emerald-200 font-medium">Top 100 artists</span>.
                </li>
                <li>
                  Use the <span class="text-slate-200">time range</span> selector to switch
                  between time periods.
                </li>
                <li>
                  Switch between <span class="text-slate-200">List</span>,
                  <span class="text-slate-200">Grid</span> and
                  <span class="text-slate-200">Compact</span> layouts to see what works best
                  for you.
                </li>
              </ol>
              <p class="text-sm text-slate-500 mt-2">
                Pulseboard itself doesn’t store your data, it’s all fetched live from Spotify
                whenever you open a view. This ensures your stats are always up-to-date.
              </p>
            </article>

            <!-- Future features card -->
            <article class="rounded-2xl border border-dashed border-emerald-400/40 bg-emerald-400/5 p-4 flex flex-col gap-2">
              <h3 class="text-base font-semibold text-emerald-300">More views coming soon</h3>
              <p class="text-sm text-emerald-100/90">
                Upcoming ideas are to include top albums, genre breakdowns and more if allowed by Spotify's API.
                Do note that Spotify's API has becomen more restrictive recently, so new features depend on what data is accessible.
                For now planned features include:
              </p>
              <ul class="mt-1 text-xs sm:text-sm text-emerald-100/80 space-y-1">
                <li>• Dedicated Top albums view with artwork</li>
                <li>• Genre distribution over different time ranges</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-white/5 bg-slate-950/90">
      <div
        class="max-w-6xl mx-auto px-4 py-4 text-[13px] text-slate-400
               flex flex-col sm:flex-row items-center justify-between gap-2"
      >
        <p class="text-center sm:text-left">
          © {{ new Date().getFullYear() }} TunePulse · Pulseboard
        </p>

        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="$router.push({ name: 'home' })"
            class="px-3 py-1.5 rounded-full border border-white/10
                   text-xs sm:text-sm text-slate-300
                   hover:border-red-500/70 hover:text-red-300 hover:bg-red-500/10
                   transition-colors"
          >
            Log out
          </button>

          <a
            href="https://github.com/CyberNeonHD/TunePulse_old"
            target="_blank"
            class="px-3 py-1.5 rounded-full border border-white/10
                   text-xs sm:text-sm text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200
                   transition-colors"
          >
            View code on GitHub
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "PulseboardView",
  methods: {
    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
};
</script>

<style scoped>
article:hover {
  transition: 0.15s ease-out;
}
</style>
