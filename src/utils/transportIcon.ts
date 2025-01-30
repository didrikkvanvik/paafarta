import { transportColors } from "./colors";

import type { TransportMode } from "@/types/departure";

export const getTransportIcon = (transport: TransportMode) => {
  return {
    bus: "@/assets/transport/bus.svg",
    rail: "@/assets/transport/rail.svg",
  }[transport];
};

export const getTransportColor = (transport: TransportMode) => {
  return {
    bus: transportColors.bus,
    rail: transportColors.rail,
  }[transport];
};
