<script setup lang="ts">
import ManageStationsModal from "@/components/ManageStationsModal.vue";
import NavBar from "@/components/NavBar.vue";
import SearchStations from "@/components/SearchStations.vue";
import Departures from "@/containers/Departures.vue";
</script>

<template>
  <main class="w-full flex-1 mx-auto flex items-center flex-col text-basic">
    <NavBar />
    <p
      class="font-medium text-white text-xl md:text-xl self-center italic mt-4 sm:mt-8 text-center"
    >
      På farta er en enkel side for å se når neste tog/buss kommer.
    </p>

    <SearchStations />
    <Departures />
    <ManageStationsModal />
  </main>
</template>
