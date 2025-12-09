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
            <p class="text-xs text-slate-400">
              The tracks that define your listening · live Spotify data
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
              <h1 class="text-xl sm:text-2xl font-semibold mb-1">Top 100 tracks</h1>
              <p class="text-sm text-slate-300 max-w-xl">
                This view shows your most listened Spotify tracks for the selected time range,
                including artists, albums and quick links to listen on Spotify.
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
                Loading your top tracks from Spotify…
              </span>
              <span v-else-if="error">
                Failed to load top tracks: {{ error }}
              </span>
              <span v-else>
                Loaded {{ tracks.length }} tracks from Spotify.
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
          v-if="mappedTracks.length"
          :items="mappedTracks"
          :fields="layoutFields"
          :config="layoutConfig"
        />

        <!-- Empty state -->
        <p
          v-else-if="!loading && !error"
          class="text-xs text-slate-500 italic mt-4"
        >
          No tracks found for this time range.
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
  name: "TopTracksView",
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
      tracks: [],
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

    // Mapping van Spotify track → generiek item voor de layouts
    mappedTracks() {
      return this.tracks.map((t) => ({
        id: t.id,
        title: t.name,
        image: t.album?.images?.[0]?.url || t.album?.images?.[1]?.url || "",
        link: t.external_urls?.spotify || "",
        popularity: `${t.popularity} / 100`,
        duration: this.formatDuration(t.duration_ms),
        artist: this.artistList(t),
        album: t.album?.name || "Unknown album",
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

      // List layout: titel in meta (niet onder afbeelding)
      if (this.layoutMode === "list") {
        return {
          top: [
            { key: "title", label: "Title" },
            { key: "artist", label: "Artist" },
          ],
          middle: [
            { key: "popularity", label: "Popularity" },
            { key: "duration", label: "Duration" },
          ],
          bottom: [
            { key: "album", label: "Album" },
          ],
        };
      }

      // Grid krijgt standaard meta
      return {
        top: [
          { key: "popularity", label: "Popularity" },
          { key: "duration", label: "Duration" },
        ],
        middle: [
          { key: "artist", label: "Artist" },
        ],
        bottom: [
          { key: "album", label: "Album" },
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

      if (this.layoutMode === "list") {
        return {
          ...base,
          showMeta: true,
          showTitleBelowImage: false, // titel staat in meta fields
          linkShortText: "Spotify",
          linkText: "Open track on Spotify",
        };
      }

      // Grid: standaard met titel onder afbeelding
      return {
        ...base,
        showMeta: true,
        linkShortText: "Spotify",
        linkText: "Open track on Spotify",
      };
    },
  },
  methods: {
    async fetchTopTracks() {
      this.loading = true;
      this.error = null;

      try {
        const params = new URLSearchParams({
          time_range: this.selectedRange,
          // Backend haalt automatisch top 100 op (2x 50 met offset)
        });

        const res = await fetch(
          `http://127.0.0.1:3001/api/spotify/top-tracks?${params.toString()}`,
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

        this.tracks = items || [];
      } catch (err) {
        console.error("Error fetching top tracks:", err);
        this.error = err.message || "Failed to load top tracks";
        this.tracks = [];
      } finally {
        this.loading = false;
      }
    },

    changeRange(range) {
      this.selectedRange = range;
      this.fetchTopTracks();
    },

    artistList(track) {
      if (!track.artists || !track.artists.length) return "Unknown artist";
      return track.artists.map((a) => a.name).join(", ");
    },

    formatDuration(ms) {
      if (!ms) return "—";
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  },
  mounted() {
    this.fetchTopTracks();
  },
};
</script>
