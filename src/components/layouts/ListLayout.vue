<!-- src/components/layouts/ListLayout.vue -->
<template>
  <div class="mt-2 rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden">
    <div class="divide-y divide-white/5 text-sm">
      <div
        v-for="(item, index) in items"
        :key="item.id || index"
        class="flex gap-8 px-8 py-5 items-stretch hover:bg-slate-900/90 transition-colors"
      >
        <!-- LEFT: image + title + rank -->
        <div class="shrink-0 flex flex-col items-center gap-2"
             :style="imageColumnStyle">
          <div class="relative">
            <!-- Rank badge -->
            <span
              v-if="config.showRank !== false"
              class="absolute -top-3 -left-10 px-2 py-0.5 rounded-full
                     text-[11px] font-medium
                     bg-slate-950/90 border border-white/20 text-slate-200"
            >
              #{{ index + 1 }}
            </span>

            <!-- Image -->
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              :class="imageClass"
            />
            <div
              v-else
              :class="[
                imageClass,
                'rounded-2xl bg-slate-800/60 flex items-center justify-center text-xs text-slate-500',
              ]"
            >
              No image
            </div>
          </div>

          <!-- Title (optioneel te verbergen via config) -->
          <p
            v-if="config.showTitleBelowImage !== false"
            :class="[
              'truncate max-w-full text-center',
              titleClass,
            ]"
          >
            {{ item.title }}
          </p>
        </div>

        <!-- RIGHT: meta + link -->
        <div class="flex-1 flex flex-col justify-between gap-2 sm:gap-3 min-w-0">
          <!-- Top meta (fields.top) + link rechts -->
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <!-- Top meta -->
            <div
              v-if="config.showMeta !== false && fields.top && fields.top.length"
              class="text-[12px] sm:text-[13px] text-slate-300 space-y-1"
            >
              <p
                v-for="field in fields.top"
                :key="field.key"
              >
                <span class="text-slate-500">{{ field.label }}: </span>
                <span class="text-slate-200">
                  {{ item[field.key] ?? '—' }}
                </span>
              </p>
            </div>

            <!-- Link rechtsboven -->
            <div class="text-right">
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full
                       border border-emerald-400/40 bg-emerald-400/10
                       text-[12px] text-emerald-200 hover:bg-emerald-400/20
                       hover:border-emerald-400/80 transition-colors"
              >
                <span>{{ config.linkText || 'Open' }}</span>
                <span class="text-sm">↗</span>
              </a>
              <span
                v-else
                class="text-[12px] text-slate-500"
              >
                No link
              </span>
            </div>
          </div>

          <!-- Middle meta (fields.middle) -->
          <div
            v-if="config.showMeta !== false && fields.middle && fields.middle.length"
            class="text-[12px] sm:text-[13px] text-slate-300 space-y-1"
          >
            <p
              v-for="field in fields.middle"
              :key="field.key"
            >
              <span class="text-slate-500">{{ field.label }}: </span>
              <span class="text-slate-200">
                {{ item[field.key] ?? '—' }}
              </span>
            </p>
          </div>

          <!-- Bottom meta (fields.bottom) -->
          <div
            v-if="config.showMeta !== false && fields.bottom && fields.bottom.length"
            class="pt-1 border-t border-white/5 mt-2"
          >
            <p
              v-for="field in fields.bottom"
              :key="field.key"
              class="text-[12px] sm:text-[13px] text-slate-300 truncate"
            >
              <span class="text-slate-500">{{ field.label }}: </span>
              <span class="text-slate-200">
                {{ item[field.key] ?? 'N/A' }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListLayout",
  props: {
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Object,
      default: () => ({ top: [], middle: [], bottom: [] }),
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    imageColumnStyle() {
      if (this.config.imageColumnWidth) {
        return { width: this.config.imageColumnWidth };
      }
      return { width: "12rem" };
    },
    imageClass() {
      return (
        this.config.imageClass ||
        "h-36 w-36 sm:h-40 sm:w-40 rounded-2xl object-cover mx-auto"
      );
    },
    titleClass() {
      return (
        this.config.titleClass ||
        "text-lg sm:text-2xl font-semibold text-slate-50"
      );
    },
  },
};
</script>
