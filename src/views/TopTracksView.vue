<template>
  <div class="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
    <!-- Background glow -->
    <div
      class="pointer-events-none fixed inset-0 -z-10
             bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.06),transparent_80%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.05),transparent_80%)]"
    ></div>

    <!-- HEADER -->
    <header class="w-full border-b border-white/5 backdrop-blur bg-slate-950/70">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-semibold tracking-tight text-lg">TunePulse</span>
              <span class="text-xs text-slate-500">/ Top 100 tracks</span>
            </div>
            <p class="text-xs text-slate-400">Your most played songs (demo view)</p>
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
              <h1 class="text-xl sm:text-2xl font-semibold mb-1">Top 100 tracks</h1>
              <p class="text-sm text-slate-300 max-w-xl">
                This view will show your top 100 most played tracks from Spotify for different time
                ranges, including play counts, artists, albums and quick “open in Spotify” links.
                For now this is a static frontend preview.
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
            class="grid grid-cols-[auto,2fr,1.6fr,1.6fr,auto,auto]
                   gap-3 px-3 sm:px-4 py-2 border-b border-white/10
                   text-[11px] text-slate-400"
          >
            <span>#</span>
            <span>Track</span>
            <span class="hidden sm:inline">Artist</span>
            <span class="hidden sm:inline">Album</span>
            <span class="text-right">Plays</span>
            <span class="hidden sm:inline text-right">Length</span>
          </div>

          <!-- Rows -->
          <div class="divide-y divide-white/5 text-xs">
            <div
              v-for="track in demoTracks"
              :key="track.rank"
              class="grid grid-cols-[auto,2fr,1.6fr,1.6fr,auto,auto]
                     gap-3 px-3 sm:px-4 py-2 items-center
                     hover:bg-slate-900/90 transition-colors"
            >
              <span class="text-[11px] text-slate-500">#{{ track.rank }}</span>

              <div class="truncate">
                <p class="truncate text-slate-100">{{ track.title }}</p>
                <p class="truncate text-[11px] text-slate-500 sm:hidden">{{ track.artist }}</p>
              </div>

              <p class="hidden sm:inline truncate text-slate-300">{{ track.artist }}</p>
              <p class="hidden sm:inline truncate text-slate-400">{{ track.album }}</p>

              <span class="text-[11px] text-emerald-300 text-right">{{ track.plays }} plays</span>
              <span class="hidden sm:inline text-[11px] text-slate-400 text-right">{{ track.length }}</span>
            </div>
          </div>
        </div>

        <!-- GRID LAYOUT -->
        <div
          v-else-if="layoutMode === 'grid'"
          class="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <article
            v-for="track in demoTracks"
            :key="track.rank"
            class="rounded-2xl border border-white/10 bg-slate-900/70 p-4 flex flex-col gap-2 hover:border-emerald-400/60 hover:shadow-lg/40 transition-all"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] text-slate-500">#{{ track.rank }}</span>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-400/40">
                {{ track.plays }} plays
              </span>
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-50 truncate">{{ track.title }}</p>
              <p class="text-[11px] text-slate-400 truncate">{{ track.artist }}</p>
              <p class="text-[11px] text-slate-500 truncate italic">{{ track.album }}</p>
            </div>

            <div class="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>Length: <span class="text-slate-200">{{ track.length }}</span></span>
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
              v-for="track in demoTracks"
              :key="track.rank"
              class="flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-slate-900/90 transition-colors"
            >
              <span class="text-[11px] text-slate-500 w-8">#{{ track.rank }}</span>

              <div class="flex-1 min-w-0">
                <p class="truncate text-slate-100">
                  {{ track.title }}
                  <span class="text-[11px] text-slate-500"> · {{ track.artist }}</span>
                </p>
                <p class="truncate text-[11px] text-slate-500">
                  {{ track.album }}
                </p>
              </div>

              <div class="flex flex-col items-end text-[11px] text-slate-400">
                <span class="text-emerald-300">{{ track.plays }} plays</span>
                <span>{{ track.length }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Placeholder text -->
        <p class="text-[11px] text-slate-500">
          The final version will show all 100 tracks, with real Spotify data, sorting, search, filters and
          direct Spotify links per row or card.
        </p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "TopTracksView",
  data() {
    return {
      selectedRange: "short_term",
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
      demoTracks: [
        {
          rank: 1,
          title: "Delilah (pull me out of this)",
          artist: "Fred again..",
          album: "Actual Life 3",
          plays: 132,
          length: "3:56",
        },
        {
          rank: 2,
          title: "B.O.T.A.",
          artist: "Eliza Rose",
          album: "B.O.T.A.",
          plays: 118,
          length: "4:24",
        },
        {
          rank: 3,
          title: "Adore You",
          artist: "Fred again..",
          album: "Actual Life 2",
          plays: 103,
          length: "3:12",
        },
        {
          rank: 4,
          title: "On Hold (Jamie xx Remix)",
          artist: "The xx",
          album: "On Hold (Remixes)",
          plays: 97,
          length: "3:31",
        },
        {
          rank: 5,
          title: "Better Off Alone",
          artist: "Alice Deejay",
          album: "Who Needs Guitars Anyway?",
          plays: 88,
          length: "3:36",
        },
        {
          rank: 6,
          title: "Opus",
          artist: "Eric Prydz",
          album: "Opus",
          plays: 82,
          length: "9:03",
        },
        {
          rank: 7,
          title: "Turn On The Lights again..",
          artist: "Fred again.., Swedish House Mafia, Future",
          album: "Turn On The Lights again..",
          plays: 79,
          length: "5:02",
        },
        {
          rank: 8,
          title: "Innerbloom",
          artist: "RÜFÜS DU SOL",
          album: "Bloom",
          plays: 73,
          length: "9:38",
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
