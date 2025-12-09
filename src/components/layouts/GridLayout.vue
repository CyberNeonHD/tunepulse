<template>
  <div class="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <article
      v-for="(item, index) in items"
      :key="item.id || index"
      class="rounded-2xl border border-white/10 bg-slate-900/70 p-4
             flex flex-col gap-2 hover:border-emerald-400/60 hover:shadow-lg/40 transition-all"
    >
      <!-- Top row -->
      <div class="flex items-center justify-between gap-2">
        <span
          v-if="config.showRank"
          class="text-[11px] text-slate-500"
        >
          #{{ index + 1 }}
        </span>
        <span v-else></span>

        <span
          v-if="fields.top && fields.top[0]"
          class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10
                 text-emerald-200 border border-emerald-400/40 truncate max-w-40"
        >
          {{ fields.top[0].label }}:
          {{ item[fields.top[0].key] ?? "—" }}
        </span>
      </div>

      <!-- Image + title -->
      <div class="flex items-center gap-3">
        <img
          v-if="item.image"
          :src="item.image"
          alt="item image"
          class="h-10 w-10 object-cover shrink-0"
        />
        <div class="min-w-0">
          <p class="text-sm font-semibold text-slate-50 truncate">
            {{ item.title }}
          </p>

          <!-- Tweede top-field onder titel bijvoorbeeld -->
          <p
            v-if="fields.top && fields.top[1]"
            class="text-[11px] text-slate-400 truncate"
          >
            {{ fields.top[1].label }}:
            {{ item[fields.top[1].key] ?? "—" }}
          </p>
        </div>
      </div>

      <!-- Middle + bottom velden in één blok -->
      <div class="text-[11px] text-slate-400 space-y-1 mt-1">
        <p
          v-for="field in [...(fields.middle || []), ...(fields.bottom || [])]"
          :key="field.key"
          class="truncate"
        >
          <span class="text-slate-500">{{ field.label }}: </span>
          <span class="text-slate-200">
            {{ item[field.key] ?? "—" }}
          </span>
        </p>
      </div>

      <!-- Link -->
      <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2">
        <span class="text-slate-500">Profile</span>
        <a
          v-if="item.link"
          :href="item.link"
          target="_blank"
          class="text-emerald-300 hover:text-emerald-100 underline-offset-2 hover:underline"
        >
          {{ config.linkText || "Open item" }}
        </a>
        <span v-else class="text-slate-500">No link</span>
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