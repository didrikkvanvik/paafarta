export type RailStation = {
  id: string;
  nsr_id: string;
  external_id: string;
  stop_place_id: string;
  name: string;
  modification: "new" | "updated" | "deleted"; // Assuming modification types
  description: string | null;
  latitude: number;
  longitude: number;
  type: "railStation"; // If it can be other types, use `string`
  transport_mode: "rail" | string; // If there are other transport modes
  sub_mode_type: string | null;
  public_code: string;
  private_code: string;
  changed: string; // ISO 8601 timestamp
  created: string; // ISO 8601 timestamp
};
