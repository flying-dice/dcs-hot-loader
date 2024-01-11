import { app } from "../app";
import { HealthDto } from "../dtos/health.dto";
import { variables } from "../services/variables";
import { missionService } from "../services/mission";

app.get("/health", (req, res) => {
  res.json<HealthDto>({
    status: "OK",
    _APP_VERSION,
    _VERSION,
    _ARCHITECTURE,
    missionRunning: missionService.isMissionRunning(),
    variables,
  });
});
