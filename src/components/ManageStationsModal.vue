<script setup lang="ts">
import { useStationsStore } from "@/stores/useStationsStore";
import { ref } from "vue";

const isOpen = ref(false);
const stationsStore = useStationsStore();

const toggleModal = () => {
  isOpen.value = !isOpen.value;
};

const removeStation = (stationId: string) => {
  stationsStore.removeStation(stationId);
};
</script>

<template>
  <button
    @click="toggleModal"
    class="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg transition-colors duration-200 cursor-pointer"
    aria-label="Manage stations"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  </button>

  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    @click="toggleModal"
  >
    <div
      class="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
      @click.stop
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl !font-bold text-white">Administrer stasjoner</h2>
        <button
          @click="toggleModal"
          class="text-gray-400 hover:text-white transition-colors duration-200"
        >
          ✕
        </button>
      </div>

      <div class="divide-y divide-gray-700">
        <div
          v-for="station in stationsStore.stations"
          :key="station.id"
          class="py-3 flex justify-between items-center group"
        >
          <span class="text-white text-lg"
            >{{ station.name }} (Spor {{ station.public_code }})</span
          >
          <button
            @click="removeStation(station.id)"
            class="text-white text-md transition-hover duration-200 hover:bg-red-600 cursor-pointer bg-red-500 rounded-md px-3 py-2"
          >
            Fjern
          </button>
        </div>
      </div>

      <div
        v-if="!stationsStore.stations.length"
        class="text-gray-400 text-center py-4"
      >
        Ingen stasjoner er lagt til
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
