<script setup lang="ts">
import { railStations } from "@/data/railStations";
import { useStationsStore } from "@/stores/useStationsStore";
import type { RailStation } from "@/types/railStation";
import { computed, ref } from "vue";

const stationsStore = useStationsStore();
const searchTerm = ref("");
const debouncedSearchTerm = ref("");
let debounceTimeout: ReturnType<typeof setTimeout>;

const handleSearch = (value: string) => {
  searchTerm.value = value;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    debouncedSearchTerm.value = value;
  }, 200);
};

const filteredStations = computed(() => {
  if (!debouncedSearchTerm.value) return [];

  return railStations
    .filter((station) =>
      station.name
        .toLowerCase()
        .includes(debouncedSearchTerm.value.toLowerCase()),
    )
    .slice(0, 6);
});

const clearSearch = () => {
  searchTerm.value = "";
  debouncedSearchTerm.value = "";
};

const handleStationClick = (station: RailStation) => {
  stationsStore.addStation(station);
  clearSearch();
};
</script>

<template>
  <div class="w-full max-w-lg my-4">
    <div class="relative">
      <input
        v-model="searchTerm"
        @input="handleSearch(($event.target as HTMLInputElement).value)"
        type="text"
        placeholder="Søk etter stasjon..."
        class="w-full px-4 py-3 text-lg bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 text-white placeholder-gray-400 transition-colors duration-200"
      />

      <button
        v-if="searchTerm"
        @click="clearSearch"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200 p-3 cursor-pointer"
      >
        ✕
      </button>

      <div
        v-if="debouncedSearchTerm && filteredStations.length > 0"
        class="absolute z-50 top-full left-0 right-0 mt-2 bg-black border border-gray-700 rounded-lg shadow-xl overflow-hidden"
      >
        <div class="divide-y divide-gray-700">
          <div
            v-for="station in filteredStations"
            :key="station.id"
            class="p-3 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
            @click="handleStationClick(station)"
          >
            <div class="flex items-center justify-between">
              <div class="text-white text-lg">{{ station.name }}</div>
              <div class="text-gray-400 text-sm">
                Spor {{ station.public_code }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
