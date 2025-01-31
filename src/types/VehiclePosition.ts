import type {
  ModificationType,
  StationType,
  SubModeType,
  TransportMode,
} from "./shared";

export interface VehiclePosition {
  depot?: Depot;
  next_platform?: NextPlatform;
  journey_id?: string;
  vehicle_id?: string;
  company_id?: string;
  is_active?: boolean;
  delay?: number; // nullable integer
  line_id?: string;
  line_name?: string;
  destination_display?: string;
  origin_name?: string;
  destination_name?: string;
  previous_stop_id?: string;
  previous_stop_order?: string;
  next_stop_id?: string;
  next_stop_name?: string;
  longitude?: number; // nullable double
  latitude?: number; // nullable double
  speed?: number; // nullable double
  heading?: number; // nullable double
  link_distance?: number; // nullable double
  percentage?: number; // nullable double
  recorded_at_time?: string; // nullable ISO date-time
  origin_aimed_departure_time?: string; // nullable ISO date-time
  destination_aimed_arrival_time?: string; // nullable ISO date-time
  trip_state?: string; // nullable string
}
export interface Depot {
  id?: string;
  name?: string;
  longitude?: number; // nullable double
  latitude?: number; // nullable double
  radius?: number; // nullable double
}

export interface NextPlatform {
  id?: string;
  nsr_id?: string;
  external_id?: string;
  stop_place_id?: string;
  name?: string;
  modification?: ModificationType;
  description?: string;
  latitude?: number; // nullable double
  longitude?: number; // nullable double
  type?: StationType;
  transport_mode?: TransportMode;
  sub_mode_type?: SubModeType[];
  public_code?: string;
  private_code?: string;
  changed?: string; // nullable ISO date-time
  created?: string; // nullable ISO date-time
}
