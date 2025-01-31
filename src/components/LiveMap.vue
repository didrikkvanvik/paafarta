<script setup lang="ts">
import type { VehiclePosition } from "@/types/VehiclePosition";
import { axiosFetch } from "@/utils/fetch";
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, toRaw } from "vue";
import { CustomMarker, GoogleMap } from "vue3-google-map";

const center = { lat: 58.97, lng: 5.7333 };
const zoom = ref(14);
const mapRef = ref();
const activeInfoWindow = ref<google.maps.InfoWindow | null>(null);

const { data } = useQuery<VehiclePosition[], Error>({
  queryKey: ["vehiclePositions"],
  queryFn: () =>
    axiosFetch<VehiclePosition[]>({
      url: "/api/api/vehicles/realtimehub",
    }),
  refetchInterval: 10000,
});

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const visibleVehicles = computed(() => {
  const items = data.value;

  if (!items?.length) return [];
  return items.filter(
    (vehicle) =>
      typeof vehicle.latitude === "number" &&
      typeof vehicle.longitude === "number",
  );
});

const handleMarkerClick = (v: VehiclePosition) => {
  if (activeInfoWindow.value) {
    activeInfoWindow.value.close();
  }

  const vehicle = toRaw(v);
  console.log("vehicle", vehicle);

  const content = `
    <div class="p-2 text-black">
      <h1 class="font-bold text-2xl">Linje:${vehicle.line_name || ""}</h1>
      <p class="text-sm">Til: ${vehicle.destination_name || ""}</p>
      <p class="text-sm">Neste stopp: ${vehicle.next_stop_name || ""}</p>
    </div>
  `;

  const infoWindow = new google.maps.InfoWindow({
    content,
    position: { lat: vehicle.latitude!, lng: vehicle.longitude! },
  });

  infoWindow.open(mapRef.value?.map);
  activeInfoWindow.value = infoWindow;
};
</script>

<template>
  <GoogleMap
    ref="mapRef"
    :api-key="googleMapsApiKey"
    :center="center"
    :zoom="zoom"
    class="w-full h-[calc(80vh-64px)] mt-8"
  >
    <CustomMarker
      v-for="vehicle in visibleVehicles"
      :key="vehicle.vehicle_id"
      :options="{
        position: {
          lat: vehicle.latitude!,
          lng: vehicle.longitude!,
        },
      }"
      @click="() => handleMarkerClick(vehicle)"
    >
      <div class="transform-origin-bottom relative">
        <div
          class="w-10 h-10 rounded-full shadow-xl text-white bg-[#414141] flex items-center justify-center hover:scale-110 transition-all duration-300"
        >
          <p class="text-center text-sm !font-bold">{{ vehicle.line_name }}</p>
        </div>
      </div>
    </CustomMarker>
  </GoogleMap>
</template>
