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
              <span class="text-xs text-slate-500">/ Top 100 artists</span>
            </div>
            <p class="text-xs text-slate-400">The artists that define your sound (demo view)</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="$router.push({ name: 'pulseboard' })"
            class="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200 transition-colors"
          >
            ← Back to Pulseboard
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-1">
      <section class="max-w-6xl mx-auto px-4 py-8 lg:py-10 space-y-6">
        <!-- Title / selectors -->
        <div class="flex flex-col gap-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 class="text-xl sm:text-2xl font-semibold mb-1">Top 100 artists</h1>
              <p class="text-sm text-slate-300 max-w-xl">
                This view will show your top 100 most listened artists, including total listening
                time, primary genres and quick links to their Spotify profiles. Right now this is
                a static frontend preview.
              </p>
            </div>

            <div class="flex flex-col items-start sm:items-end gap-2">
              <!-- Range selector -->
              <div class="flex items-center gap-2 text-[11px]">
                <span class="text-slate-400">Time range:</span>
                <button
                  v-for="range in ranges"
                  :key="range.value"
                  type="button"
                  @click="selectedRange = range.value"
                  class="px-2.5 py-1 rounded-full border text-[11px] transition-colors"
                  :class="selectedRange === range.value
                    ? 'border-emerald-400/70 bg-emerald-400/10 text-emerald-200'
                    : 'border-white/10 bg-slate-900/60 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-200'"
                >
                  {{ range.label }}
                </button>
              </div>

              <!-- Layout selector -->
              <div class="flex items-center gap-2 text-[11px]">
                <span class="text-slate-400">Layout:</span>
                <button
                  v-for="opt in layoutOptions"
                  :key="opt.value"
                  type="button"
                  @click="layoutMode = opt.value"
                  class="px-2.5 py-1 rounded-full border text-[11px] transition-colors"
                  :class="layoutMode === opt.value
                    ? 'border-emerald-400/70 bg-emerald-400/10 text-emerald-200'
                    : 'border-white/10 bg-slate-900/60 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-200'"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Info badge -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-slate-400">
            <div class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Frontend-only preview · no real Spotify data yet</span>
            </div>
            <div class="text-slate-500">
              Current layout: <span class="text-emerald-200 font-medium">{{ layoutLabel }}</span>
            </div>
          </div>
        </div>

        <!-- LIST LAYOUT -->
        <div
          v-if="layoutMode === 'list'"
          class="mt-2 rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden"
        >
          <!-- Header row -->
          <div
            class="grid grid-cols-[auto,2fr,1.6fr,auto,auto]
                   gap-3 px-3 sm:px-4 py-2 border-b border-white/10
                   text-[11px] text-slate-400"
          >
            <span>#</span>
            <span>Artist</span>
            <span class="hidden sm:inline">Primary genre</span>
            <span class="text-right">Listening time</span>
            <span class="hidden sm:inline text-right">Top track</span>
          </div>

          <!-- Rows -->
          <div class="divide-y divide-white/5 text-xs">
            <div
              v-for="artist in demoArtists"
              :key="artist.rank"
              class="grid grid-cols-[auto,2fr,1.6fr,auto,auto]
                     gap-3 px-3 sm:px-4 py-2 items-center
                     hover:bg-slate-900/90 transition-colors"
            >
              <span class="text-[11px] text-slate-500">#{{ artist.rank }}</span>

              <div class="truncate">
                <p class="truncate text-slate-100">{{ artist.name }}</p>
                <p class="truncate text-[11px] text-slate-500 sm:hidden">{{ artist.genre }}</p>
              </div>

              <p class="hidden sm:inline truncate text-slate-300">{{ artist.genre }}</p>

              <span class="text-[11px] text-emerald-300 text-right">
                {{ artist.hours }} hrs
              </span>

              <p class="hidden sm:inline truncate text-[11px] text-slate-400 text-right">
                {{ artist.topTrack }}
              </p>
            </div>
          </div>
        </div>

        <!-- GRID LAYOUT -->
        <div
          v-else-if="layoutMode === 'grid'"
          class="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <article
            v-for="artist in demoArtists"
            :key="artist.rank"
            class="rounded-2xl border border-white/10 bg-slate-900/70 p-4 flex flex-col gap-2 hover:border-emerald-400/60 hover:shadow-lg/40 transition-all"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] text-slate-500">#{{ artist.rank }}</span>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-400/40">
                {{ artist.hours }} hrs
              </span>
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-50 truncate">{{ artist.name }}</p>
              <p class="text-[11px] text-slate-400 truncate">{{ artist.genre }}</p>
            </div>

            <p class="text-[11px] text-slate-400 mt-1">
              Top track: <span class="text-slate-200">{{ artist.topTrack }}</span>
            </p>

            <div class="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span class="text-slate-500">Profile preview</span>
              <span class="text-emerald-300 cursor-default">Open in Spotify ↗</span>
            </div>
          </article>
        </div>

        <!-- COMPACT LAYOUT -->
        <div
          v-else
          class="mt-2 rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden"
        >
          <div class="divide-y divide-white/5 text-xs">
            <div
              v-for="artist in demoArtists"
              :key="artist.rank"
              class="flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-slate-900/90 transition-colors"
            >
              <span class="text-[11px] text-slate-500 w-8">#{{ artist.rank }}</span>

              <div class="flex-1 min-w-0">
                <p class="truncate text-slate-100">
                  {{ artist.name }}
                  <span class="text-[11px] text-slate-500"> · {{ artist.genre }}</span>
                </p>

                <p class="truncate text-[11px] text-slate-500">
                  Top track: {{ artist.topTrack }}
                </p>
              </div>

              <div class="flex flex-col items-end text-[11px] text-slate-400">
                <span class="text-emerald-300">{{ artist.hours }} hrs</span>
                <span>Listening time</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Placeholder -->
        <p class="text-[11px] text-slate-500">
          The final version will show all 100 artists with real Spotify data, sorting, search, genre filters and
          direct Spotify profile links.
        </p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "TopArtistsView",
  data() {
    return {
      selectedRange: "medium_term",
      layoutMode: "list",
      ranges: [
        { value: "short_term", label: "Last 4 weeks" },
        { value: "medium_term", label: "Last 6 months" },
        { value: "long_term", label: "All time" },
      ],
      layoutOptions: [
        { value: "list", label: "List" },
        { value: "grid", label: "Grid" },
        { value: "compact", label: "Compact" },
      ],
      demoArtists: [
        {
          rank: 1,
          name: "Fred again..",
          genre: "Electronic · UK",
          hours: 48,
          topTrack: "Delilah (pull me out of this)",
        },
        {
          rank: 2,
          name: "ODESZA",
          genre: "Electronic · US",
          hours: 33,
          topTrack: "A Moment Apart",
        },
        {
          rank: 3,
          name: "Disclosure",
          genre: "House · UK",
          hours: 27,
          topTrack: "Latch",
        },
        {
          rank: 4,
          name: "RÜFÜS DU SOL",
          genre: "Indie Electronic · AU",
          hours: 24,
          topTrack: "Innerbloom",
        },
        {
          rank: 5,
          name: "Bonobo",
          genre: "Downtempo · UK",
          hours: 19,
          topTrack: "Kerala",
        },
        {
          rank: 6,
          name: "Bicep",
          genre: "Electronic · UK",
          hours: 17,
          topTrack: "Glue",
        },
        {
          rank: 7,
          name: "Four Tet",
          genre: "Electronic · UK",
          hours: 15,
          topTrack: "Teenage Birdsong",
        },
        {
          rank: 8,
          name: "Lane 8",
          genre: "Progressive House · US",
          hours: 13,
          topTrack: "Atlas",
        },
      ],
    };
  },
  computed: {
    layoutLabel() {
      const opt = this.layoutOptions.find((o) => o.value === this.layoutMode);
      return opt ? opt.label : this.layoutMode;
    },
  },
};
</script>
