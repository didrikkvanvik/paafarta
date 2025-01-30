<script setup lang="ts">
import TransportIcon from "@/components/TransportIcon.vue";
import type { Departure } from "@/types/departure";
import { axiosFetch } from "@/utils/fetch";
import { useQuery } from "@tanstack/vue-query";
import { onMounted, onUnmounted, ref } from "vue";

const {
  data = [],
  isLoading,
  error,
} = useQuery({
  queryKey: ["departures"],
  queryFn: () =>
    axiosFetch<Departure[]>({
      url: "/api/platformsdepartures?ids=NSR%3AQuay%3A338",
      method: "GET",
    }),
});

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("no-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const listRef = ref<HTMLElement | null>(null);
const isBlurVisible = ref(true);

const handleScroll = () => {
  if (!listRef.value) return;
  const { scrollTop, scrollHeight, clientHeight } = listRef.value;
  isBlurVisible.value = scrollTop + clientHeight < scrollHeight - 5;
};

onMounted(() => {
  if (listRef.value) {
    listRef.value.addEventListener("scroll", handleScroll);
    handleScroll();
  }
});

onUnmounted(() => {
  if (listRef.value) {
    listRef.value.removeEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <div
    class="bg-black text-white rounded-lg p-4 sm:p-6 shadow-lg w-full mx-auto !mt-6 relative"
  >
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">
      Error: {{ error.message }}
    </div>

    <div v-else-if="data">
      <h2 class="text-2xl font-bold !mb-4">{{ data[0].platform_name }}</h2>
      <div
        class="grid grid-cols-3 gap-4 text-sm font-semibold border-b border-gray-700 pb-2 mb-2"
      >
        <p class="text-left text-gray-500 text-lg">Linje</p>
        <p class="text-left text-gray-500 text-lg">Destinasjon</p>
        <p class="text-right text-gray-500 text-lg">Forventet</p>
      </div>

      <div class="relative">
        <ul ref="listRef" class="max-h-[30rem] overflow-y-scroll no-scrollbar">
          <li
            v-for="departure in data"
            :key="departure.id"
            class="grid grid-cols-3 gap-4 items-center py-2 border-b border-gray-800"
          >
            <div class="flex items-center gap-2">
              <TransportIcon
                :transport="departure.transport_mode"
                :line_number="departure.line_number"
              />
            </div>
            <div>
              <p class="text-xl">{{ departure.destination }}</p>
            </div>
            <div class="text-right">
              <p class="text-xl">
                {{ formatTime(departure.schedule_departure_time) }}
              </p>
            </div>
          </li>
        </ul>

        <div
          v-if="isBlurVisible"
          class="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"
        />
      </div>
    </div>
  </div>
</template>
