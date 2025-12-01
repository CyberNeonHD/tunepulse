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
            <p class="text-xs text-slate-400">
              The artists that define your sound · live Spotify data
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="$router.push({ name: 'pulseboard' })"
            class="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-300
                   hover:border-emerald-400/60 hover:text-emerald-200 transition-colors"
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
                This view shows your most listened Spotify artists for the selected time range,
                including genres and quick links to their Spotify profiles.
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
                  @click="changeRange(range.value)"
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
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between
                   gap-2 text-[11px] text-slate-400"
          >
            <div class="flex items-center gap-2">
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="{
                  'bg-amber-400 animate-pulse': loading,
                  'bg-red-400': !loading && error,
                  'bg-emerald-400': !loading && !error,
                }"
              ></span>

              <span v-if="loading">
                Loading your top artists from Spotify…
              </span>
              <span v-else-if="error">
                Failed to load top artists: {{ error }}
              </span>
              <span v-else>
                Loaded {{ artists.length }} artists from Spotify.
              </span>
            </div>
            <div class="text-slate-500">
              Current layout:
              <span class="text-emerald-200 font-medium">{{ layoutLabel }}</span>
            </div>
          </div>
        </div>

        <!-- LIST LAYOUT (bigger, with Spotify link column) -->
        <div
          v-if="layoutMode === 'list'"
          class="mt-2 rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden"
        >
          <!-- Header row [Rebuild better]
          <div
            class="grid grid-cols-[60px,auto,2fr,auto,auto]
                   gap-4 px-4 py-3 border-b border-white/10
                   text-[12px] font-medium text-slate-400"
          >
            <span>#</span>
            <span>Artist</span>
            <span class="hidden sm:inline text-lift">Spotify Link</span>
            <span class="text-right">Popularity</span>
            <span class="hidden sm:inline text-right">Genres</span>
          </div> --> 

          <!-- Rows – redesigned artist card layout -->
          <div class="divide-y divide-white/5 text-sm">
            <div
              v-for="(artist, index) in artists"
              :key="artist.id"
              class="flex gap-8 px-8 py-5 items-stretch hover:bg-slate-900/90 transition-colors"
            >
              <!-- LEFT: image + name + rank -->
              <div class="flex-shrink-0 flex flex-col items-center gap-2 w-40 sm:w-48">
                <div class="relative">
                  <!-- Rank badge -->
                  <span
                    class="absolute -top-3 -left-10 px-2 py-0.5 rounded-full
                          text-[11px] font-medium
                          bg-slate-950/90 border border-white/20 text-slate-200"
                  >
                    #{{ index + 1 }}
                  </span>

                  <!-- Artist image -->
                  <img
                    v-if="artist.images && artist.images.length"
                    :src="artist.images[0]?.url || artist.images[1]?.url || artist.images[2]?.url"
                    alt="Artist image"
                    class="h-36 w-36 sm:h-40 sm:w-40 object-cover mx-auto"
                  />
                  <div v-else class="h-36 w-36 sm:h-40 sm:w-40 rounded-2xl bg-slate-800/60 flex items-center justify-center text-xs text-slate-500">
                    No image
                  </div>
                </div>

                <!-- Artist name -->
                <p class="text-lg sm:text-2xl font-semibold text-slate-50 truncate max-w-full">
                  {{ artist.name }}
                </p>
              </div>

              <!-- RIGHT: stats + link -->
              <div class="flex-1 flex flex-col justify-between gap-2 sm:gap-3 min-w-0">
                <!-- Top stats (popularity + followers) -->
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div class="text-[12px] sm:text-[13px] text-slate-300 space-y-1">
                    <p>
                      <span class="text-slate-500">Popularity: </span>
                      <span class="text-emerald-300 font-medium">
                        {{ artist.popularity }} / 100
                      </span>
                    </p>
                    <p>
                      <span class="text-slate-500">Followers: </span>
                      <span class="text-slate-200">
                        {{ formatFollowers(artist.followers?.total) }}
                      </span>
                    </p>
                  </div>

                  <!-- Spotify link (top-right-ish) -->
                  <div class="text-right">
                    <a
                      v-if="artist.external_urls && artist.external_urls.spotify"
                      :href="artist.external_urls.spotify"
                      target="_blank"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full
                            border border-emerald-400/40 bg-emerald-400/10
                            text-[12px] text-emerald-200 hover:bg-emerald-400/20
                            hover:border-emerald-400/80 transition-colors"
                    >
                      <span>Open artist on Spotify</span>
                      <span class="text-sm">↗</span>
                    </a>
                    <span v-else class="text-[12px] text-slate-500">No Spotify link</span>
                  </div>
                </div>

                <!-- Middle meta: album + top track (placeholders for now) -->
                <div class="text-[12px] sm:text-[13px] text-slate-300 space-y-1">
                  <p>
                    <span class="text-slate-500">Last album: </span>
                    <span class="text-slate-200">
                      Coming soon
                    </span>
                  </p>
                  <p>
                    <span class="text-slate-500">Best track: </span>
                    <span class="text-slate-200">
                      Coming soon
                    </span>
                  </p>
                </div>

                <!-- Genres -->
                <div class="pt-1 border-t border-white/5 mt-2">
                  <p class="text-[12px] sm:text-[13px] text-slate-300 truncate">
                    <span class="text-slate-500">Genres: </span>
                    <span class="text-slate-200">
                      {{ genreList(artist) || '—' }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- GRID LAYOUT -->
        <div
          v-else-if="layoutMode === 'grid'"
          class="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <article
            v-for="(artist, index) in artists"
            :key="artist.id"
            class="rounded-2xl border border-white/10 bg-slate-900/70 p-4
                   flex flex-col gap-2 hover:border-emerald-400/60 hover:shadow-lg/40 transition-all"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] text-slate-500">#{{ index + 1 }}</span>
              <span
                class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10
                       text-emerald-200 border border-emerald-400/40"
              >
                {{ primaryGenre(artist) || 'No genre' }}
              </span>
            </div>

            <div class="flex items-center gap-3">
              <img
                v-if="artist.images && artist.images.length"
                :src="artist.images[1]?.url || artist.images[0]?.url"
                alt="Artist image"
                class="h-10 w-10 rounded-full object-cover flex-shrink-0"
              />
              <div class="min-w-0">
                <p class="text-sm font-semibold text-slate-50 truncate">
                  {{ artist.name }}
                </p>
                <p class="text-[11px] text-slate-400 truncate">
                  Popularity: {{ artist.popularity }} / 100
                </p>
              </div>
            </div>

            <p class="text-[11px] text-slate-400 mt-1 truncate">
              Genres:
              <span class="text-slate-200">{{ genreList(artist) || '—' }}</span>
            </p>

            <div class="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span class="text-slate-500">Profile</span>
              <a
                v-if="artist.external_urls && artist.external_urls.spotify"
                :href="artist.external_urls.spotify"
                target="_blank"
                class="text-emerald-300 hover:text-emerald-100 underline-offset-2 hover:underline"
              >
                Open in Spotify ↗
              </a>
              <span v-else class="text-slate-500">No link</span>
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
              v-for="(artist, index) in artists"
              :key="artist.id"
              class="flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-slate-900/90 transition-colors"
            >
              <span class="text-[11px] text-slate-500 w-8">#{{ index + 1 }}</span>

              <div class="flex-1 min-w-0">
                <p class="truncate text-slate-100">
                  {{ artist.name }}
                  <span class="text-[11px] text-slate-500">
                    · {{ primaryGenre(artist) || '—' }}
                  </span>
                </p>

                <p class="truncate text-[11px] text-slate-500">
                  Genres: {{ genreList(artist) || '—' }}
                </p>
              </div>

              <div class="flex flex-col items-end text-[11px] text-slate-400">
                <span class="text-emerald-300">{{ artist.popularity }} / 100</span>
                <span>Popularity</span>
              </div>
            </div>
          </div>
        </div>
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
      artists: [],
      loading: false,
      error: null,
    };
  },
  computed: {
    layoutLabel() {
      const opt = this.layoutOptions.find((o) => o.value === this.layoutMode);
      return opt ? opt.label : this.layoutMode;
    },
  },
  methods: {
    async fetchTopArtists() {
      this.loading = true;
      this.error = null;

      try {
        const params = new URLSearchParams({
          time_range: this.selectedRange,
          limit: 50, // later eventueel 100
        });

        const res = await fetch(
          `http://127.0.0.1:3001/api/spotify/top-artists?${params.toString()}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();
        const items = Array.isArray(data.items)
          ? data.items
          : data.items?.items;

        if (!res.ok || data.ok === false) {
          throw new Error(data.message || data.error || "Unknown error");
        }

        this.artists = items || [];
      } catch (err) {
        console.error("Error fetching top artists:", err);
        this.error = err.message || "Failed to load top artists";
        this.artists = [];
      } finally {
        this.loading = false;
      }
    },

    changeRange(range) {
      this.selectedRange = range;
      this.fetchTopArtists();
    },

    primaryGenre(artist) {
      return artist.genres && artist.genres.length ? artist.genres[0] : "";
    },

    genreList(artist) {
      if (!artist.genres || !artist.genres.length) return "";
      return artist.genres.slice(0, 3).join(" · ");
    },

    formatFollowers(value) {
      if (value === null || value === undefined) return "—";
      const n = Number(value);
      if (Number.isNaN(n)) return "—";
      if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
      if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
      return n.toString();
    },
  },
  mounted() {
    this.fetchTopArtists();
  },
};
</script>