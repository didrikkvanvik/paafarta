<script setup lang="ts">
import TransportIcon from "@/components/TransportIcon.vue";
import type { Departure } from "@/types/departure";
import { differenceInMinutes, formatDate } from "date-fns";

defineProps<{
  stationName: string;
  departures: Departure[];
}>();

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const isLessThanTenMinutesAndFuture =
    differenceInMinutes(date, new Date()) < 10 && date.getTime() > Date.now();

  const isLessThanOneMinute =
    differenceInMinutes(date, new Date()) < 1 && date.getTime() > Date.now();

  if (isLessThanTenMinutesAndFuture) {
    return `${differenceInMinutes(date, new Date())} min`;
  } else if (isLessThanOneMinute) {
    return "Nå";
  }

  return formatDate(date, "HH:mm");
}
</script>

<template>
  <div
    class="bg-black text-white rounded-lg p-4 sm:p-6 shadow-lg relative flex-1 min-w-[350px] max-w-xl"
  >
    <h2 class="text-2xl font-bold mb-4">{{ stationName }}</h2>
    <div
      class="grid grid-cols-3 gap-4 text-sm font-semibold border-b border-gray-700 pb-2 mb-2"
    >
      <p class="text-left text-gray-500 text-lg">Linje</p>
      <p class="text-left text-gray-500 text-lg">Destinasjon</p>
      <p class="text-right text-gray-500 text-lg">Forventet</p>
    </div>

    <div class="relative">
      <ul class="max-h-[30rem] overflow-y-scroll no-scrollbar">
        <li
          v-for="departure in departures"
          :key="departure.id"
          class="grid grid-cols-3 gap-4 items-center py-2 border-b border-gray-800"
        >
          <div class="flex items-center gap-2">
            <TransportIcon
              :transport="departure.transport_mode"
              :line_name="departure.line_name"
            />
            <p class="text-lg">{{ departure.platform_code }}</p>
          </div>
          <div>
            <p class="text-xl">{{ departure.destination }}</p>
          </div>
          <div class="flex items-center gap-2 justify-end">
            <div
              v-if="departure.expected_departure_time"
              class="animate-pulse h-2 w-2 rounded-full bg-green-500"
            />
            <p
              class="text-xl"
              :class="{ 'text-green-500': departure.expected_departure_time }"
            >
              {{
                formatTime(
                  departure.expected_departure_time ||
                    departure.schedule_departure_time,
                )
              }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
