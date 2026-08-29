# AeroPilot Insight

AeroSync — MALE UAV Engine Digital Twin Dashboard

Build a professional, modern aerospace Ground Control Station (GCS) style web dashboard called AeroSync.

The project is a frontend prototype for an AI-based Digital Twin and predictive health monitoring system for MALE UAV piston engines.

Use React + TypeScript + Vite. Use a clean component-based architecture. Use Tailwind CSS for styling and a suitable chart library such as Recharts for graphs. Use Lucide React or another professional icon library for icons.

The dashboard must be fully responsive for desktop/laptop screens and should look like a professional aerospace/defence monitoring interface rather than a generic admin dashboard.

1. Overall Visual Theme

Use a dark, professional aerospace/mission-control theme.

Design requirements:

Dark background

High contrast text

Professional technical appearance

Subtle borders and panels

Green = healthy/normal

Yellow/amber = caution/warning

Red = critical/fault

Avoid excessive decorative elements

Use clean typography

Use subtle animations only where useful

Dashboard should feel like a real Ground Control Station interface

Keep information density high but organized and readable

Do not make it look like a normal business analytics dashboard.

2. Header

Create a fixed/sticky top header.

Left side:

AEROSYNC

Add a small subtitle such as:

MALE UAV ENGINE DIGITAL TWIN

Right side:

Select UAV: [ UAV-02 ▼ ]

The UAV selector must be a real interactive dropdown.

Create mock data for at least:

UAV-01

UAV-02

UAV-03

UAV-04

When the user selects another UAV, all dashboard information should update according to that UAV's mock data.

Do not hard-code the displayed UAV values directly into individual components. Store UAV information in a centralized mock data structure.

3. UAV Overview / Health Status

Immediately below the header, create a prominent overview panel.

Display:

UAV-02

Status:

CAUTION

Health:

72%

RUL:

186 h

Use a visually clear health indicator such as a circular progress/gauge or progress bar.

The status must be dynamic based on the selected UAV's mock data.

Possible states:

NORMAL

CAUTION

CRITICAL

Use appropriate green, amber and red status indicators.

4. Main Engine Monitoring Section

Create a two-column layout.

Left Column — UAV Visualization

Display a professional 3D-style MALE UAV visualization.

If a real 3D model is not available, create a high-quality technical UAV illustration/silhouette or a suitable placeholder area that can later be replaced by a Three.js 3D model.

Show the engine location clearly.

Display:

3D MALE UAV

and an engine status indicator near the engine:

ENGINE — CRITICAL/CAUTION/NORMAL

The engine indicator must change according to the selected UAV's health/fault status.

Do not spend excessive effort on a complex 3D engine implementation. Prioritize the rest of the dashboard.

Right Column — Live Parameters

Create a panel titled:

LIVE PARAMETERS

Display the following engine parameters:

RPM

CHT

EGT

Oil Pressure

Vibration

Fuel

Current

For the default UAV-02 display:

RPM: 3200

CHT: 182°C

EGT: 715°C

Oil Pressure: 58 PSI

Vibration: 3.8

Fuel: 8.2

Current: 2.4 A

Parameters that are abnormal should display a red indicator.

Normal parameters should display a green/neutral indicator.

Use reusable parameter cards/components.

5. Current vs Expected Section

Create a full-width section titled:

CURRENT vs EXPECTED

This section represents the difference between the Digital Twin's expected engine behaviour and the current engine behaviour.

Display:

CHT:

Current: 182°C

Expected: 160°C

Residual: +22°C

EGT:

Current: 715°C

Expected: 690°C

Residual: +25°C

The residual should be calculated dynamically:

Residual = Current - Expected

Do not hard-code the residual value.

Use a clean comparison visualization such as horizontal bars, compact charts, or comparison cards.

Abnormal residuals should be highlighted in red.

6. AI Diagnostics Section

Create a panel titled:

AI DIAGNOSTICS

Display:

Anomaly: DETECTED

Fault: Cooling

Confidence: 91%

RUL: 186 hrs

Use a clear visual hierarchy.

For the default UAV-02:

Anomaly = red

Fault = Cooling

Confidence = 91%

RUL = 186 hrs

The AI section should be designed so that these values can later be replaced by real backend/API data.

Do not implement actual machine learning. Use mock data for now.

7. SHAP Explanation

Next to AI Diagnostics, create a panel titled:

SHAP EXPLANATION

The purpose is to explain why the AI predicted the current fault.

Display a horizontal bar chart with:

CHT Residual — 65%

EGT Residual — 25%

Vibration — 7%

Use a professional horizontal bar chart.

The chart should be responsive.

Create the component so SHAP values can later be received from an API.

Do not calculate real SHAP values in the frontend.

8. Mission Fitness

Create a full-width section titled:

MISSION FITNESS

Include a prominent button:

CHECK MISSION

The button must be interactive.

Initially use mock logic.

When clicked, display:

Result: CAUTION

For example:

Mission Status: CAUTION

Reason:

High CHT and EGT detected

Health:

72%

RUL:

186 hrs

Recommendation:

Maintenance inspection recommended before extended mission.

The mission result should be visually prominent.

Allow the section to support:

NORMAL

CAUTION

NOT FIT / CRITICAL

9. Mission Replay

Create a full-width section titled:

MISSION REPLAY

Create an interactive mission timeline.

Example:

00:00 ─────────────●────────────────── 04:32:10

Include controls:

Play

Pause

Reset

Timeline slider

The mission replay should use mock historical telemetry data.

As the timeline moves, update the displayed engine parameters to simulate engine behaviour during the mission.

Create mission phases such as:

Takeoff

Climb

Cruise

High Altitude

Throttle Transition

Return

Landing

Show the current mission phase.

The mission replay does not need to be a real video. It should replay simulated telemetry and update the dashboard values.

10. Mock Data Architecture

Create a centralized mock data file, for example:

mockData.ts

Store data for UAV-01, UAV-02, UAV-03 and UAV-04.

Each UAV should contain:

UAV ID

health

status

RUL

RPM

CHT

EGT

oil pressure

vibration

fuel

current

expected CHT

expected EGT

anomaly

fault

confidence

SHAP values

mission data

Use realistic but clearly simulated values.

Example UAV-02:

UAV ID: UAV-02
Status: CAUTION
Health: 72
RUL: 186
RPM: 3200
CHT: 182
EGT: 715
Oil Pressure: 58
Vibration: 3.8
Fuel: 8.2
Current: 2.4
Expected CHT: 160
Expected EGT: 690
Fault: Cooling
Confidence: 91


Make sure all components receive their data through props/state rather than duplicating values.

11. Component Architecture

Create reusable React components.

Suggested structure:

src/
├── components/
│   ├── Header.tsx
│   ├── UAVSelector.tsx
│   ├── HealthOverview.tsx
│   ├── UAVViewer.tsx
│   ├── LiveParameters.tsx
│   ├── ParameterCard.tsx
│   ├── CurrentExpected.tsx
│   ├── AIDiagnostics.tsx
│   ├── SHAPExplanation.tsx
│   ├── MissionFitness.tsx
│   └── MissionReplay.tsx
│
├── data/
│   └── mockData.ts
│
├── pages/
│   └── Dashboard.tsx
│
└── App.tsx


Keep the code clean and modular.

12. Future Backend Integration

Design the frontend so the mock data can later be replaced by API data.

Do not tightly couple components to mock data.

The future data flow will be:

Engine Simulator / Sensors
→ Digital Twin
→ AI/ML
→ Backend API
→ AeroSync React Dashboard

For now, use mock data only.

Create clear interfaces/types for the engine data so that API integration can be added later without redesigning the UI.

13. Interactivity Requirements

The following must actually work:

UAV dropdown

Switching UAV updates all dashboard values

Health/status indicators change dynamically

Current vs Expected residuals calculate automatically

Mission Fitness button works

Mission Replay play/pause works

Mission Replay timeline changes simulated engine parameters

Charts use dynamic data

Responsive layout works on laptop/desktop screens

Avoid placeholder buttons that do nothing

14. Dashboard Layout

Follow this general structure:

---------------------------------------------------------------
 AEROSYNC                         Select UAV: [ UAV-02 ▼ ]
---------------------------------------------------------------

 UAV-02      CAUTION       Health: 72%       RUL: 186 h

---------------------------------------------------------------
|                           |                                  |
|       3D MALE UAV         |       LIVE PARAMETERS            |
|                           |                                  |
|       UAV visualization   |       RPM        3200            |
|       Engine highlighted  |       CHT        182°C           |
|                           |       EGT        715°C           |
|                           |       Oil        58 PSI          |
|                           |       Vibration  3.8             |
|                           |       Fuel       8.2             |
|                           |       Current    2.4 A           |
---------------------------------------------------------------

 CURRENT vs EXPECTED

 CHT    Current 182°C   Expected 160°C   Residual +22°C
 EGT    Current 715°C   Expected 690°C   Residual +25°C

---------------------------------------------------------------
| AI DIAGNOSTICS             | SHAP EXPLANATION               |
|                             |                                |
| Anomaly: DETECTED           | CHT Residual       65%         |
| Fault: Cooling              | EGT Residual       25%         |
| Confidence: 91%             | Vibration           7%         |
| RUL: 186 hrs                |                                |
---------------------------------------------------------------

 MISSION FITNESS                     [ CHECK MISSION ]

 Result: CAUTION

---------------------------------------------------------------

 MISSION REPLAY

 ▶  ───────────────●────────────────── 04:32:10

---------------------------------------------------------------


15. Important Design Rule

Do NOT create a generic admin dashboard.

The final interface should communicate:

Which UAV?

→ Is the engine healthy?

→ Which parameters are abnormal?

→ What does the AI predict?

→ Why did the AI make that prediction?

→ How much useful life remains?

→ Is the UAV fit for the mission?

Make these answers immediately visible to an operator.

Build the first version completely with mock data and make it functional before adding advanced 3D effects or unnecessary animations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bf6c82ea-e1cb-4276-a0cb-3cdec3016702).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
