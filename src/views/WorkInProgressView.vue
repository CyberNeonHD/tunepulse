<template>
  <div class="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
    <!-- Glowing background -->
    <div
      class="pointer-events-none fixed inset-0 -z-10
             bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.06),_transparent_80%),_radial-gradient(circle_at_bottom,_rgba(147,51,234,0.04),_transparent_80%)]"
    ></div>

    <!-- HEADER (simpel) -->
    <header class="w-full border-b border-white/5 backdrop-blur bg-slate-950/60">
      <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <span class="font-semibold tracking-tight text-lg">TunePulse</span>
        <button
          type="button"
          @click="$router.push({ name: 'home' })"
          class="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200 transition-colors"
        >
          ← Back to homepage
        </button>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-1 flex items-center justify-center px-4">
      <div class="max-w-xl w-full text-center">
        <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full
                border border-amber-400/40 bg-amber-400/10
                text-xs text-amber-200 mb-4"
        >
            <span class="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse"></span>
            <span>Work in progress</span>
        </div>


        <h1 class="text-2xl sm:text-3xl font-semibold mb-3">
          The stats backend is being rebuilt.
        </h1>

        <p class="text-s text-slate-300 mb-4">
          I’m currently migrating the entire backend to a new Vue-based stack and tightening
          the integration with the Spotify Web API. During this phase, logging in and
          fetching live stats is temporarily disabled.
        </p>

        <p class="text-s text-slate-400 mb-6">
          You can still explore the homepage, see what TunePulse will offer, and check out
          the open source code on GitHub.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <button
            type="button"
            @click="$router.push({ name: 'home' })"
            class="inline-flex items-center justify-center gap-2 text-sm font-semibold
                   px-5 py-2.5 rounded-full
                   bg-emerald-500 text-slate-950
                   shadow-sm hover:bg-emerald-400 hover:shadow-md
                   transition-transform hover:-translate-y-[1px]"
          >
            ← Back to homepage
          </button>

          <a
            href="https://github.com/CyberNeonHD/TunePulse"
            target="_blank"
            class="inline-flex items-center justify-center gap-2 text-sm font-medium
                   px-5 py-2.5 rounded-full border border-white/15
                   text-slate-200 hover:border-emerald-400/60 hover:text-emerald-200
                   bg-white/5 hover:bg-white/10
                   transition-colors"
          >
            View the current code on GitHub
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "WorkInProgressView",
};
</script>
