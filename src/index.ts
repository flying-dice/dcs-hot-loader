import { config } from "./config";

import { Logger } from "@flying-dice/tslua-common";
import { app } from "./app";
import "./routes";
import { missionService } from "./services/mission";

const logger = new Logger("DCSHotLoader");

if (__dcs_hot_loader_app !== undefined) {
  logger.info("Closing existing app");
  __dcs_hot_loader_app.close();
}

logger.info("Starting app");
__dcs_hot_loader_app = app;

DCS.setUserCallbacks({
  onSimulationStart() {
    logger.info("Simulation Started");
    missionService.onSimulationStart();
  },
  onSimulationStop() {
    logger.info("Simulation Stopped");
    missionService.onSimulationStop();
  },
  onSimulationFrame() {
    __dcs_hot_loader_app.acceptNextClient();
  },
});

logger.info(
  `DCS Hot Loader Listening on http://${config.bindAddress}:${config.port}/`,
);
