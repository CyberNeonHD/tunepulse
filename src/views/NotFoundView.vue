<template>
  <div class="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
    <!-- Glowing background -->
    <div
      class="pointer-events-none fixed inset-0 -z-10
             bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.06),transparent_80%),radial-gradient(circle_at_bottom,rgba(147,51,234,0.04),transparent_80%)]"
    ></div>

    <!-- HEADER -->
    <header class="w-full border-b border-white/5 backdrop-blur bg-slate-950/60">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-semibold tracking-tight text-lg">TunePulse</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-400">Spotify stats, zero tracking.</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="$router.push({ name: 'home' })"
            class="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/10
                   text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200
                   transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-1 flex items-center justify-center">
      <div class="max-w-2xl mx-auto px-4 py-16 text-center">
        <!-- 404 Icon -->
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-900/60 border border-white/10">
            <span class="text-6xl">🎵</span>
          </div>
        </div>

        <!-- Error Code -->
        <div class="mb-4">
          <h1 class="text-7xl sm:text-8xl font-bold text-slate-800">404</h1>
        </div>

        <!-- Error Message -->
        <h2 class="text-2xl sm:text-3xl font-semibold mb-4">Page Not Found</h2>
        <p class="text-base sm:text-lg text-slate-300 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            @click="$router.push({ name: 'home' })"
            class="inline-flex items-center justify-center gap-2 text-sm font-semibold
                   px-5 py-2.5 rounded-full
                   bg-emerald-500 text-slate-950
                   shadow-[0_0_15px_rgba(16,185,129,0.85)]
                   hover:bg-emerald-400
                   transition-transform hover:-translate-y-px"
          >
            <span>Go to Homepage</span>
          </button>

          <button
            type="button"
            @click="$router.back()"
            class="inline-flex items-center justify-center gap-2 text-sm font-semibold
                   px-5 py-2.5 rounded-full
                   border border-white/10 text-slate-300
                   hover:border-emerald-400/60 hover:text-emerald-200 hover:bg-white/5
                   transition-colors"
          >
            <span>Go Back</span>
          </button>
        </div>

        <!-- Helpful Links -->
        <div class="mt-12 pt-8 border-t border-white/5">
          <p class="text-sm text-slate-400 mb-4">You might be looking for:</p>
          <div class="flex flex-wrap gap-3 justify-center">
            <a
              href="/#features"
              class="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/10
                     text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200
                     transition-colors"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              class="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/10
                     text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200
                     transition-colors"
            >
              How it works
            </a>
            <a
              href="/changelog"
              class="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/10
                     text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200
                     transition-colors"
            >
              Changelog
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-white/5 bg-slate-950/90">
      <div class="max-w-6xl mx-auto px-4 py-4 text-xs sm:text-sm text-slate-400 flex justify-between">
        <p>© {{ new Date().getFullYear() }} TunePulse</p>
        <button @click="scrollToTop" class="hover:text-emerald-300">Back to top ↑</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
button:hover {
  transition: 0.15s ease-out;
}
</style>
