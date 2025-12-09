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
              <!-- Time range selector -->
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

              <!-- Layout selector (generic component) -->
              <LayoutToggle
                v-model="layoutMode"
                :options="layoutOptions"
                label="Layout:"
              />
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

        <!-- LAYOUT RENDER -->
        <component
          :is="currentLayoutComponent"
          v-if="mappedArtists.length"
          :items="mappedArtists"
          :fields="layoutFields"
          :config="layoutConfig"
        />

        <!-- Empty state -->
        <p
          v-else-if="!loading && !error"
          class="text-xs text-slate-500 italic mt-4"
        >
          No artists found for this time range.
        </p>
      </section>
    </main>
  </div>
</template>

<script>
import LayoutToggle from "@/components/LayoutToggle.vue";
import ListLayout from "@/components/layouts/ListLayout.vue";
import GridLayout from "@/components/layouts/GridLayout.vue";
import CompactLayout from "@/components/layouts/CompactLayout.vue";

export default {
  name: "TopArtistsView",
  components: {
    LayoutToggle,
    ListLayout,
    GridLayout,
    CompactLayout,
  },
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

    // Kies welke layout-component we renderen
    currentLayoutComponent() {
      if (this.layoutMode === "grid") return GridLayout;
      if (this.layoutMode === "compact") return CompactLayout;
      return ListLayout; // default
    },

    // Mapping van Spotify artist → generiek item voor de layouts
    mappedArtists() {
      return this.artists.map((a) => ({
        id: a.id,
        title: a.name,
        image: a.images?.[0]?.url || a.images?.[1]?.url || a.images?.[2]?.url || "",
        link: a.external_urls?.spotify || "",
        popularity: `${a.popularity} / 100`,
        followers: this.formatFollowers(a.followers?.total),
        genres: this.genreList(a) || "N/A",
        lastAlbum: "Coming soon", // later: echte data via backend
        topTrack: "Coming soon",  // later: echte data via backend
      }));
    },

    // Welke velden in de meta-blokken getoond worden
    layoutFields() {
      // Compact layout = alleen naam + link → geen meta
      if (this.layoutMode === "compact") {
        return {
          top: [],
          middle: [],
          bottom: [],
        };
      }

      // List & grid krijgen de volledige meta
      return {
        top: [
          { key: "popularity", label: "Popularity" },
          { key: "followers", label: "Followers" },
        ],
        middle: [
          { key: "lastAlbum", label: "Last album" },
          { key: "topTrack", label: "Best track" },
        ],
        bottom: [
          { key: "genres", label: "Genres" },
        ],
      };
    },

    // Config voor de layouts
    layoutConfig() {
      const base = {
        showRank: true,
        imageColumnWidth: "12rem",
        imageClass: "h-36 w-36 sm:h-40 sm:w-40",
        titleClass: "text-lg sm:text-2xl",
      };

      if (this.layoutMode === "compact") {
        return {
          ...base,
          showMeta: false,
          linkShortText: "Spotify",
          linkText: "Spotify",
        };
      }

      // List & grid: rijke meta + langere linktekst
      return {
        ...base,
        showMeta: true,
        linkShortText: "Spotify",
        linkText: "Open artist on Spotify",
      };
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

    genreList(artist) {
      if (!artist.genres || !artist.genres.length) return "";
      return artist.genres.slice(0, 3).join(" · ");
    },

    formatFollowers(value) {
      if (value === null || value === undefined) return "—";
      const n = Number(value);
      if (Number.isNaN(n)) return "—";
      if (n >= 1_000_000)
        return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
      if (n >= 1_000)
        return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
      return n.toString();
    },
  },
  mounted() {
    this.fetchTopArtists();
  },
};
</script>
