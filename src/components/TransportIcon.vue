
<template>
  <div
    class="text-black rounded-md flex items-center justify-between px-3 py-1 gap-1"
    :class="{
      'bg-pink-500': transport === 'bus',
      'bg-blue-500': transport === 'rail',
    }"
  >
    <img
      src="@/assets/transport/rail.svg"
      v-if="transport === 'rail'"
      :alt="transport"
      class="w-5 h-5"
    />
    <img
      src="@/assets/transport/bus.svg"
      v-else
      :alt="transport"
      class="w-5 h-5"
    />

    <p class="text-md !font-bold">{{ line_number }}</p>
  </div>
</template>

<script setup lang="ts">
import type { TransportMode } from "@/types/departure";

defineProps<{
  transport: TransportMode;
  line_number: string;
}>();
</script>
