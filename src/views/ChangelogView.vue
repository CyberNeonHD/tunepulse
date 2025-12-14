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
              <span class="text-xs text-slate-500">/ Changelog</span>
            </div>
            <p class="text-xs text-slate-400">What’s new and what’s coming next</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- return to last page -->
            <button
            type="button"
            @click="$router.back()"
            class="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-300
                 hover:border-emerald-400/60 hover:text-emerald-200 hover:bg-white/5
                 transition-colors"  
            >
            ← Back
            </button>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-1">
      <section class="max-w-6xl mx-auto px-4 py-8 lg:py-10 space-y-6">
        <!-- Intro -->
        <div class="space-y-2">
          <h1 class="text-xl sm:text-2xl font-semibold">Changelog</h1>
          <p class="text-sm text-slate-300 max-w-xl">
            A simple, transparent overview of what changed in TunePulse. Frontend-only for now,
            but later this can be fed automatically from commits or releases.
          </p>
        </div>

        <!-- Latest version badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-400/10 text-[11px] text-emerald-200">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Latest: v0.4.0 · Performance & API Optimization</span>
        </div>

        <!-- Changelog list -->
        <div class="space-y-5 mt-4">
          <!-- v0.4.0 -->
          <article class="rounded-2xl border border-white/10 bg-slate-900/70 p-4 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <div>
                <h2 class="text-sm font-semibold text-slate-100">v0.4.0 – Performance & API Optimization</h2>
                <p class="text-[11px] text-slate-500">December 2025 · Backend improvements</p>
              </div>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-400/40">
                Current version
              </span>
            </div>
            <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Parallel API requests:</strong> Fetch top 100 items efficiently using two parallel Spotify API calls.</li>
              <li><strong>Rate limit handling:</strong> Built-in rate limit detection and logging to prevent API issues.</li>
            </ul>
          </article>

          <!-- v0.3.0 -->
          <article class="rounded-2xl border border-white/5 bg-slate-900/60 p-4 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <div>
                <h2 class="text-sm font-semibold text-slate-100">v0.3.0 – UI/UX Polish</h2>
                <p class="text-[11px] text-slate-500">December 2025 · Design improvements</p>
              </div>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-600/70">
                Archive
              </span>
            </div>
            <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>UI/UX improvements:</strong> Responsive text sizing, removed demo labels, clearer descriptions.</li>
              <li><strong>Layout enhancements:</strong> Vertical meta layout support and improved handling across all views.</li>
              <li><strong>Lazy loading & skeleton loaders:</strong> Smooth loading states for artist details.</li>
            </ul>
          </article>

          <!-- v0.2.0 -->
          <article class="rounded-2xl border border-white/5 bg-slate-900/60 p-4 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <div>
                <h2 class="text-sm font-semibold text-slate-100">v0.2.0 – Top Artists & Tracks</h2>
                <p class="text-[11px] text-slate-500">December 2025 · Live Spotify integration</p>
              </div>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-600/70">
                Archive
              </span>
            </div>
            <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Top 100 Artists view:</strong> Live data with popularity, followers, genres, last album and best track info.</li>
              <li><strong>Top 100 Tracks view:</strong> Play counts, artists, albums, and Spotify links.</li>
              <li><strong>Multiple layout modes:</strong> Switch between List, Grid, and Compact views with responsive design.</li>
            </ul>
          </article>

          <!-- v0.1.0 -->
          <article class="rounded-2xl border border-white/5 bg-slate-900/60 p-4 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <div>
                <h2 class="text-sm font-semibold text-slate-100">v0.1.0 – Foundation release</h2>
                <p class="text-[11px] text-slate-500">Early December 2025 · Initial Vue front-end</p>
              </div>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-600/70">
                Archive
              </span>
            </div>
            <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Landing page with hero, feature overview, "How it works" and "Open source" sections.</li>
              <li>Pulseboard dashboard with overview stats and quick links to Top 100 tracks & artists.</li>
              <li>Initial routes for <span class="font-mono text-[11px]">/pulseboard/top-tracks</span> and <span class="font-mono text-[11px]">/pulseboard/top-artists</span>.</li>
              <li>Privacy-first copy and open source GitHub link integrated in the UI.</li>
            </ul>
          </article>

          <!-- v0.0.1 -->
          <article class="rounded-2xl border border-white/5 bg-slate-900/60 p-4 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <div>
                <h2 class="text-sm font-semibold text-slate-100">v0.0.1 – Concept & design</h2>
                <p class="text-[11px] text-slate-500">2025-xx-xx · Pre-release</p>
              </div>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-600/70">
                Archive
              </span>
            </div>
            <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Initial concept for TunePulse: Spotify stats viewer with no tracking.</li>
              <li>First Tailwind-based design experiments and layout tests.</li>
              <li>Decision to keep all analytics anonymous (Plausible + Cloudflare only).</li>
            </ul>
          </article>

          <!-- Coming next -->
          <article class="rounded-2xl border border-dashed border-emerald-400/40 bg-emerald-400/5 p-4 space-y-2">
            <h2 class="text-sm font-semibold text-emerald-200">Up next</h2>
            <p class="text-xs text-emerald-100/90">
              Note: Spotify's API has become more restrictive recently, so new features depend on what data is accessible.
            </p>
            <ul class="text-xs text-emerald-100/90 space-y-1.5 list-disc list-inside">
              <li>Dedicated Top albums view with album artwork and metadata.</li>
              <li>Genre distribution charts across different time ranges.</li>
              <li>Saving user-selected layout preferences per view (list/grid/compact).</li>
              <li>Time range selector improvements and better filtering options.</li>
            </ul>
          </article>
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
          © {{ new Date().getFullYear() }} TunePulse · Changelog
        </p>

        <div class="flex items-center gap-3">
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
  name: "ChangelogView",
};
</script>

<style scoped>
article:hover {
  transition: 0.15s ease-out;
}
</style>
