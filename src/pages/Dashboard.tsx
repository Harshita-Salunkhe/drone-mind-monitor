import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { HealthOverview } from "@/components/HealthOverview";
import { UAVViewer } from "@/components/UAVViewer";
import { LiveParameters } from "@/components/LiveParameters";
import { CurrentExpected, type ComparisonRow } from "@/components/CurrentExpected";
import { AIDiagnostics } from "@/components/AIDiagnostics";
import { SHAPExplanation } from "@/components/SHAPExplanation";
import { MissionFitness } from "@/components/MissionFitness";
import { MissionReplay } from "@/components/MissionReplay";
import { UAV_FLEET, getUAV, getPhaseAt, telemetryAt } from "@/data/mockData";
import { formatClock } from "@/lib/status";

const REPLAY_STEP_SECONDS = 40;

export function Dashboard() {
  const [selectedId, setSelectedId] = useState("UAV-02");
  const [replayTime, setReplayTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [replayActive, setReplayActive] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const timer = useRef<number | null>(null);

  const uav = useMemo(() => getUAV(selectedId), [selectedId]);

  useEffect(() => {
    const tick = () => setClock(new Date().toISOString().slice(11, 19));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // reset replay when switching airframe
  useEffect(() => {
    setPlaying(false);
    setReplayActive(false);
    setReplayTime(0);
  }, [selectedId]);

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setReplayTime((t) => {
        const next = t + REPLAY_STEP_SECONDS;
        if (next >= uav.mission.durationSeconds) {
          setPlaying(false);
          return uav.mission.durationSeconds;
        }
        return next;
      });
    }, 120);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [playing, uav.mission.durationSeconds]);

  const params = replayActive ? telemetryAt(uav, replayTime) : uav.params;
  const phase = getPhaseAt(uav, replayTime);

  const comparisonRows: ComparisonRow[] = [
    {
      key: "cht",
      label: "CHT",
      unit: "°C",
      current: params.cht,
      expected: uav.expected.cht,
      tolerance: 10,
      scaleMax: 250,
    },
    {
      key: "egt",
      label: "EGT",
      unit: "°C",
      current: params.egt,
      expected: uav.expected.egt,
      tolerance: 15,
      scaleMax: 850,
    },
  ];

  const seek = (t: number) => {
    setReplayActive(true);
    setReplayTime(t);
  };

  return (
    <div className="min-h-screen">
      <Header fleet={UAV_FLEET} selectedId={selectedId} onSelect={setSelectedId} clock={clock} />

      <main className="mx-auto max-w-[1800px] space-y-4 px-4 py-4 lg:px-6">
        <HealthOverview uav={uav} />

        <div className="grid gap-4 xl:grid-cols-[1.15fr_1fr]">
          <UAVViewer
            uavId={uav.id}
            status={uav.status}
            phase={replayActive ? `REPLAY · ${phase.name}` : undefined}
          />
          <LiveParameters
            params={params}
            live={!replayActive || playing}
            source={replayActive ? `REPLAY T+${formatClock(replayTime)}` : "LIVE DOWNLINK"}
          />
        </div>

        <CurrentExpected rows={comparisonRows} />

        <div className="grid gap-4 xl:grid-cols-2">
          <AIDiagnostics uav={uav} />
          <SHAPExplanation factors={uav.shap} />
        </div>

        <MissionFitness uav={uav} />

        <MissionReplay
          uav={uav}
          time={replayTime}
          playing={playing}
          phase={phase}
          onSeek={seek}
          onTogglePlay={() => {
            setReplayActive(true);
            setPlaying((p) => !p);
          }}
          onReset={() => {
            setPlaying(false);
            setReplayActive(false);
            setReplayTime(0);
          }}
        />

        <footer className="pb-6 pt-2 text-center font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
          AeroSync GCS · Simulated telemetry · Digital twin prototype build
        </footer>
      </main>
    </div>
  );
}
