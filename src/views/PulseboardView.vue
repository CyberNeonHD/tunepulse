<template>
  <div class="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
    <!-- Background glow -->
    <div
      class="pointer-events-none fixed inset-0 -z-10
             bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.06),_transparent_80%),_radial-gradient(circle_at_bottom,_rgba(16,185,129,0.05),_transparent_80%)]"
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
            <p class="text-xs text-slate-400">Your Spotify listening dashboard</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
            <div class="hidden sm:flex flex-col items-end">
                    <span class="text-xs text-slate-300">Logged in with Spotify</span>
                    <span class="text-[11px] text-slate-500">Demo user</span>
            </div>
            <button
                type="button"
                @click="$router.push({ name: 'home' })"
                class="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-300
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
                <p class="text-sm text-slate-300 max-w-xl">
                This is your central hub for Spotify stats. From here you can dive into your
                <span class="font-semibold text-emerald-200">Top 100 tracks</span> and
                <span class="font-semibold text-emerald-200">Top 100 artists</span>, plus more detailed views later.
                </p>
            </div>

            <div class="flex flex-col items-end gap-2 text-[11px] text-slate-400">
            <span class="px-2 py-1 rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-200">
                Frontend only · Demo data
            </span>

            <button
                type="button"
                @click="$router.push({ name: 'changelog' })"
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10
                    text-[11px] text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200
                    hover:bg-white/5 transition-colors"
            >
                <span>View changelog</span>
                <span class="text-xs">↗</span>
            </button>
            </div>
        </div>

        <!-- Overview cards -->
        <div class="grid sm:grid-cols-3 gap-4">
          <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <p class="text-[11px] text-slate-400 mb-1">Total listening time</p>
            <p class="text-xl font-semibold text-emerald-300">128 hrs</p>
            <p class="text-[11px] text-slate-500 mt-1">Last 6 months · demo</p>
          </article>

          <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <p class="text-[11px] text-slate-400 mb-1">Unique artists</p>
            <p class="text-xl font-semibold text-emerald-300">342</p>
            <p class="text-[11px] text-slate-500 mt-1">Across all time ranges</p>
          </article>

          <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <p class="text-[11px] text-slate-400 mb-1">Tracks in Top 100</p>
            <p class="text-xl font-semibold text-emerald-300">100</p>
            <p class="text-[11px] text-slate-500 mt-1">Per view · tracks & artists</p>
          </article>
        </div>

        <!-- Main split: quick access + preview lists -->
        <div class="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] gap-6 items-start">
          <!-- Quick navigation cards -->
          <div class="space-y-4">
            <h2 class="text-sm font-semibold text-slate-200 mb-1">Jump into your stats</h2>

            <!-- Top 100 Tracks card -->
            <article
              class="rounded-2xl border border-white/10 bg-slate-900/70 p-4 flex flex-col gap-2 cursor-pointer hover:border-emerald-400/60 hover:shadow-lg/50 transition-all"
              @click="$router.push({ name: 'top-tracks' })"
            >
              <div class="flex items-center justify-between gap-2">
                <div>
                  <h3 class="text-sm font-semibold text-emerald-300">Top 100 tracks</h3>
                  <p class="text-xs text-slate-300">
                    Your most played songs, across multiple time ranges.
                  </p>
                </div>
                <span class="text-sm text-emerald-200">Open ↗</span>
              </div>
              <p class="text-[11px] text-slate-400">
                See play counts, artists, albums and quick links to open every track in Spotify.
              </p>
            </article>

            <!-- Top 100 Artists card -->
            <article
              class="rounded-2xl border border-white/10 bg-slate-900/70 p-4 flex flex-col gap-2 cursor-pointer hover:border-emerald-400/60 hover:shadow-lg/50 transition-all"
              @click="$router.push({ name: 'top-artists' })"
            >
              <div class="flex items-center justify-between gap-2">
                <div>
                  <h3 class="text-sm font-semibold text-emerald-300">Top 100 artists</h3>
                  <p class="text-xs text-slate-300">
                    The artists that define your listening identity.
                  </p>
                </div>
                <span class="text-sm text-emerald-200">Open ↗</span>
              </div>
              <p class="text-[11px] text-slate-400">
                Aggregated listening time, genres per artist and quick links to their Spotify pages.
              </p>
            </article>

            <!-- Future sections -->
            <article class="rounded-2xl border border-dashed border-emerald-400/40 bg-emerald-400/5 p-4 flex flex-col gap-2">
              <h3 class="text-sm font-semibold text-emerald-300">More views coming soon</h3>
              <p class="text-xs text-emerald-100/90">
                In the full version, Pulseboard will also include top albums, genre breakdowns,
                time-based listening patterns and yearly recaps.
              </p>
            </article>
          </div>

          <!-- Demo preview lists -->
          <div class="space-y-4">
            <h2 class="text-sm font-semibold text-slate-200 mb-1">Live preview (demo data)</h2>

            <!-- Demo: mini top tracks -->
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs text-slate-400">Top tracks · last 4 weeks</p>
                <span class="text-[11px] text-slate-500">Preview · not real data</span>
              </div>
              <div class="space-y-1 text-xs">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-slate-400 w-6 text-[11px]">#1</span>
                  <div class="flex-1 truncate">
                    <p class="text-slate-100 truncate">Delilah (pull me out of this)</p>
                    <p class="text-[11px] text-slate-500 truncate">Fred again..</p>
                  </div>
                  <span class="text-[11px] text-emerald-300">132 plays</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-slate-400 w-6 text-[11px]">#2</span>
                  <div class="flex-1 truncate">
                    <p class="text-slate-100 truncate">B.O.T.A.</p>
                    <p class="text-[11px] text-slate-500 truncate">Eliza Rose</p>
                  </div>
                  <span class="text-[11px] text-emerald-300">118 plays</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-slate-400 w-6 text-[11px]">#3</span>
                  <div class="flex-1 truncate">
                    <p class="text-slate-100 truncate">Adore You</p>
                    <p class="text-[11px] text-slate-500 truncate">Fred again..</p>
                  </div>
                  <span class="text-[11px] text-emerald-300">103 plays</span>
                </div>
              </div>
            </div>

            <!-- Demo: mini top artists -->
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs text-slate-400">Top artists · all time</p>
                <span class="text-[11px] text-slate-500">Preview · not real data</span>
              </div>
              <div class="space-y-1 text-xs">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-slate-400 w-6 text-[11px]">#1</span>
                  <div class="flex-1 truncate">
                    <p class="text-slate-100 truncate">Fred again..</p>
                    <p class="text-[11px] text-slate-500 truncate">Electronic · UK</p>
                  </div>
                  <span class="text-[11px] text-emerald-300">48 hrs</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-slate-400 w-6 text-[11px]">#2</span>
                  <div class="flex-1 truncate">
                    <p class="text-slate-100 truncate">ODESZA</p>
                    <p class="text-[11px] text-slate-500 truncate">Electronic · US</p>
                  </div>
                  <span class="text-[11px] text-emerald-300">33 hrs</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-slate-400 w-6 text-[11px]">#3</span>
                  <div class="flex-1 truncate">
                    <p class="text-slate-100 truncate">Disclosure</p>
                    <p class="text-[11px] text-slate-500 truncate">House · UK</p>
                  </div>
                  <span class="text-[11px] text-emerald-300">27 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-white/5 bg-slate-950/90">
      <div
        class="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-400
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
                        text-[11px] text-slate-300
                        hover:border-red-500/70 hover:text-red-300 hover:bg-red-500/10
                        transition-colors"
                >
                Log out
            </button>


          <a
            href="https://github.com/CyberNeonHD/TunePulse_old"
            target="_blank"
            class="px-3 py-1.5 rounded-full border border-white/10
                   text-[11px] text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200
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
