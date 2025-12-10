<template>
  <div class="mt-2 rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden">
    <div class="divide-y divide-white/5 text-sm">
      <div
        v-for="(item, index) in items"
        :key="item.id || index"
        class="flex items-center justify-between px-4 py-3 hover:bg-slate-900/90 transition-colors"
      >
        <!-- LINKS: rank + titel -->
        <div class="flex items-center gap-3 min-w-0">
          <span
            v-if="config.showRank !== false"
            class="text-[11px] text-slate-500"
          >
            #{{ index + 1 }}
          </span>

          <p class="truncate text-slate-100">
            {{ item.title }}
          </p>
        </div>

        <!-- RECHTS: optionele meta / link -->
        <div class="flex items-center gap-3 text-[11px] text-slate-400">
          <!-- Meta verticaal (als verticalMeta true is) -->
          <div
            v-if="config.showMeta !== false && config.verticalMeta && hasAnyFields"
            class="hidden sm:flex flex-col gap-0.5 text-[11px] min-w-0"
          >
            <p
              v-for="field in allFields"
              :key="field.key"
              class="truncate"
            >
              <span class="text-slate-500">{{ field.label }}:</span>
              <span class="text-slate-300 ml-1">{{ item[field.key] ?? "—" }}</span>
            </p>
          </div>

          <!-- Meta horizontaal (origineel, als verticalMeta niet true is) -->
          <p
            v-else-if="config.showMeta !== false && hasAnyFields"
            class="hidden sm:block truncate text-[11px] text-slate-500"
          >
            <span
              v-for="field in allFields"
              :key="field.key"
            >
              <span class="text-slate-500">
                {{ field.label }}:
              </span>
              <span class="text-slate-300">
                {{ item[field.key] ?? "—" }}
              </span>
              <span class="text-slate-600"> · </span>
            </span>
          </p>

          <!-- Link -->
          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            class="text-emerald-300 hover:text-emerald-100 underline-offset-2 hover:underline whitespace-nowrap flex-shrink-0"
          >
            {{ config.linkShortText || "Open" }} ↗
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompactLayout",
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
      default: () => ({
        showRank: true,
        showMeta: true,
        linkShortText: "Open",
      }),
    },
  },
  computed: {
    allFields() {
      return [
        ...(this.fields.top || []),
        ...(this.fields.middle || []),
        ...(this.fields.bottom || []),
      ];
    },
    hasAnyFields() {
      return this.allFields.length > 0;
    },
  },
};
</script>