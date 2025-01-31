import type { TransportMode } from "./shared";

export interface Departure {
  id: string;
  line_number: string;
  line_name: string;
  transport_mode: TransportMode;
  transport_sub_mode: string | null;
  destination: string;
  static_destination: string;
  alighting: boolean;
  boarding: boolean;
  time_type: string;
  time_source: string;
  platform_id: string;
  platform_name: string;
  platform_code: string;
  platform_external_id: string;
  platform_nsr_id: string;
  trip_id: string;
  order: number;
  is_next_stop: boolean;
  arrival_status: string;
  departure_status: string;
  schedule_arrival_time: string; // ISO Date format
  schedule_departure_time: string; // ISO Date format
  expected_arrival_time: string | null; // Nullable timestamps
  expected_departure_time: string | null;
  notices: Notice[];
  creation_time: string;
  is_valid: boolean;
  vehicle_id: string | null;
}

interface Notice {
  id?: string | null;
  external_id?: string | null;
  text?: string | null;
  publicCode?: string | null;
}
