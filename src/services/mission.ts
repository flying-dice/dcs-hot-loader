import { Logger } from "@flying-dice/tslua-common";

const logger = new Logger("MissionService");
let started = false;

export const missionService = {
  isMissionRunning() {
    return started;
  },

  onSimulationStart() {
    started = true;
  },

  onSimulationStop() {
    started = false;
  },
};
