import type {
  ModificationType,
  StationType,
  SubModeType,
  TransportMode,
} from "./shared";

export type RailStation = {
  id: string;
  nsr_id: string;
  external_id: string;
  stop_place_id: string;
  name: string;
  modification: ModificationType;
  description: string | null;
  latitude: number;
  longitude: number;
  type: StationType;
  transport_mode: TransportMode;
  sub_mode_type: SubModeType;
  public_code: string;
  private_code: string;
  changed: string; // ISO 8601 timestamp
  created: string; // ISO 8601 timestamp
};
