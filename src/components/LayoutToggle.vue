<!-- src/components/LayoutToggle.vue -->
<template>
  <div class="flex items-center gap-2 text-[11px]">
    <span v-if="label" class="text-slate-400">
      {{ label }}
    </span>

    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      @click="$emit('update:modelValue', opt.value)"
      class="px-2.5 py-1 rounded-full border text-[11px] transition-colors"
      :class="modelValue === opt.value
        ? 'border-emerald-400/70 bg-emerald-400/10 text-emerald-200'
        : 'border-white/10 bg-slate-900/60 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-200'"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "LayoutToggle",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>