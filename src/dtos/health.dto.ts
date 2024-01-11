import { variables } from "../services/variables";

export interface HealthDto {
  status: "OK";
  _VERSION: string;
  _APP_VERSION: string;
  _ARCHITECTURE: string;
  missionRunning: boolean;
  variables: typeof variables;
}
