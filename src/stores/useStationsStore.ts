import type { RailStation } from "@/types/railStation";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStationsStore = defineStore("stations", () => {
  const stations = ref<RailStation[]>(
    JSON.parse(localStorage.getItem("stations") || "[]"),
  );

  const addStation = (station: RailStation) => {
    if (!stations.value.some((s) => s.id === station.id)) {
      stations.value.push(station);
      localStorage.setItem("stations", JSON.stringify(stations.value));
    }
  };

  const removeStation = (stationId: string) => {
    stations.value = stations.value.filter((s) => s.id !== stationId);
    localStorage.setItem("stations", JSON.stringify(stations.value));
  };

  return {
    stations,
    addStation,
    removeStation,
  };
});
