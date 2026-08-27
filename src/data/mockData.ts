export type EngineStatus = "NORMAL" | "CAUTION" | "CRITICAL";

export interface ShapFactor {
  label: string;
  value: number; // percentage contribution
}

export interface MissionPhase {
  name: string;
  /** seconds from mission start */
  start: number;
}

export interface EngineParameters {
  rpm: number;
  cht: number;
  egt: number;
  oilPressure: number;
  vibration: number;
  fuel: number;
  current: number;
}

export interface MissionFitness {
  status: EngineStatus;
  reason: string;
  recommendation: string;
}

export interface UAVData {
  id: string;
  name: string;
  status: EngineStatus;
  health: number;
  rul: number;
  params: EngineParameters;
  expected: {
    cht: number;
    egt: number;
  };
  ai: {
    anomaly: boolean;
    fault: string;
    confidence: number;
  };
  shap: ShapFactor[];
  mission: {
    durationSeconds: number;
    phases: MissionPhase[];
    fitness: MissionFitness;
  };
}

/** Parameter metadata used by the UI: label, unit and nominal operating band. */
export const PARAM_META: Record<
  keyof EngineParameters,
  { label: string; unit: string; min: number; max: number; scaleMax: number }
> = {
  rpm: { label: "RPM", unit: "", min: 2400, max: 3600, scaleMax: 4500 },
  cht: { label: "CHT", unit: "°C", min: 120, max: 175, scaleMax: 250 },
  egt: { label: "EGT", unit: "°C", min: 550, max: 700, scaleMax: 850 },
  oilPressure: { label: "OIL PRESS", unit: "PSI", min: 45, max: 85, scaleMax: 120 },
  vibration: { label: "VIBRATION", unit: "ips", min: 0, max: 3.0, scaleMax: 6 },
  fuel: { label: "FUEL FLOW", unit: "L/h", min: 5, max: 12, scaleMax: 16 },
  current: { label: "CURRENT", unit: "A", min: 1.0, max: 3.5, scaleMax: 6 },
};

export function isParamAbnormal(key: keyof EngineParameters, value: number): boolean {
  const meta = PARAM_META[key];
  return value < meta.min || value > meta.max;
}

const STANDARD_PHASES: MissionPhase[] = [
  { name: "TAKEOFF", start: 0 },
  { name: "CLIMB", start: 300 },
  { name: "CRUISE", start: 1200 },
  { name: "HIGH ALTITUDE", start: 5400 },
  { name: "THROTTLE TRANSITION", start: 9600 },
  { name: "RETURN", start: 11400 },
  { name: "LANDING", start: 15600 },
];

export const UAV_FLEET: UAVData[] = [
  {
    id: "UAV-01",
    name: "UAV-01",
    status: "NORMAL",
    health: 94,
    rul: 412,
    params: {
      rpm: 2950,
      cht: 154,
      egt: 662,
      oilPressure: 71,
      vibration: 1.4,
      fuel: 7.1,
      current: 2.0,
    },
    expected: { cht: 152, egt: 658 },
    ai: { anomaly: false, fault: "None", confidence: 97 },
    shap: [
      { label: "CHT Residual", value: 41 },
      { label: "EGT Residual", value: 34 },
      { label: "Vibration", value: 25 },
    ],
    mission: {
      durationSeconds: 16330,
      phases: STANDARD_PHASES,
      fitness: {
        status: "NORMAL",
        reason: "All engine parameters within nominal digital twin envelope",
        recommendation: "Cleared for extended endurance mission.",
      },
    },
  },
  {
    id: "UAV-02",
    name: "UAV-02",
    status: "CAUTION",
    health: 72,
    rul: 186,
    params: {
      rpm: 3200,
      cht: 182,
      egt: 715,
      oilPressure: 58,
      vibration: 3.8,
      fuel: 8.2,
      current: 2.4,
    },
    expected: { cht: 160, egt: 690 },
    ai: { anomaly: true, fault: "Cooling", confidence: 91 },
    shap: [
      { label: "CHT Residual", value: 65 },
      { label: "EGT Residual", value: 25 },
      { label: "Vibration", value: 7 },
    ],
    mission: {
      durationSeconds: 16330,
      phases: STANDARD_PHASES,
      fitness: {
        status: "CAUTION",
        reason: "High CHT and EGT detected",
        recommendation: "Maintenance inspection recommended before extended mission.",
      },
    },
  },
  {
    id: "UAV-03",
    name: "UAV-03",
    status: "CRITICAL",
    health: 38,
    rul: 42,
    params: {
      rpm: 3480,
      cht: 209,
      egt: 786,
      oilPressure: 34,
      vibration: 5.2,
      fuel: 11.4,
      current: 4.1,
    },
    expected: { cht: 163, egt: 694 },
    ai: { anomaly: true, fault: "Oil Starvation / Bearing Wear", confidence: 96 },
    shap: [
      { label: "Oil Pressure", value: 48 },
      { label: "Vibration", value: 31 },
      { label: "CHT Residual", value: 21 },
    ],
    mission: {
      durationSeconds: 16330,
      phases: STANDARD_PHASES,
      fitness: {
        status: "CRITICAL",
        reason: "Oil pressure below limit with severe vibration signature",
        recommendation: "NOT FIT FOR FLIGHT. Ground the airframe and inspect the lubrication system.",
      },
    },
  },
  {
    id: "UAV-04",
    name: "UAV-04",
    status: "NORMAL",
    health: 88,
    rul: 327,
    params: {
      rpm: 3050,
      cht: 166,
      egt: 681,
      oilPressure: 66,
      vibration: 2.1,
      fuel: 7.8,
      current: 2.2,
    },
    expected: { cht: 158, egt: 672 },
    ai: { anomaly: false, fault: "None", confidence: 93 },
    shap: [
      { label: "CHT Residual", value: 52 },
      { label: "EGT Residual", value: 30 },
      { label: "Vibration", value: 18 },
    ],
    mission: {
      durationSeconds: 16330,
      phases: STANDARD_PHASES,
      fitness: {
        status: "NORMAL",
        reason: "Minor CHT drift within acceptable tolerance",
        recommendation: "Cleared for mission. Monitor CHT trend on next sortie.",
      },
    },
  },
];

export function getUAV(id: string): UAVData {
  return UAV_FLEET.find((u) => u.id === id) ?? UAV_FLEET[1]!;
}

export function getPhaseAt(uav: UAVData, seconds: number): MissionPhase {
  const phases = uav.mission.phases;
  let current = phases[0]!;
  for (const p of phases) if (seconds >= p.start) current = p;
  return current;
}

/**
 * Deterministic simulated telemetry for the mission replay timeline.
 * Replace with historical API telemetry later.
 */
export function telemetryAt(uav: UAVData, seconds: number): EngineParameters {
  const t = Math.min(1, Math.max(0, seconds / uav.mission.durationSeconds));
  const phase = getPhaseAt(uav, seconds).name;

  const loadByPhase: Record<string, number> = {
    TAKEOFF: 1.12,
    CLIMB: 1.08,
    CRUISE: 1.0,
    "HIGH ALTITUDE": 0.94,
    "THROTTLE TRANSITION": 1.05,
    RETURN: 0.98,
    LANDING: 0.86,
  };
  const load = loadByPhase[phase] ?? 1;
  // gentle thermal soak: degradation grows across the mission
  const soak = 1 + t * 0.06;
  const ripple = Math.sin(seconds / 240) * 0.012 + 1;
  const p = uav.params;

  const round = (v: number, d = 0) => Number(v.toFixed(d));
  return {
    rpm: round(p.rpm * load * ripple),
    cht: round(p.cht * (0.9 + (load - 1) * 0.8) * soak * ripple),
    egt: round(p.egt * (0.92 + (load - 1) * 0.7) * soak * ripple),
    oilPressure: round(p.oilPressure * (2 - load) * (1 - t * 0.04), 1),
    vibration: round(p.vibration * load * (1 + t * 0.08) * ripple, 2),
    fuel: round(p.fuel * load * ripple, 1),
    current: round(p.current * load, 2),
  };
}
