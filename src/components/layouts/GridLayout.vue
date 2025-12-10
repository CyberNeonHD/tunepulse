<!-- src/components/layouts/GridLayout.vue -->
<template>
  <div class="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <article
      v-for="(item, index) in items"
      :key="item.id || index"
      class="rounded-2xl border border-white/10 bg-slate-900/70 p-4
             flex flex-col gap-2 hover:border-emerald-400/60 hover:shadow-lg/40 transition-all"
    >
      <!-- Bovenste rij: rank + evt eerste top-field als badge -->
      <div class="flex items-center justify-between gap-2">
        <span
          v-if="config.showRank !== false"
          class="text-[11px] text-slate-500"
        >
          #{{ index + 1 }}
        </span>

        <span
          v-if="config.showMeta !== false && fields.top && fields.top.length"
          class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10
                 text-emerald-200 border border-emerald-400/40 truncate max-w-[60%] text-right"
        >
          <!-- eerste top-field als badge-tekst -->
          <template v-if="fields.top[0]">
            {{ fields.top[0].label }}:
            {{ item[fields.top[0].key] ?? "—" }}
          </template>
        </span>
      </div>

      <!-- Image + title -->
      <div class="flex items-center gap-3">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title"
          class="h-10 w-10 object-cover shrink-0"
        />
        <div class="min-w-0">
          <p class="text-sm font-semibold text-slate-50 truncate">
            {{ item.title }}
          </p>

          <!-- evt tweede top-field onder titel -->
          <p
            v-if="config.showMeta !== false && fields.top && fields.top.length > 1"
            class="text-[11px] text-slate-400 truncate"
          >
            {{ fields.top[1].label }}:
            <span class="text-slate-300">
              {{ item[fields.top[1].key] ?? "—" }}
            </span>
          </p>
        </div>
      </div>

      <!-- Middle fields verticaal (als verticalMeta true is) -->
      <div
        v-if="config.showMeta !== false && config.verticalMeta && fields.middle && fields.middle.length"
        class="text-[11px] text-slate-400 mt-1 flex flex-col gap-0.5"
      >
        <p
          v-for="field in fields.middle"
          :key="field.key"
          class="truncate"
        >
          <span class="text-slate-500">{{ field.label }}: </span>
          <span class="text-slate-300">{{ item[field.key] ?? "—" }}</span>
        </p>
      </div>

      <!-- Middle fields horizontaal (origineel) -->
      <p
        v-else-if="config.showMeta !== false && fields.middle && fields.middle.length"
        class="text-[11px] text-slate-400 mt-1 truncate"
      >
        <span
          v-for="field in fields.middle"
          :key="field.key"
        >
          <span class="text-slate-500">{{ field.label }}: </span>
          <span class="text-slate-300">
            {{ item[field.key] ?? "—" }}
          </span>
          <span class="text-slate-600"> · </span>
        </span>
      </p>

      <!-- Bottom fields (één regel) -->
      <p
        v-if="config.showMeta !== false && fields.bottom && fields.bottom.length"
        class="text-[11px] text-slate-400 truncate"
      >
        <span
          v-for="field in fields.bottom"
          :key="field.key"
        >
          <span class="text-slate-500">{{ field.label }}: </span>
          <span class="text-slate-300">
            {{ item[field.key] ?? "—" }}
          </span>
          <span class="text-slate-600"> · </span>
        </span>
      </p>

      <!-- Link onderaan rechts -->
      <div class="flex items-center justify-between text-[11px] text-slate-400 mt-1">
        <span class="text-slate-500">
          {{ config.footerLabel || "Profile" }}
        </span>
        <a
          v-if="item.link"
          :href="item.link"
          target="_blank"
          class="text-emerald-300 hover:text-emerald-100 underline-offset-2 hover:underline"
        >
          {{ config.linkShortText || "Open" }} ↗
        </a>
        <span
          v-else
          class="text-slate-500"
        >
          No link
        </span>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "GridLayout",
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
