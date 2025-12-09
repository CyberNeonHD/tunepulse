<template>
  <div class="mt-2 rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden">
    <div class="divide-y divide-white/5 text-sm">
      <div
        v-for="(item, index) in items"
        :key="item.id || index"
        class="flex gap-8 px-8 py-5 items-stretch hover:bg-slate-900/90 transition-colors"
      >
        <!-- LEFT: image + title + rank -->
        <div
          class="shrink-0 flex flex-col items-center gap-2"
          :style="{ width: config.imageColumnWidth || '12rem' }"
        >
          <!-- Rank (geen overlay op image) -->
          <span
            v-if="config.showRank"
            class="text-[15px] text-slate-500"
          >
            #{{ index + 1 }}
          </span>

          <!-- Image -->
          <img
            v-if="item.image"
            :src="item.image"
            alt="item image"
            class="object-cover mx-auto"
            :class="config.imageClass || 'h-36 w-36 sm:h-40 sm:w-40'"
          />
          <div
            v-else
            class="bg-slate-800/60 flex items-center justify-center text-xs text-slate-500 mx-auto"
            :class="config.imageClass || 'h-36 w-36 sm:h-40 sm:w-40'"
          >
            No image
          </div>

          <!-- Title -->
          <p
            class="font-semibold text-slate-50 truncate text-center max-w-full"
            :class="config.titleClass || 'text-lg sm:text-2xl'"
          >
            {{ item.title }}
          </p>
        </div>

        <!-- RIGHT: meta info -->
        <div class="flex-1 flex flex-col justify-between gap-3 min-w-0">
          <!-- Top stats -->
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div class="text-[12px] sm:text-[13px] text-slate-300 space-y-1">
              <p
                v-for="field in (fields.top || [])"
                :key="field.key"
              >
                <span class="text-slate-500">{{ field.label }}: </span>
                <span class="text-slate-200">
                  {{ item[field.key] ?? "—" }}
                </span>
              </p>
            </div>

            <!-- Link button -->
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
                <span>{{ config.linkText || "Open item" }}</span>
              </a>
              <span v-else class="text-[12px] text-slate-500">
                No link
              </span>
            </div>
          </div>

          <!-- Middle metadata -->
          <div
            v-if="fields.middle && fields.middle.length"
            class="text-[12px] sm:text-[13px] text-slate-300 space-y-1"
          >
            <p
              v-for="field in fields.middle"
              :key="field.key"
            >
              <span class="text-slate-500">{{ field.label }}: </span>
              <span class="text-slate-200">
                {{ item[field.key] ?? "—" }}
              </span>
            </p>
          </div>

          <!-- Bottom metadata -->
          <div
            v-if="fields.bottom && fields.bottom.length"
            class="pt-1 border-t border-white/5 mt-2"
          >
            <p
              v-for="field in fields.bottom"
              :key="field.key"
              class="text-[12px] sm:text-[13px] text-slate-300 truncate"
            >
              <span class="text-slate-500">{{ field.label }}: </span>
              <span class="text-slate-200">
                {{ item[field.key] ?? "—" }}
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
};
</script>