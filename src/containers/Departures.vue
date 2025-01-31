<script setup lang="ts">
import StationCard from "@/components/StationCard.vue";
import { useStationsStore } from "@/stores/useStationsStore";
import type { Departure } from "@/types/departure";
import { axiosFetch } from "@/utils/fetch";
import { useQuery } from "@tanstack/vue-query";
import { computed, watch } from "vue";

const stationsStore = useStationsStore();
const stationIds = computed(() =>
  stationsStore.stations.map((station) => station.nsr_id),
);
const uris = computed(() => stationIds.value.map((id) => encodeURI(id)));

const { data, isLoading, error, refetch } = useQuery<Departure[], Error>({
  queryKey: ["departures", stationIds],
  queryFn: () =>
    axiosFetch<Departure[]>({
      url: `/api/platformsdepartures?ids=${uris.value.join("&ids=")}`,
    }),
  enabled: computed(() => !!uris.value.length),
});

watch(
  () => stationsStore.stations,
  () => {
    if (uris.value.length) {
      refetch();
    }
  },
  { deep: true },
);

const departures = computed(() => data.value || []);

const departuresByStation = computed(() => {
  const items = departures.value;

  if (!items.length) return new Map<string, Departure[]>();

  const filteredDepartures = items.filter((departure) => {
    const isLessThanFiveMinutesInThePast =
      new Date(departure.schedule_departure_time) <
      new Date(new Date().getTime() - 5 * 60 * 1000);
    return !isLessThanFiveMinutesInThePast;
  });

  const groups = filteredDepartures.reduce((acc, departure) => {
    const name = departure.platform_name;
    const existingGroup = acc.get(name) || [];
    return new Map(acc).set(name, [...existingGroup, departure]);
  }, new Map<string, Departure[]>());

  const groupsSortedByDepartureTime = new Map(
    Array.from(groups.entries()).map(([name, departures]) => {
      const sortedDepartures = [...departures].sort((a, b) => {
        return (
          new Date(a.schedule_departure_time).getTime() -
          new Date(b.schedule_departure_time).getTime()
        );
      });
      return [name, sortedDepartures];
    }),
  );

  return groupsSortedByDepartureTime;
});
</script>

<template>
  <div class="w-full">
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">
      Error: {{ error.message }}
    </div>
    <div
      v-else-if="data?.length"
      class="flex flex-wrap gap-4 justify-center items-start"
    >
      <StationCard
        v-for="[stationName, departures] in departuresByStation"
        :key="stationName"
        :station-name="stationName"
        :departures="departures"
      />
    </div>
    <div v-else class="text-center text-gray-500">
      Ingen stasjoner er lagt til. Bruk søkefeltet for å legge til stasjoner.
    </div>
  </div>
</template>
