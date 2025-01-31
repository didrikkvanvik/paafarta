export enum SubModeType {
  localBus = "localBus",
  regionalBus = "regionalBus",
  expressBus = "expressBus",
  nightBus = "nightBus",
  sightseeingBus = "sightseeingBus",
  shuttleBus = "shuttleBus",
  schoolBus = "schoolBus",
  railReplacementBus = "railReplacementBus",
  airportLinkBus = "airportLinkBus",
  localTram = "localTram",
  local = "local",
  regionalRail = "regionalRail",
  interregionalRail = "interregionalRail",
  longDistance = "longDistance",
  nightRail = "nightRail",
  touristRailway = "touristRailway",
  metro = "metro",
  internationalFlight = "internationalFlight",
  domesticFlight = "domesticFlight",
  helicopterService = "helicopterService",
  internationalCarFerry = "internationalCarFerry",
  nationalCarFerry = "nationalCarFerry",
  localCarFerry = "localCarFerry",
  internationalPassengerFerry = "internationalPassengerFerry",
  localPassengerFerry = "localPassengerFerry",
  highSpeedVehicleService = "highSpeedVehicleService",
  highSpeedPassengerService = "highSpeedPassengerService",
  sightseeingService = "sightseeingService",
  telecabin = "telecabin",
  funicular = "funicular",
}

export enum TransportMode {
  air = "air",
  bus = "bus",
  cableway = "cableway",
  water = "water",
  funicular = "funicular",
  lift = "lift",
  rail = "rail",
  metro = "metro",
  tram = "tram",
  coach = "coach",
}

export enum StationType {
  onstreetBus = "onstreetBus",
  onstreetTram = "onstreetTram",
  airport = "airport",
  railStation = "railStation",
  metroStation = "metroStation",
  busStation = "busStation",
  coachStation = "coachStation",
  tramStation = "tramStation",
  harbourPort = "harbourPort",
  ferryPort = "ferryPort",
  ferryStop = "ferryStop",
  liftStation = "liftStation",
  vehicleRailInterchange = "vehicleRailInterchange",
  other = "other",
}

export type ModificationType = "new" | "revise" | "delete" | "unchanged";
